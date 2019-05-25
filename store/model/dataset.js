export const state = () => ({
  trainPercentage: 0.8,
  datasetElect: 'mnist'
})

export const mutations = {
  SET_TRAIN_PERCENTAGE(state, act) {
    state.trainPercentage = act
  },
  SET_DATASET_ELECT(state, act) {
    state.datasetElect = act
  }
}

export const getters = {
  trainPercentage: state => state.trainPercentage,
  datasetElect: state => state.datasetElect
}
