<template>
    <span>
        <router-link :to="`/account/${post.author.username}`" style="width: 30px; overflow: hidden; display: inline-flex; justify-content: center; float: left; margin-right: 10px">
            <img ref="ava" :src="post.author.image" style="clip-path: circle();">
        </router-link>
        <router-link :to="`/account/${post.author.username}`" style="text-decoration: none; color: white;" :class='{"name":page === false}'>
            {{ post.author.username }}
        </router-link><br>
        <span style="color: rgb(201, 201, 201)" :class="{'date':page == false}">{{ getDate(post.createdAt) }}</span>
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
        },
        mounted () {
            this.$nextTick(function () {
                if (this.$refs.ava.width >= this.$refs.ava.height)
                    this.$refs.ava.style.height = '30px'
                else
                    this.$refs.ava.style.width = '30px'
            })
        }
    }
</script>

<style scoped>
    
    .date {
        color: rgb(150, 150, 150) !important;
    }
    
    .name {
        color:rgb(118, 201, 118) !important;
    }
    .name:hover {
        color: rgb(0, 100, 0) !important;
        text-decoration: underline !important;
    }
</style>
