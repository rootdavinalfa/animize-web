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
          <b-form-input class="mr-sm-2" placeholder="Search Animize...."></b-form-input>
          <b-button class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
  export default {
    name: 'navbar-top',
  }
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Slackey&display=swap');
  .navbar-brand {
    font-family: 'Slackey', cursive;
    font-size: 2em;
  }
  .nav-link{
    font-size: 1.2em;
  }

  .navbar {
    color: white;
    background: rgb(37, 73, 120);
    background: linear-gradient(90deg, rgba(37, 73, 120, 1) 0%, rgba(33, 31, 203, 1) 19%, rgba(41, 41, 167, 1) 37%, rgba(7, 44, 144, 1) 48%, rgba(7, 51, 149, 1) 58%, rgba(6, 57, 153, 1) 68%, rgba(56, 138, 154, 1) 100%);
  }
  .form-input{
    height: 3em;
  }

  button {
    height: 2.5em;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    background-color: rgb(24, 21, 148)
  }
</style>