<template>
  <v-flex xs12 md9>
    <v-form @click.prevent="">
      <v-container py-0>
        <v-layout column wrap>
          <v-flex xs12 md12>
            <v-card>
              <v-card-title style="background: orangered">
                Model options
              </v-card-title>
              <v-card-text>
                <ModelParameters />
              </v-card-text>
            </v-card>
          </v-flex>

          <v-divider></v-divider>

          <v-flex xs12 md12>
            <v-card>
              <v-card-title style="background: orangered">Layers</v-card-title>
              <v-card-text>
                <Layers />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange" @click.prevent="addLayer">
                  Add Layer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>

          <v-divider></v-divider>

          <v-flex xs12 md12>
            <v-card>
              <v-card-title style="background: orangered">
                Dataset options
              </v-card-title>
              <v-card-text>
                <DatasetParameters />
              </v-card-text>
            </v-card>
          </v-flex>

          <v-divider></v-divider>

          <v-flex xs12 md12>
            <v-card>
              <v-card-title style="background: orangered">
                Model preview
              </v-card-title>
              <v-card-text>
                <ModelPreview :layers2send="layers2send" />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange" @click.prevent="removeLayer">
                  Remove Layer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>

          <v-divider></v-divider>

          <v-flex xs12 md12 text-xs-right>
            <v-btn
              class="mx-0 font-weight-light"
              color="success"
              :disabled="layers2send.length === 0"
              @click="buildModel"
            >
              Build and train
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-footer
      fixed
      app
      style="background-color:rgba(0,0,0, 0)"
      :style="{ visibility: alert.show ? 'visible' : 'hidden' }"
    >
      <v-alert
        v-model="alert.show"
        dismissible
        :type="alert.type"
        :icon="alert.icon"
      >
        {{ alert.message }}
      </v-alert>
    </v-footer>
  </v-flex>
</template>

<script>
import Layers from '../components/Layers'
import ModelParameters from '../components/ModelParameters'
import DatasetParameters from '../components/DatasetParameters'
import ModelPreview from '../components/ModelPreview'
export default {
  name: 'Build',
  components: { ModelPreview, DatasetParameters, ModelParameters, Layers },
  middleware: 'authenticated',
  layout: 'navbar',
  data() {
    return {
      layers2send: [],
      alert: {
        show: false,
        icon: 'warning',
        type: 'success',
        message: ''
      }
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('model/lists/initLists')
  },
  methods: {
    buildModel() {
      this.$axios.setToken(this.$cookies.get('auth').access, 'Bearer')
      this.$axios.setHeader('Content-type', 'application/json')

      const parameters = this.$store.state.model.parameters
      const ds = this.$store.state.model.dataset
      const parent = this

      this.$axios
        .post('/api/model/builder/', {
          epochs: parameters.epochs,
          batchSize: parameters.batchSize,
          loss: parameters.lossElect,
          optimizer: parameters.optimizerElect,

          dataset: ds.datasetElect,
          trainPercentage: ds.trainPercentage,

          layers: this.layers2send
        })
        .then(function(res) {
          if (res.data.success) {
            parent.alert.type = 'success'
            parent.alert.icon = 'check_circle'
          } else {
            parent.alert.type = 'error'
            parent.alert.icon = 'warning'
          }
          parent.alert.message = res.data.message
          parent.alert.show = true
        })
        .catch(function(err) {
          parent.alert.type = 'error'
          parent.alert.icon = 'warning'
          parent.alert.message = err
          parent.alert.show = true
        })
    },

    addLayer() {
      let layer = null
      const builder = JSON.parse(
        JSON.stringify(this.$store.state.model.builder)
      )
      switch (builder.layersElect) {
        case 'Dense':
          layer = {
            name: 'Dense',
            activation: builder.activation,
            units: builder.units
          }
          break
        case 'Dropout':
          layer = {
            name: 'Dropout',
            rate: builder.rate
          }
          break
        case 'Conv2D':
          layer = {
            name: 'Conv2D',
            kernel: builder.kernel,
            activation: builder.activation,
            units: builder.units
          }
          break
        case 'MaxPooling2D':
          layer = {
            name: 'MaxPooling2D',
            kernel: builder.kernel,
            padding: builder.padding
          }
          break
        case 'Flatten':
          layer = {
            name: 'Flatten'
          }
          break
      }
      layer.selected = false
      this.layers2send.push(layer)
    },

    removeLayer() {
      this.layers2send = this.layers2send.filter(function(value, index, arr) {
        return !value.selected
      })
    }
  }
}
</script>

<style scoped></style>
