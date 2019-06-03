<template>
  <v-layout row>
    <v-flex xs12 md6>
      <v-radio-group v-model="padding">
        <v-radio label="valid" value="valid"></v-radio>
        <v-radio label="same" value="same"></v-radio>
      </v-radio-group>
    </v-flex>
    <v-flex xs12 md6>
      <v-flex xs12 md3>
        <v-text-field
          v-model="x"
          label="Pool x"
          type="number"
          min="1"
          max="12"
          @input="xInput"
        />
      </v-flex>
      <v-flex xs12 md3>
        <v-text-field
          v-model="y"
          label="Pool y"
          type="number"
          min="1"
          max="12"
          @input="yInput"
        />
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'MaxPooling2D',
  data() {
    return {
      units: 10,
      x: 3,
      y: 3
    }
  },
  computed: {
    padding: {
      get() {
        return this.$store.state.model.builder.padding
      },
      set(value) {
        this.$store.commit('model/builder/SET_PADDING', value)
      }
    }
  },
  methods: {
    xInput() {
      this.x = parseInt(this.x)
      if (isNaN(this.x)) this.x = 3
      else {
        if (this.x < 1) {
          this.$nextTick(() => (this.x = 1))
        }
        if (this.x > 12) {
          this.$nextTick(() => (this.x = 12))
        }
      }

      this.$store.commit('model/builder/SET_KERNEL_X', this.x)
    },
    yInput() {
      this.y = parseInt(this.y)
      if (isNaN(this.y)) this.y = 3
      else {
        if (this.y < 1) {
          this.$nextTick(() => (this.y = 1))
        }
        if (this.y > 12) {
          this.$nextTick(() => (this.y = 12))
        }
      }

      this.$store.commit('model/builder/SET_KERNEL_Y', this.y)
    }
  }
}
</script>

<style scoped></style>
