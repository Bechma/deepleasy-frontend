<template>
  <v-flex>
    <v-container v-if="progress">
      <v-layout justify-center>
        <v-chip :color="getRunningColor()" text-color="white">
          {{ getRunningText() }}
        </v-chip>
      </v-layout>
      <v-layout justify-center align-center>
        <v-progress-circular
          :rotate="-90"
          :size="400"
          :width="100"
          :value="(100 * epochs) / max_epochs"
          color="primary"
        >
          {{ Math.floor((100 * epochs) / max_epochs) }}
        </v-progress-circular>
      </v-layout>

      <v-layout justify-right>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancelTask">Cancel task</v-btn>
      </v-layout>
    </v-container>
    <v-container v-else>
      <v-layout justify-center align-center column>
        <v-flex>
          <p>There is no active task at the moment</p>
        </v-flex>
        <v-flex>
          <p>Go and start to build some new models</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
export default {
  name: 'Progress',
  middleware: 'authenticated',
  layout: 'navbar',
  data() {
    return {
      avance: {},
      epochs: 0,
      max_epochs: 0,
      task_id: '',
      progress: false,
      running: false
    }
  },
  beforeMount() {
    this.setProgress()
  },
  mounted() {
    const parent = this
    this.avance = setInterval(function() {
      parent.setProgress()
    }, 2000)
  },
  beforeDestroy() {
    clearInterval(this.avance)
  },
  methods: {
    cancelTask() {
      const parent = this
      this.$axios.setToken(this.$cookies.get('auth').access, 'Bearer')
      this.$axios.setHeader('Content-Type', 'application/json')
      this.$axios
        .post('/api/model/progress/', { task_id: this.task_id })
        .then(function(res) {
          parent.setProgress()
        })
        .catch(function(err) {
          parent.setProgress()
        })
    },
    setProgress() {
      const parent = this
      this.$axios.setToken(this.$cookies.get('auth').access, 'Bearer')
      this.$axios
        .get('/api/model/progress/')
        .then(function(res) {
          parent.epochs = res.data.epochs
          parent.max_epochs = res.data.max_epochs
          parent.running = res.data.running
          parent.task_id = res.data.task_id
          parent.progress = true
        })
        .catch(function(err) {
          parent.progress = false
        })
    },
    getRunningColor() {
      return this.running ? 'green' : 'red'
    },
    getRunningText() {
      return this.running ? 'The model is building' : 'Waiting to be built'
    }
  }
}
</script>

<style scoped></style>
