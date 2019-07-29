<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  button:focus {
    outline-width: 0;
  }
  input:focus {
    outline-width: 0;
  }
</style>