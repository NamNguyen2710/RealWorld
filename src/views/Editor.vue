<template>
    <div>
        <topbar :page="4"></topbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import axios from 'axios';

    export default {
        name: 'editor',
        components: {
            topbar
        },
        mounted() {
            document.title = "Editor"
        }
    }
</script>