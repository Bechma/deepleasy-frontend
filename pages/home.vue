<template>
  <div>
    <img src="/deepleasy.jpg" />
    <v-flex v-if="max_epochs !== 0">
      <p>
        You have a <span v-if="running" style="color: green">running</span
        ><span v-else style="color: red">queued</span> task
      </p>
    </v-flex>
    <v-flex v-else>
      <p>You don't have any running task at the moment</p>
    </v-flex>
    <v-flex v-if="history_entries > 0">
      <p>
        You have {{ history_entries }} entrie<span v-show="history_entries > 1"
          >s</span
        >
        in the history
      </p>
    </v-flex>
    <v-flex v-else>
      <p>You don't have any entry in the history</p>
    </v-flex>
  </div>
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
    window.$nuxt.$axios.setToken(
      window.$nuxt.$cookies.get('auth').access,
      'Bearer'
    )
    window.$nuxt.$axios
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
