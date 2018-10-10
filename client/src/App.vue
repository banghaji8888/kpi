<template>
  <div id="appRoot">
    <template v-if="$route.meta.private">
      <v-app id="inspire" class="app">
        <app-drawer class="app--drawer"></app-drawer>
        <app-toolbar class="app--toolbar"></app-toolbar>
        <v-content>
          <!-- Page Header -->
          <div class="page-wrapper">
            <router-view></router-view>
          </div>
           <!-- App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer">
            <span class="caption">Media Millenial &copy; {{ new Date().getFullYear() }}</span>
          </v-footer>
        </v-content>
        <!-- Go to top -->
        <app-fab></app-fab>
      </v-app>
    </template>
    <template v-else>
      <div class="page-wrapper">
        <router-view></router-view>
      </div>
    </template>
    <v-snackbar :timeout="3000" bottom right :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import AppDrawer from '@/components/main/AppDrawer'
import AppToolbar from '@/components/main/AppToolbar'
import AppFab from '@/components/main/AppFab'
import {mapState} from 'vuex'
import AppEvents from './event'

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: '',
      color: ''
    }
  }),
  computed: {
    ...mapState([
      'role'
    ])
  },
  created () {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback)
    })
    window.getApp = this
    this.$acl.change(this.role)
  }
}
</script>

<style>
@import "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700%7CMaterial+Icons";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.setting-fab{
  top:50%!important;
  right:0;
  border-radius:0
}
.page-wrapper{
  min-height:calc(100vh - 64px - 50px - 81px );
}
.v-toolbar__content{
  padding: 0 15px 0 0;
}
</style>
