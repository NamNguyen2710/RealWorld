<template>
	<div>
		<like :numb="post.favoritesCount" :favored="post.favorited" v-on:favorited=updArtc></like>
		<utag :author="post.author" :date="post.createdAt" :page="false"></utag>

		<h3 style="margin-bottom: 0; font-family: sans-serif">{{ post.title }}</h3>
		<p style="margin: 0; color:gray">{{ post.description }}</p>

		<br>
		<router-link :to="`/article/${post.slug}`" style="color:rgb(155, 154, 154); font-size: 15px">
			Read more...
			<tags v-for="tag in post.tagList" :key="tag.id" :tagName="tag" ></tags>
		</router-link>
		
	</div>
</template>

<script>
	import like from "./Like.vue";
	import tags from './Tags.vue';
	import utag from "./UserTag.vue";
	import axios from 'axios';
	import { authHeader } from '../authHeader';

    export default {
		name: 'artc',
		props: { 
			post: {} 
		},
		components: {
			like, 
			tags,
			utag
		},
		methods: {
			updArtc(value) {
				if (value)
					axios({url: `http://localhost:3000/api/articles/${this.post.slug}/favorite`, method: 'delete', headers: authHeader()})
						.then(response => {this.post = response.data.article})
						.catch(e => console.log(e))
				else
					axios({url: `http://localhost:3000/api/articles/${this.post.slug}/favorite`, method: 'post', headers: authHeader()})
						.then(response => {this.post = response.data.article})
						.catch(e => console.log(JSON.stringify(e)))
			}
		}
	}
</script>

<style scoped>
</style>