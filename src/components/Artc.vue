<template>
	<div>
		<!-- add :href="require('userUrl')" -->
		<a class="userIco" href="">
			<img :src="getImgUrl(avaUrl)" style="width: 40px">
		</a>
		<like v-bind:numb="likes" clicked></like>
		<!-- add :href="require('userUrl')" -->
		<a  style="text-decoration: none; color:rgb(118, 201, 118)" href="">
			{{ userName }}
		</a>
		<p style="margin: 5px;">{{ date }}</p>

		<h3 style="margin-bottom: 0;">{{ artTitle }}</h3>
		<p style="margin: 0; color:gray">{{ artTheme }}</p>

		<a href="" style="text-decoration: none; color:rgb(155, 154, 154); font-size: 15px">Read more...</a>
	</div>
</template>

<script>
	import like from "./Like.vue";

    export default {
		name: 'artc',
		props: {
			avaUrl: String,
			likes: Number,
			userName: String,
			userUrl: String,
			date: String,
			artTitle: String,
			artTheme: String,
			artUrl: String
		},
		components: {
			like
		},
		methods: {
			getImgUrl(avaUrl){
				return require('../assets/' + avaUrl)
			},
			getUserUrl(userUrl){
				return require('' + userUrl)
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