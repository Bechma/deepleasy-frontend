<template>
  <v-flex xs12 md12>
    <v-layout row>
      <v-flex xs12 md9>
        <v-select
          v-model="datasetElect"
          label="Dataset"
          :items="$store.state.model.lists.datasetList"
        />
      </v-flex>
      <v-flex xs12 md3>
        <v-text-field
          v-model="trainPercentage"
          label="Percentage for training data"
          type="number"
          @input="train"
        />
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'DatasetParameters',
  data() {
    return {
      trainPercentage: 0.8
    }
  },
  computed: {
    datasetElect: {
      get() {
        return this.$store.state.model.dataset.datasetElect
      },
      set(value) {
        this.$store.commit('model/dataset/SET_DATASET_ELECT', value)
      }
    }
  },
  methods: {
    train() {
      this.trainPercentage = parseFloat(this.trainPercentage)
      if (isNaN(this.trainPercentage)) this.trainPercentage = 0.8
      else {
        if (this.trainPercentage < 0.5) {
          this.$nextTick(() => (this.trainPercentage = 0.5))
        }
        if (this.trainPercentage > 1.0) {
          this.$nextTick(() => (this.trainPercentage = 1.0))
        }
      }

      this.$store.commit(
        'model/dataset/SET_TRAIN_PERCENTAGE',
        this.trainPercentage
      )
    }
  }
}
</script>

<style scoped></style>
