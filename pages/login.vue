<template>
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm9 md5>
            <v-card class="elevation-12">
              <v-alert v-model="alert" dismissible color="error" icon="warning">
                Combination of username / password is incorrect
              </v-alert>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="creds.username"
                    prepend-icon="person"
                    name="username"
                    label="Username"
                    type="text"
                  />
                  <v-text-field
                    v-model="creds.password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submitLogin">
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
  middleware: ['alreadyAuthenticated'],
  data: () => ({
    creds: {},
    alert: false
  }),
  mounted() {
    window.addEventListener('keyup', this.listener)
  },
  destroyed() {
    window.removeEventListener('keyup', this.listener)
  },
  methods: {
    async submitLogin() {
      const parent = this
      this.alert = false
      this.$axios.setHeader('Content-Type', 'application/json')
      await this.$axios
        .$post('/api/auth/token/', {
          username: this.creds.username,
          password: this.creds.password
        })
        .then(function(res) {
          parent.$cookies.set('auth', res)
        })
        .catch(function() {
          parent.alert = true
        })
      if (this.alert !== true) this.$router.push('/home')
    },
    listener(ev) {
      if (ev.code === 'Enter' || ev.code === 'NumpadEnter') this.submitLogin()
    }
  }
}
</script>

<style scoped></style>
