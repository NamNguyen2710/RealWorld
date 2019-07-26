<template>
	<div>
		<like :numb="post.favoritesCount" :favored="post.favorited"></like>
		<ufa :post="post" :page="false"></ufa>

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
	import ufa from "./UserForArtc.vue";

    export default {
		name: 'artc',
		props: { 
			post: {} 
		},
		components: {
			like, 
			tags,
			ufa
		}
	}
</script>

<style scoped>
</style>