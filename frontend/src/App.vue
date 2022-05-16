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
      <v-responsive class="mx-auto" max-width="600">
        <router-view exact />
      </v-responsive>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    };
  },
  computed: {},
  methods: {
  },
  mounted() {
  },
};
</script>
