<template>
  <div>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list>
        <div v-for="(item, index) in navigationItems" :key="index">
          <v-list-tile v-if="item.items.length === 0" :to="item.path">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-group
            v-else
            v-model="item.active"
            :prepend-icon="item.icon"
            no-action
          >
            <template #activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.text"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
              v-for="(subItem, ind) in item.items"
              :key="ind"
              :to="subItem.path"
            >
              <v-list-tile-content>
                <v-list-tile-title v-text="subItem.text"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </div>
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
        path: '/home',
        active: false,
        items: []
      },
      {
        icon: 'build',
        text: 'Build Models',
        path: '',
        active: false,
        items: [
          {
            text: 'Supervised',
            path: '/build/supervised'
          },
          {
            text: 'Unsupervised',
            path: '/build/unsupervised'
          }
        ]
      },
      {
        icon: 'timeline',
        text: 'Progress',
        path: '/progress',
        active: false,
        items: []
      },
      {
        icon: 'history',
        text: 'History',
        path: '/history',
        active: false,
        items: []
      },
      {
        icon: 'not_interested',
        text: 'Logout',
        path: '/logout',
        active: false,
        items: []
      }
    ]
  })
}
</script>

<style scoped></style>
