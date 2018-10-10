export default [
  {
    name: 'APP_LOGOUT',
    callback: function (e) {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setRole', 'guest')
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Logout successfully.'
      }
      this.$router.replace({ name: 'login' })
    }
  },
  {
    name: 'APP_LOGIN',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Login successfully.'
      }
    }
  }
]
