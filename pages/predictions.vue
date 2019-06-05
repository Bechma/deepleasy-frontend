<template>
  <div>
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
      </v-card-text>
    </v-card>
    <v-btn :disabled="zipError || !selectedFile" color="success" @click="upload"
      >Upload</v-btn
    >
  </div>
</template>

<script>
export default {
  name: 'Predictions',
  middleware: ['authenticated'],
  layout: 'navbar',
  data() {
    return {
      selectedFile: null,
      zipError: false
    }
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
      fd.append('zippy', this.selectedFile, this.selectedFile.name)
      this.$axios.setToken(window.$nuxt.$cookies.get('auth').access, 'Bearer')
      this.$axios.setHeader('Content-Type', 'multipart/form-data')
      this.$axios
        .post('/api/model/predict/', fd)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped></style>
