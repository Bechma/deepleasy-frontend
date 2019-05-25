export const state = () => ({
  activation: 'softmax',
  units: 5,
  kernel: { x: 3, y: 3 },
  padding: 'valid',
  rate: 0.2,
  layersElect: 'Dense'
})

export const mutations = {
  SET_ACTIVATION(state, act) {
    state.activation = act
  },
  SET_KERNEL_X(state, act) {
    state.kernel.x = act
  },
  SET_KERNEL_Y(state, act) {
    state.kernel.y = act
  },
  SET_PADDING(state, act) {
    state.padding = act
  },
  SET_RATE(state, act) {
    state.rate = act
  },
  SET_LAYERS_ELECT(state, act) {
    state.layersElect = act
  },
  SET_UNITS(state, act) {
    state.units = act
  }
}

export const getters = {
  activation: state => state.activation,
  units: state => state.units,
  kernel: state => state.kernel,
  padding: state => state.padding,
  rate: state => state.rate,
  layersElect: state => state.layersElect
}
