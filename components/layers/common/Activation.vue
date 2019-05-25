<template>
  <v-select v-model="activation" :items="activations" label="Activation" />
</template>

<script>
export default {
  name: 'Activation',
  computed: {
    activation: {
      get() {
        return this.$store.state.model.builder.activation
      },
      set(value) {
        this.$store.commit('model/builder/SET_ACTIVATION', value)
      }
    }
  },
  data() {
    return {
      activations: [
        'softmax',
        'elu',
        'selu',
        'softplus',
        'softsign',
        'relu',
        'tanh',
        'sigmoid',
        'hard_sigmoid',
        'exponential',
        'linear'
      ]
    }
  }
}
</script>

<style scoped></style>
