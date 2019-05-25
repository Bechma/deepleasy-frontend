<template>
  <v-flex xs12 md12>
    <v-text-field
      v-model="rate"
      label="Dropout rate"
      type="number"
      step="0.05"
    />
  </v-flex>
</template>

<script>
export default {
  name: 'Dropout',
  computed: {
    rate: {
      get() {
        return this.$store.state.model.builder.rate
      },
      set(value) {
        this.$store.commit('model/builder/SET_RATE', parseFloat(value))
      }
    }
  }
}
</script>

<style scoped></style>
