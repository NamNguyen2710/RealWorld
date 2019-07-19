<template>
    <div>
        <tr v-for="article in articles" :key="article.id">
            <td><artc :post="article"></artc></td>
        </tr>
    </div>
</template>

<script>
    import artc from './Artc.vue';

    export default {
        name: 'printartc',
        components: {
            artc
        },
        props: { articles: {} }
    }
</script>

<style scoped>
    tr, td {
        border-bottom: 1px solid rgb(167, 164, 164);
        width: 77vw;
        padding: 30px;
    }
</style>