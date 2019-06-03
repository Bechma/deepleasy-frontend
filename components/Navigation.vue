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
        <v-list-tile @click.stop="dialog = true">
          <v-list-tile-action>
            <v-icon>not_interested</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-footer app fixed>
        <span>&copy; 2019</span>
      </v-footer>
    </v-navigation-drawer>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Do you really want to logout?
        </v-card-title>

        <v-card-text>You will be redirected to the login page.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" flat="flat" @click="logout(false)">
            No
          </v-btn>

          <v-btn color="green darken-1" flat="flat" @click="logout(true)">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    dialog: false,
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
        icon: 'check',
        text: 'Test',
        path: '/test',
        active: false,
        items: []
      }
    ]
  }),
  methods: {
    logout(decision) {
      this.dialog = false
      if (decision) {
        this.$cookies.remove('auth')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped></style>
