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
          min="1"
          max="100"
          @input="epochsInput"
        />
      </v-flex>
      <v-flex xs12 md6>
        <v-text-field
          v-model="batchSize"
          class="purple-input"
          label="Batch size"
          type="number"
          step="10"
          min="1"
          max="60000"
          @input="batchInput"
        />
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'ModelParameters',
  data() {
    return {
      epochs: 10,
      batchSize: 64
    }
  },
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
    }
  },
  methods: {
    epochsInput() {
      this.epochs = parseInt(this.epochs)
      if (isNaN(this.epochs)) this.epochs = 10
      else {
        if (this.epochs < 1) {
          this.$nextTick(() => (this.epochs = 1))
        }
        if (this.epochs > 100) {
          this.$nextTick(() => (this.epochs = 100))
        }
      }
      this.$store.commit('model/parameters/SET_EPOCHS', this.epochs)
    },
    batchInput() {
      this.batchSize = parseInt(this.batchSize)
      if (isNaN(this.batchSize)) this.batchSize = 64
      else {
        if (this.batchSize < 1) {
          this.$nextTick(() => (this.batchSize = 1))
        }
        if (this.batchSize > 60000) {
          this.$nextTick(() => (this.batchSize = 60000))
        }
      }
      this.$store.commit('model/parameters/SET_BATCH_SIZE', this.batchSize)
    }
  }
}
</script>

<style scoped></style>
