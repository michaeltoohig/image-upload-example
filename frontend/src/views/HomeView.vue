<template>
  <div class="home">
    <v-container>
      <div class="mb-3">
        <v-btn @click="openCreateDialog">Add User</v-btn>
      </div>
      <v-card>
        <v-card-title v-if="isCreateUser">Users</v-card-title>
        <v-card-title v-else>Update User</v-card-title>
        <v-list v-if="users.length > 0">
          <v-list-item
            v-for="user in users"
            :key="user.id"
          >
            <v-list-item-content>
              <v-list-item-title v-text="user.username"></v-list-item-title>
              <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action class="d-flex flex-row">
              <v-btn icon @click="openUpdateDialog(user)">
                <v-icon color="grey lighten-1">mdi-update</v-icon>
              </v-btn>
              <v-btn icon @click="remove(user.id)">
                <v-icon color="grey lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-card-text v-else>
          No users yet...
        </v-card-text>
      </v-card>
    </v-container>

    <v-dialog persistent v-model="userDialog" max-width="500">
      <v-card>
        <v-card-title>Add User</v-card-title>
        <v-card-text>
          <v-text-field
            label="Username"
            v-model="form.username"
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="form.email" type="email"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="userDialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="submit" v-if="isCreateUser">Submit</v-btn>
          <v-btn @click="update" v-else>Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import usersApi from '@/api/users';

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      selectedUser: null,
      form: {
        username: null,
        email: null,
      },
      users: [],
      userDialog: false,
    };
  },
  computed: {
    isCreateUser() {
      return this.selectedUser === null;
    },
  },
  methods: {
    async getUsers() {
      try {
        const resp = await usersApi.getUsers();
        this.users = resp.data;
      } catch (error) {
        console.log('user error', error);
      }
    },
    async submit() {
      try {
        const resp = await usersApi.createUser(this.form);
        this.users.push(resp.data);
        this.userDialog = false;
        this.resetUserDialog();
      } catch (error) {
        console.log('create user error', error);
      }
    },
    resetUserDialog() {
      this.selectedUser = null;
      this.form = {
        username: null,
        email: null,
      };
    },
    openCreateDialog() {
      this.resetUserDialog();
      this.userDialog = true;
    },
    openUpdateDialog(user) {
      this.selectedUser = user.id;
      this.form.username = user.username;
      this.form.email = user.email;
      this.userDialog = true;
    },
    async update() {
      try {
        const resp = await usersApi.updateUser(this.selectedUser, this.form);
        const index = this.users.findIndex((u) => u.id === resp.data.id);
        this.users.splice(index, 1, resp.data);
      } catch (error) {
        console.log('update user error', error);
      } finally {
        this.userDialog = false;
        this.resetUserDialog();
      }
    },
    async remove(id) {
      try {
        await usersApi.deleteUser(id);
        const index = this.users.findIndex((u) => u.id === id);
        this.$delete(this.users, index);
      } catch (error) {
        console.log('delete user error', error);
      }
    },
  },
  created() {
  },
  async mounted() {
    await this.getUsers();
  },
};
</script>
