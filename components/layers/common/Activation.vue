<template>
  <v-select
    v-model="activation"
    :items="$store.state.model.lists.activationList"
    label="Activation"
  />
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
  }
}
</script>

<style scoped></style>
