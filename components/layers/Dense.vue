<template>
  <v-layout row>
    <v-flex xs12 md5 ml3>
      <v-text-field
        v-model="units"
        label="Number of neurons"
        type="number"
        min="1"
        max="10000"
        @input="unitsInput"
      />
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
  data() {
    return {
      units: 10
    }
  },
  methods: {
    unitsInput() {
      this.units = parseInt(this.units)
      if (isNaN(this.units)) this.units = 10
      else {
        if (this.units < 1) {
          this.$nextTick(() => (this.units = 1))
        }
        if (this.units > 10000) {
          this.$nextTick(() => (this.units = 10000))
        }
      }
      this.$store.commit('model/builder/SET_UNITS', this.units)
    }
  }
}
</script>

<style scoped></style>
