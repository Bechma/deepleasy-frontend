<template>
  <v-layout row>
    <v-flex xs12 md6>
      <v-radio-group v-model="padding">
        <v-radio label="valid" value="valid"></v-radio>
        <v-radio label="same" value="same"></v-radio>
      </v-radio-group>
    </v-flex>
    <v-flex xs12 md6>
      <v-flex xs12 md3>
        <v-text-field v-model="x" label="Pool x" type="number" />
      </v-flex>
      <v-flex xs12 md3>
        <v-text-field v-model="y" label="Pool y" type="number" />
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'MaxPooling2D',
  computed: {
    padding: {
      get() {
        return this.$store.state.model.builder.padding
      },
      set(value) {
        this.$store.commit('model/builder/SET_PADDING', value)
      }
    },
    x: {
      get() {
        return this.$store.state.model.builder.kernel.x
      },
      set(value) {
        this.$store.commit('model/builder/SET_KERNEL_X', value)
      }
    },
    y: {
      get() {
        return this.$store.state.model.builder.kernel.y
      },
      set(value) {
        this.$store.commit('model/builder/SET_KERNEL_Y', value)
      }
    }
  }
}
</script>

<style scoped></style>
