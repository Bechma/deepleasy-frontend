<template>
  <v-layout row align-center>
    <v-flex xs12 md3>
      <v-text-field v-model="units" label="Number of neurons" type="number" />
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs12 md3>
      <v-layout column>
        <v-flex xs12 md6>
          <v-text-field v-model="x" label="Kernel x" type="number" />
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field v-model="y" label="Kernel y" type="number" />
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
  computed: {
    units: {
      get() {
        return this.$store.state.model.builder.units
      },
      set(value) {
        this.$store.commit('model/builder/SET_UNITS', parseInt(value, 10))
      }
    },
    x: {
      get() {
        return this.$store.state.model.builder.kernel.x
      },
      set(value) {
        this.$store.commit('model/builder/SET_KERNEL_X', parseInt(value, 10))
      }
    },
    y: {
      get() {
        return this.$store.state.model.builder.kernel.y
      },
      set(value) {
        this.$store.commit('model/builder/SET_KERNEL_Y', parseInt(value, 10))
      }
    }
  }
}
</script>

<style scoped></style>
