<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 primary--text">Login</h1>
                </div>
                <v-alert :value="error" outline type="error">{{ error_text }}</v-alert>
                <v-form>
                  <v-text-field append-icon="person" name="nik" label="nik" type="text" v-model="model.nik"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block flat small color="error" @click="register">Register</v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data: () => ({
    loading: false,
    error: false,
    error_text: '',
    model: {
      nik: '',
      password: ''
    }
  }),
  mounted () {
    let self = this
    window.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        self.login()
      }
    })
  },
  methods: {
    async login () {
      this.loading = true
      try {
        const response = await AuthenticationService.login({
          nik: this.model.nik,
          password: this.model.password
        })

        if (response.data.hasOwnProperty('error')) {
          this.error = true
          this.error_text = response.data.error
          this.loading = false
        } else {
          var role = response.data.user.group.name
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$store.dispatch('setRole', role)
          this.$acl.change(role)
          window.getApp.$emit('APP_LOGIN')
          this.$router.push({
            name: 'dashboard'
          })  
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    register () {
      this.$router.push('/register')
    }
  }

}
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
