<template>
  <div class="home">
    <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex>
            <p class="text-h4 text--primary text-center">Welcome...</p>
            <v-btn :to="{ name: 'about' }">About</v-btn>
          </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  created() {
  },
  mounted() {
  },
};
</script>
