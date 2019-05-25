<template>
  <v-layout row wrap>
    <v-flex xs12 md12>
      <v-list three-line>

        <v-list-tile v-for="(layer, index) in layers2send" :key="index" @click="layer.selected = !layer.selected">
          <v-list-tile-action>
            <v-checkbox :value="layer.selected"></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              {{ layer.name }}
            </v-list-tile-title>

            <v-list-tile-sub-title>
              {{ getOptions(layer) }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'ModelPreview',
  props: {
    layers2send: {
      type: Array,
      required: true
    }
  },
  methods: {
    getOptions(layer) {
      switch (layer.name) {
        case 'Dense':
          return `Amount: ${layer.units}, Activation: ${layer.activation}`
        case 'Dropout':
          return `Rate: ${layer.rate}`
        case 'Conv2D':
          return `Amount: ${layer.units}, Activation: ${layer.activation}, Kernel: (${layer.kernel.x}, ${layer.kernel.y})`
        case 'MaxPooling2D':
          return `Padding: ${layer.padding}, Kernel: (${layer.kernel.x}, ${layer.kernel.y})`
        case 'Flatten':
          return `No extra configuration options`
      }
    }
  }
}
</script>

<style scoped>

</style>
