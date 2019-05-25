<template>
  <div>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list>
        <v-list-tile
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-footer app fixed>
        <span>&copy; 2019</span>
      </v-footer>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Deepleasy</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data: () => ({
    drawer: null,
    navigationItems: [
      {
        icon: 'dashboard',
        text: 'Home',
        path: '/home'
      },
      {
        icon: 'build',
        text: 'Build Models',
        path: '/build'
      },
      {
        icon: 'timeline',
        text: 'Progress',
        path: '/progress'
      },
      {
        icon: 'history',
        text: 'History',
        path: '/history'
      },
      {
        icon: 'not_interested',
        text: 'Logout',
        path: '/logout'
      }
    ]
  })
}
</script>

<style scoped></style>
