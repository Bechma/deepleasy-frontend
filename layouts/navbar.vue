<template>
  <v-app>
    <Navigation />
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <nuxt />
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from '../components/Navigation'
export default {
  components: { Navigation }
}
</script>

<style scoped></style>
