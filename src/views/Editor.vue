<template lang="pug">
    router-view
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'editor',
        mounted() {
            document.title = "Editor"
        }
    }
</script>