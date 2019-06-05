<template>
  <v-flex xs12 md12>
    <v-layout row>
      <v-flex xs12 md9>
        <v-select
          v-model="datasetElect"
          label="Dataset"
          :items="datasetItems"
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
      <v-flex xs12 md12>
        <span>Input Dim: {{ datasetIn }}</span>
        <v-spacer></v-spacer>
        <span>Output Dim: {{ datasetOut }}</span>
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
    },
    datasetItems() {
      const datasets = []
      for (
        let i = 0;
        i < this.$store.state.model.lists.datasetList.length;
        i++
      ) {
        datasets.push(this.$store.state.model.lists.datasetList[i].name)
      }
      return datasets
    },
    datasetIn() {
      const dataset = this.$store.state.model.dataset.datasetElect
      for (
        let i = 0;
        i < this.$store.state.model.lists.datasetList.length;
        i++
      ) {
        if (dataset === this.$store.state.model.lists.datasetList[i].name) {
          return (
            '(' +
            // eslint-disable-next-line standard/computed-property-even-spacing
            this.$store.state.model.lists.datasetList[
              i
            ].input_shape.toString() +
            ')'
          )
        }
      }
      return '? ? ?'
    },
    datasetOut() {
      const dataset = this.$store.state.model.dataset.datasetElect
      for (
        let i = 0;
        i < this.$store.state.model.lists.datasetList.length;
        i++
      ) {
        if (dataset === this.$store.state.model.lists.datasetList[i].name) {
          // eslint-disable-next-line standard/computed-property-even-spacing
          return this.$store.state.model.lists.datasetList[
            i
          ].output_shape.toString()
        }
      }
      return '...?...'
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
