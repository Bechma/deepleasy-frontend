<template>
  <v-layout row>
    <v-flex xs12 md5 ml3>
      <v-text-field v-model="units" label="Number of neurons" type="number" />
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs12 md5>
      <Activation />
    </v-flex>
  </v-layout>
</template>

<script>
import Activation from './common/Activation'
export default {
  name: 'Dense',
  components: { Activation },
  computed: {
    units: {
      get() {
        return this.$store.state.model.builder.units
      },
      set(value) {
        this.$store.commit('model/builder/SET_UNITS', parseInt(value, 10))
      }
    }
  }
}
</script>

<style scoped></style>
