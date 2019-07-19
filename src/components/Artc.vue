<template>
	<div>
		<router-link to="'/account/' + post.author.username" class="userIco">
			<img :src="getImgUrl(post.author.image)" style="width: 40px">
		</router-link>
		<like :numb="post.favoritesCount" :favored="post.favorited"></like>
		<router-link to="'/account/' + post.author.username"  style="text-decoration: none; color:rgb(118, 201, 118)">
			{{ post.author.username }}
		</router-link>
		<p style="margin: 5px;">{{ getDate(post.createdAt) }}</p>

		<h3 style="margin-bottom: 0;">{{ post.title }}</h3>
		<p style="margin: 0; color:gray">{{ post.description }}</p>

		<br>
		<router-link to="'/article/' + post.slug" style="color:rgb(155, 154, 154); font-size: 15px">
			Read more...
		</router-link>
		<tags v-for="tag in post.tagList" :key="tag.id" :tagName="tag" ></tags>
	</div>
</template>

<script>
	import like from "./Like.vue";
	import tags from './Tags.vue';

    export default {
		name: 'artc',
		props: { 
			post: {} 
		},
		components: {
			like, 
			tags
		},
		methods: {
			getImgUrl(avaUrl){
				return require('../assets/' + avaUrl)
			},
			getUserUrl(userUrl){
				return require('' + userUrl)
			},
			getDate(date){
				return new Date(date).toDateString()
			}
		}
	}
</script>

<style scoped>
	.userIco {
		width: 40px;
		height: 40px;
		border-radius: 40px;
		overflow: hidden;
		margin-right: 10px;
		float: left;
	}
</style>