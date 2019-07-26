<template>
    <span>
        <router-link :to="`/account/${post.author.username}`" style="float: left">
            <img :src="post.author.image" style="width: 40px; margin-right: 10px; clip-path: circle(); margin-top: -5px">
        </router-link>
        <router-link :to="`/account/${post.author.username}`" style="text-decoration: none; color: white;" :class='{"name":page === false}'>
            {{ post.author.username }}
        </router-link><br>
        <span style="color: rgb(201, 201, 201)" :class="{'date':page ===false}">{{ getDate(post.createdAt) }}</span>
    </span>
</template>

<script>
    export default {
        name: 'userforarct',
        props: {
            post: {},
            page: Boolean
        },
        methods: {
            getDate(date) {
				return new Date(date).toDateString()
			}
        }
    }
</script>

<style scoped>
    
    .date {
        color: black !important;
    }
    
    .name {
        color:rgb(118, 201, 118) !important;
    }
    .name:hover {
        color: rgb(0, 100, 0) !important;
        text-decoration: underline !important;
    }
</style>
