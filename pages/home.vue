<template>
  <v-layout align-center justify-center column fill-height>
    <v-flex xs12 md12>
      <h1>Welcome to Deepleasy</h1>
      <v-img
        :src="require('@/assets/img/deepleasy.png')"
        aspect-ratio="0.8"
        contain
      ></v-img>
    </v-flex>
    <v-flex v-if="max_epochs !== 0" xs12 md12>
      <p>
        You have a <span v-if="running" style="color: green">running</span
        ><span v-else style="color: red">queued</span> task
      </p>
    </v-flex>
    <v-flex v-else xs12 md12>
      <p>You don't have any running task at the moment</p>
    </v-flex>
    <v-flex v-if="history_entries > 0" xs12 md12>
      <p>
        You have {{ history_entries }} entrie<span v-show="history_entries > 1"
          >s</span
        >
        in the history
      </p>
    </v-flex>
    <v-flex v-else xs12 md12>
      <p>You don't have any entry in the history</p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Home',
  middleware: 'authenticated',
  layout: 'navbar',
  data() {
    return {
      epochs: 0,
      max_epochs: 0,
      running: false,
      history_entries: 0
    }
  },
  beforeMount() {
    const parent = this
    this.$axios.setToken(
      this.$cookies.get('auth').access,
      'Bearer'
    )
    this.$axios
      .get('/api/user/stats/')
      .then(function(res) {
        parent.epochs = res.data.epochs
        parent.max_epochs = res.data.max_epochs
        parent.running = res.data.running
        parent.history_entries = res.data.history_entries
      })
      .catch(function(err) {
        console.log(err)
      })
  }
}
</script>

<style scoped></style>
