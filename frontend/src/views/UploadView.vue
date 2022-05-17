<template>
  <div class="home">
    <v-container>
      <v-alert
        v-show="showSuccess"
        color="primary"
      >
        <h3>Image Uploaded!</h3>
      </v-alert>

      <v-card>
        <v-card-title>Upload an Image</v-card-title>
        <v-card-text>
          <v-text-field v-model="payload.username" label="Username"></v-text-field>
          <v-file-input
            accept="image/jpg"
            v-model="payload.file"
            label="Image"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="upload">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import imagesApi from '@/api/images';

export default {
  name: 'UploadView',
  data() {
    return {
      showSuccess: false,
      payload: {
        file: null,
        username: null,
      },
    };
  },
  methods: {
    async upload() {
      this.showSuccess = false;
      try {
        const data = new FormData();
        data.append('file', this.payload.file, this.payload.file.name);
        data.append('username', this.payload.username);
        await imagesApi.upload(data);
        this.showSuccess = true;
      } catch (error) {
        console.log('upload error', error);
      }
    },
  },
};
</script>

<style>

</style>
