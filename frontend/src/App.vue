<template>
  <v-app>
    <v-main>
      <v-app-bar>
        <v-toolbar-title>Flask Vue Starter</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'home' }" exact>
          <v-btn icon><v-icon>mdi-home</v-icon></v-btn>
        </router-link>
      </v-app-bar>
      <router-view exact />
    </v-main>
  </v-app>
</template>

<script>
import { getLocalUser, saveLocalUser, removeLocalUser } from '@/utils';
import authApi from '@/api/auth';
import userApi from '@/api/user';

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: null,
      user: {},
      username: null,
      showLoginModal: false,
    };
  },
  computed: {},
  watch: {
    showLoginModal(val) {
      if (!val) return;
      this.username = null;
    },
  },
  methods: {
    logout() {
      removeLocalUser();
      this.user = {};
      this.isLoggedIn = false;
    },
    async login() {
      // Obviously, this is a fake solution
      let user = {};
      try {
        const resp = await authApi.login({ username: this.username });
        user = resp.data;
      } catch (error) {
        // Create new user and complete login
        if (error.response.status === 401) {
          const resp = await userApi.createUser({ username: this.username });
          user = resp.data;
        }
      } finally {
        saveLocalUser(user);
        this.user = user;
        this.isLoggedIn = true;
        this.showLoginModal = false;
      }
    },
  },
  mounted() {
    const localUser = getLocalUser();
    if (localUser) {
      this.user = JSON.parse(localUser);
      this.isLoggedIn = true;
    } else {
      this.user = {};
      this.isLoggedIn = false;
    }
  },
};
</script>
