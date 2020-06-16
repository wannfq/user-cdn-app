<template>
  <div class="container">
    <div class="row justify-content-center py-5">
      <div class="col-6 col-md-8 col-sm-10 col-xs-12">
        <div
          class="btn btn-link font-weight-bold btn-default"
          @click="createDummyUser"
        >
          Create Dummy User
        </div>
        <div class="card my-2" v-for="user in users" :key="user.id">
          <div class="card-body">
            <h4>{{ user.username }}</h4>
            <p class="card-text font-weight-bold text-muted mb-0">
              {{ user.email }}
            </p>
            <p class="card-text font-weight-bold text-muted mb-0">
              {{ user.phone }}
            </p>
            <p class="card-text mb-0">
              <span class="font-weight-bold mr-2">Skillsets :</span
              >{{ user.skillsets }}
            </p>
            <p class="card-text mb-0">
              <span class="font-weight-bold mr-2">Hobby :</span>{{ user.hobby }}
            </p>
            <hr />
            <div
              href="#"
              class="btn btn-link font-weight-bold text-danger mr-3"
              @click="deleteUser(user.id)"
            >
              Delete
            </div>
            <!-- <div href="#" class="btn btn-link font-weight-bold text-info">
              Edit
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import * as _ from 'lodash';

export default Vue.extend({
  data() {
    return {
      users: [],
      page: 0,
      perPage: 10,
      total: 0,
    };
  },
  methods: {
    async fetchUsers(reset: boolean = true) {
      if (reset) {
        this.users = [];
        this.page = 0;
        this.total = 0;
      }
      this.page += 1;
      const res = await axios.get(
        `/user?page=${this.page}&perPage=${this.perPage}`,
      );
      this.users = [...this.users, ...res.data.data];
      this.total = res.data.count;
    },
    async deleteUser(id: number) {
      const res = await axios.delete(`/user/${id}`);
      this.users = _.filter(this.users, user => user.id !== id);
    },
    async createDummyUser() {
      const res = await axios.post('/user/dummy');
      await this.fetchUsers(true);
    },
  },
  mounted() {
    this.fetchUsers();
  },
});
</script>
