<template>
  <div></div>
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
    const res = await axios.get('/user/all');
    console.log(res);
  },
});
</script>
