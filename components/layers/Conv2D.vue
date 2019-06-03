<template>
  <v-layout row align-center>
    <v-flex xs12 md3>
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
    <v-flex xs12 md3>
      <v-layout column>
        <v-flex xs12 md6>
          <v-text-field
            v-model="x"
            label="Kernel x"
            type="number"
            min="1"
            max="12"
            @input="xInput"
          />
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field
            v-model="y"
            label="Kernel y"
            type="number"
            min="1"
            max="12"
            @input="yInput"
          />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs12 md3>
      <Activation />
    </v-flex>
  </v-layout>
</template>

<script>
import Activation from './common/Activation'
export default {
  name: 'Conv2D',
  components: { Activation },
  data() {
    return {
      units: 10,
      x: 3,
      y: 3
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
    },
    xInput() {
      this.x = parseInt(this.x)
      if (isNaN(this.x)) this.x = 3
      else {
        if (this.x < 1) {
          this.$nextTick(() => (this.x = 1))
        }
        if (this.x > 12) {
          this.$nextTick(() => (this.x = 12))
        }
      }

      this.$store.commit('model/builder/SET_KERNEL_X', this.x)
    },
    yInput() {
      this.y = parseInt(this.y)
      if (isNaN(this.y)) this.y = 3
      else {
        if (this.y < 1) {
          this.$nextTick(() => (this.y = 1))
        }
        if (this.y > 12) {
          this.$nextTick(() => (this.y = 12))
        }
      }

      this.$store.commit('model/builder/SET_KERNEL_Y', this.y)
    }
  }
}
</script>

<style scoped></style>
