<template>
  <v-flex xs12 md12>
    <v-text-field
      v-model="rate"
      label="Dropout rate"
      type="number"
      step="0.05"
      min="0.05"
      max="1.0"
      @input="rateInput"
    />
  </v-flex>
</template>

<script>
export default {
  name: 'Dropout',
  data() {
    return {
      rate: 0.2
    }
  },
  methods: {
    rateInput() {
      this.rate = parseFloat(this.rate)
      if (isNaN(this.rate)) this.rate = 0.2
      else {
        if (this.rate < 0.0) {
          this.$nextTick(() => (this.rate = 0.0))
        }
        if (this.rate > 1.0) {
          this.$nextTick(() => (this.rate = 1.0))
        }
      }

      this.$store.commit('model/builder/SET_RATE', this.rate)
    }
  }
}
</script>

<style scoped></style>
