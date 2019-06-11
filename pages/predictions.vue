<template>
  <div style="max-width: 100%">
    <v-card>
      <v-card-title style="background: orangered">
        Upload your model with your prediction in zip file
      </v-card-title>
      <v-card-text>
        <h3 v-show="zipError" style="color: red">It's not a zip file</h3>
        <v-btn color="success" @click="$refs.inputUpload.click()">
          Choose file
        </v-btn>
        <span v-if="selectedFile">{{ selectedFile.name }}</span>
        <input
          v-show="false"
          ref="inputUpload"
          type="file"
          @change="chooseFile"
        />
        <v-select
          v-model="datasetElect"
          label="Dataset which was trained"
          :items="datasetItems"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="zipError || !selectedFile"
          color="success"
          @click="upload"
        >
          Upload
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="predictions"
      :rows-per-page-items="[
        10,
        50,
        { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
      ]"
      class="elevation-1"
    >
      <template #items="props">
        <td>{{ props.item.feature }}</td>
        <td>{{ props.item.prediction }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'Predictions',
  middleware: ['authenticated'],
  layout: 'navbar',
  data() {
    return {
      datasetElect: 'mnist',
      selectedFile: null,
      zipError: false,
      predictions: [],
      headers: [
        {
          text: 'Feature',
          sortable: false,
          value: 'feature'
        },
        {
          text: 'Prediction',
          sortable: false,
          value: 'prediction'
        }
      ]
    }
  },
  computed: {
    datasetItems() {
      const datasets = []
      for (
        let i = 0;
        i < this.$store.state.model.lists.datasetList.length;
        i++
      ) {
        datasets.push(this.$store.state.model.lists.datasetList[i].name)
      }
      return datasets
    }
  },
  async fetch({ store }) {
    await store.dispatch('model/lists/initLists')
  },
  methods: {
    chooseFile(event) {
      try {
        this.zipError =
          event.target.files[0].type !== 'application/x-zip-compressed'
        this.selectedFile = this.zipError ? null : event.target.files[0]
      } catch (e) {
        this.zipError = false
        this.selectedFile = null
      }
    },
    upload() {
      const fd = new FormData()
      const parent = this

      fd.append('dataset', this.datasetElect)
      fd.append('zippy', this.selectedFile, this.selectedFile.name)

      this.$axios.setToken(this.$cookies.get('auth').access, 'Bearer')
      this.$axios.setHeader('Content-Type', 'multipart/form-data')
      this.$axios
        .post('/api/model/predict/', fd)
        .then(function(res) {
          parent.predictions = res.data.predictions
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped></style>
