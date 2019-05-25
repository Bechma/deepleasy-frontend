<template>
  <v-flex xs12 md12>
    <v-flex xs12 md12>
      <v-select v-model="layersElect" :items="$store.state.model.lists.layersList" label="Layers" />
    </v-flex>
    <v-flex xs12 md12>
      <Dense v-if="layersElect === 'Dense'" />
      <Conv2D v-else-if="layersElect === 'Conv2D'" />
      <MaxPooling2D v-else-if="layersElect === 'MaxPooling2D'" />
      <Dropout v-else-if="layersElect === 'Dropout'" />
    </v-flex>
  </v-flex>
</template>

<script>
import Conv2D from './layers/Conv2D'
import Dense from './layers/Dense'
import MaxPooling2D from './layers/MaxPooling2D'
import Dropout from './layers/Dropout'
export default {
  name: 'Layers',
  components: { Dropout, MaxPooling2D, Dense, Conv2D },
  computed: {
    layersElect: {
      get() {
        return this.$store.state.model.builder.layersElect
      },
      set(value) {
        this.$store.commit('model/builder/SET_LAYERS_ELECT', value)
      }
    }
  }
}
</script>

<style scoped></style>
