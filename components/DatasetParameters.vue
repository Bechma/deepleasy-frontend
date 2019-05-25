<template>
  <v-flex xs12 md12>
    <v-layout row>
      <v-flex xs12 md9>
        <v-select v-model="datasetElect" label="Dataset" :items="$store.state.model.lists.datasetList" />
      </v-flex>
      <v-flex xs12 md3>
        <v-text-field
          v-model="trainPercentage"
          label="Percentage for training data"
          type="number"
          step="0.05"
        />
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'DatasetParameters',
  computed: {
    datasetElect: {
      get() {
        return this.$store.state.model.dataset.datasetElect
      },
      set(value) {
        this.$store.commit('model/dataset/SET_DATASET_ELECT', value)
      }
    },
    trainPercentage: {
      get() {
        return this.$store.state.model.dataset.trainPercentage
      },
      set(value) {
        this.$store.commit('model/dataset/SET_TRAIN_PERCENTAGE', parseFloat(value))
      }
    }
  }
}
</script>

<style scoped></style>
