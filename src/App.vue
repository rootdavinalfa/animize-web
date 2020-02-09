<template>
  <div id="app">
    <navbar></navbar>
    <!-- component matched by the route will render here -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import navbar from '@/components/frame/navbar.vue'
  export default {
    name: 'app',
    components: {
      navbar,
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to

  /* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
  }
</style>