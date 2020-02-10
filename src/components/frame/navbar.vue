<template>
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand to="/">Animize</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/new">New Release</b-nav-item>
        <b-nav-item to="/genre">Genre</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input class="mr-sm-2" placeholder="Search Animize...." v-model="querysearch"
            @keydown.enter.native="onEnterPressed"></b-form-input>
          <b-button variant="outline-primary" id="btn" class="my-2 my-sm-0" :to="'/search/'+querysearch">Search
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
  export default {
    name: 'navbar-top',
    data() {
      return {
        querysearch: ""
      }
    },
    methods: {
      onEnterPressed() {
        this.$router.push({
          path: '/search/' + this.querysearch
        })
      }
    },
  }
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Slackey&display=swap');

  .navbar-brand {
    font-family: 'Slackey', cursive;
    font-size: 2em;
  }

  .nav-link {
    font-size: 1.2em;
  }

  .navbar {
    color: white;
    background-color: #FF3CAC;
    background-image: linear-gradient(270deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
  }

  .form-input {
    height: 3em;
  }

  #btn {
    height: 2.5em;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }
</style>