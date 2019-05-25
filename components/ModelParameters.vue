<template>
  <v-flex xs12 md12>
    <v-layout row>
      <v-flex xs12 md6>
        <v-select
          v-model="lossElect"
          label="Loss function"
          :items="$store.state.model.lists.lossList"
        />
      </v-flex>
      <v-flex xs12 md6>
        <v-select
          v-model="optimizerElect"
          label="Optimizer"
          :items="$store.state.model.lists.optimizerList"
        />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md6>
        <v-text-field
          v-model="epochs"
          class="purple-input"
          label="Epochs"
          type="number"
        />
      </v-flex>
      <v-flex xs12 md6>
        <v-text-field
          v-model="batchSize"
          class="purple-input"
          label="Batch size (0 to disable it)"
          type="number"
          step="10"
        />
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'ModelParameters',
  computed: {
    lossElect: {
      get() {
        return this.$store.state.model.parameters.lossElect
      },
      set(value) {
        this.$store.commit('model/parameters/SET_LOSS_ELECT', value)
      }
    },
    optimizerElect: {
      get() {
        return this.$store.state.model.parameters.optimizerElect
      },
      set(value) {
        this.$store.commit('model/parameters/SET_OPTIMIZER_ELECT', value)
      }
    },
    epochs: {
      get() {
        return this.$store.state.model.parameters.epochs
      },
      set(value) {
        this.$store.commit('model/parameters/SET_EPOCHS', parseInt(value, 10))
      }
    },
    batchSize: {
      get() {
        return this.$store.state.model.parameters.batchSize
      },
      set(value) {
        this.$store.commit(
          'model/parameters/SET_BATCH_SIZE',
          parseInt(value, 10)
        )
      }
    }
  }
}
</script>

<style scoped></style>
