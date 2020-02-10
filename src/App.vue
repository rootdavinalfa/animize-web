<template>
  <div id="app">
    <navbar></navbar>
    <!-- component matched by the route will render here -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <footers></footers>
  </div>
</template>
<script>
  import navbar from '@/components/frame/navbar.vue'
  import footers from '@/components/frame/footer.vue'
  export default {
    name: 'app',
    components: {
      navbar,
      footers,
    },
    created() {}
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>