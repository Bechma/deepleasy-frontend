export const state = () => ({
  layersList: [],
  datasetList: [],
  lossList: [],
  optimizerList: [],
  activationList: []
})

export const mutations = {
  SET_LAYERS_LIST(state, act) {
    state.layersList = act
  },
  SET_DATASET_LIST(state, act) {
    state.datasetList = act
  },
  SET_LOSS_LIST(state, act) {
    state.lossList = act
  },
  SET_OPTIMIZER_LIST(state, act) {
    state.optimizerList = act
  },
  SET_ACTIVATION_LIST(state, act) {
    state.activationList = act
  }
}

export const actions = {
  async initLists({ state, commit }) {
    if (
      state.layersList.length !== 0 &&
      state.datasetList.length !== 0 &&
      state.lossList.length !== 0 &&
      state.optimizerList.length !== 0 &&
      state.activationList.length !== 0
    )
      return null
    this.$axios.setToken(this.$cookies.get('auth').access, 'Bearer')
    this.$axios.setHeader('Content-Type', 'application/json')
    const { data } = await this.$axios.get('/api/model/options/')
    commit('SET_LAYERS_LIST', data.layers)
    commit('SET_DATASET_LIST', data.datasets)
    commit('SET_LOSS_LIST', data.losses)
    commit('SET_OPTIMIZER_LIST', data.optimizers)
    commit('SET_ACTIVATION_LIST', data.activations)
  }
}

export const getters = {
  layersList: state => state.layersList,
  datasetList: state => state.datasetList,
  lossList: state => state.lossList,
  optimizerList: state => state.optimizerList,
  activationList: state => state.activationList
}
