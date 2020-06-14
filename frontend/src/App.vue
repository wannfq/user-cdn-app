<template>
  <h1>{{ name }}</h1>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  data() {
    return {
      name: 'Frontend',
      text: '',
    };
  },
  async mounted() {
    const res = await axios.get('/hello');
    console.log(res);
  },
});
</script>
