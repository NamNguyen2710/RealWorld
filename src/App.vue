<template>
  <div id="app" style="padding-top: 40px">
    <topbar></topbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import topbar from './components/TopBar.vue'

  export default {
    name: 'app',
    components: {
      topbar
    },
    methods: {
      scrollTo: function (hashtag) {
        setTimeout(() => { location.href = hashtag }, 1)
      }
    },
    mounted() {
      if (this.$route.hash) {
        setTimeout(() => this.scrollTo(this.$route.hash), 1)
      }
    }
  }
</script>