<template>
    <span>
        <router-link :to="`/account/${author.username}`" class="avatar">
            <img ref="ava" :src="author.image" style="clip-path: circle();">
        </router-link>
        <router-link :to="`/account/${author.username}`" style="text-decoration: none; color: white;" :class='{"name":page === false}'>
            {{ author.username }}
        </router-link><br>
        <span style="color: rgb(201, 201, 201)" :class="{'date':page == false}">{{ getDate(date) }}</span>
    </span>
</template>

<script>
    export default {
        name: 'userforarct',
        props: {
            author: {},
            date: {},
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
    .avatar {
        width: 30px; 
        overflow: hidden; 
        display: inline-flex; 
        justify-content: center; 
        float: left; 
        margin-right: 10px
    }

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
