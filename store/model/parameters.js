export const state = () => ({
  lossElect: 'null',
  optimizerElect: 'null',
  epochs: 10,
  batchSize: 64
})

export const mutations = {
  SET_LOSS_ELECT(state, act) {
    state.lossElect = act
  },
  SET_OPTIMIZER_ELECT(state, act) {
    state.optimizerElect = act
  },
  SET_EPOCHS(state, act) {
    state.epochs = act
  },
  SET_BATCH_SIZE(state, act) {
    state.batchSize = act
  }
}

export const getters = {
  lossElect: state => state.lossElect,
  optimizerElect: state => state.optimizerElect,
  epochs: state => state.epochs,
  batchSize: state => state.batchSize,
}
