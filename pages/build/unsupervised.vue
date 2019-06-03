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
              <v-card-title style="background: orangered"
                >Encoder Builder + Cluster points</v-card-title
              >
              <v-card-text>
                <v-card v-for="(layer, index) in layers2send" :key="index">
                  <v-card-title>Dense {{ index + 1 }}</v-card-title>
                  <v-card-text>
                    <v-layout row>
                      <v-flex xs5 md5>
                        <v-text-field
                          v-model="layer.units"
                          label="Number of neurons"
                          type="number"
                          @input="unitsInput"
                        />
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs5 md5>
                        <v-select
                          v-model="layer.activation"
                          :items="$store.state.model.lists.activationList"
                          label="Activation"
                        />
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
                <v-text-field
                  v-model="n_clusters"
                  label="Number of cluster points"
                  type="number"
                  min="1"
                  max="300"
                  @input="clusterInput"
                />
                <v-select
                  v-model="autoencoderOptimizer"
                  :items="$store.state.model.lists.optimizerList"
                  label="Encoder's Optimizer"
                />
                <v-select
                  v-model="autoencoderLoss"
                  :items="$store.state.model.lists.lossList"
                  label="Encoder's Loss"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  :disabled="layers2send.length === 0"
                  @click.prevent="removeLayer"
                >
                  Remove Last Layer
                </v-btn>
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
import DatasetParameters from '../../components/DatasetParameters'
import ModelParameters from '../../components/ModelParameters'
export default {
  name: 'Unsupervised',
  components: { ModelParameters, DatasetParameters },
  middleware: 'authenticated',
  layout: 'navbar',
  data() {
    return {
      n_clusters: 10,
      layers2send: [
        {
          name: 'Dense',
          activation: 'softmax',
          units: 10
        }
      ],
      autoencoderOptimizer: null,
      autoencoderLoss: null,
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
        .post('/api/model/builder/unsupervised/', {
          epochs: parameters.epochs,
          batchSize: parameters.batchSize,
          loss: parameters.lossElect,
          optimizer: parameters.optimizerElect,

          dataset: ds.datasetElect,
          trainPercentage: ds.trainPercentage,

          layers: parent.layers2send,
          n_clusters: parent.n_clusters,
          autoencoderOptimizer: parent.autoencoderOptimizer,
          autoencoderLoss: parent.autoencoderLoss
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
      this.layers2send.push({
        name: 'Dense',
        activation: 'softmax',
        units: 10
      })
    },
    removeLayer() {
      if (this.layers2send.length !== 0)
        this.layers2send.splice(this.layers2send.length - 1, 1)
    },
    clusterInput() {
      this.n_clusters = parseInt(this.n_clusters)
      if (isNaN(this.n_clusters)) this.n_clusters = 10
      else {
        if (this.n_clusters < 1) {
          this.$nextTick(() => (this.n_clusters = 1))
        }
        if (this.n_clusters > 300) {
          this.$nextTick(() => (this.n_clusters = 300))
        }
      }
    },
    unitsInput() {
      for (let i = 0; i < this.layers2send.length; i++) {
        this.layers2send[i].units = parseInt(this.layers2send[i].units)
        if (isNaN(this.layers2send[i].units)) this.layers2send[i].units = 10
        else {
          if (this.layers2send[i].units < 1) {
            this.$nextTick(() => (this.layers2send[i].units = 1))
          }
          if (this.layers2send[i].units > 10000) {
            this.$nextTick(() => (this.layers2send[i].units = 10000))
          }
        }
      }
    }
  }
}
</script>

<style scoped></style>
