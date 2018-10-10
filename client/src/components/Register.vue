<template>
  <v-app id="register" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex primary--text">Register</h1>
                </div>
                <v-alert :value="error" outline type="error">{{ error_text }}</v-alert>
                <v-form>
                  <v-text-field name="name" label="Nama" type="text" v-model="model.name"></v-text-field>
                  <v-text-field name="email" label="Email" type="email" v-model="model.email"></v-text-field>
                  <v-text-field counter="13" name="phone" label="No HP" type="number" v-model="model.phone"></v-text-field>
                  <v-textarea v-model="model.address">
                    <div slot="label">
                      Alamat
                    </div>
                  </v-textarea>
                  <v-text-field name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary" @click="save" :loading="loading">Register</v-btn>
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
      name: '',
      email: '',
      phone: '',
      address: '',
      password: ''
    }
  }),
  mounted () {
    let self = this
    window.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        self.save()
      }
    })
  },
  methods: {
    async save () {
      this.loading = true
      try {
        const response = await AuthenticationService.register({
          name: this.model.name,
          email: this.model.email,
          phone: this.model.phone,
          address: this.model.address,
          password: this.model.password,
          nik: '7777',
          groupId: 1
        })
        if (response.data.hasOwnProperty('error')) {
          this.error = true
          this.error_text = response.data.error
          this.loading = false
        } else {
          this.$router.push({
            name: 'login'
          })
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }

}
</script>
<style scoped lang="css">
  #register {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
