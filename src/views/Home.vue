<template>
  <div class="home">
    <invoice msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Invoice from '@/components/Invoice.vue';

export default {
  name: 'HomeView',
  components: {
    Invoice,
  },
};
</script>
