<template lang="pug">
	.article(v-if="post.author")
		.container
			.row
				.col-10
					router-link(:to="`/account/${post.author.username}`" class="avatar")
						img(ref="ava" :src="post.author.image" style="clip-path: circle()")
					router-link.text-success(:to="`/account/${post.author.username}`") {{post.author.username}}
					p {{getDate(post.createdAt)}}
				.col-2
					like(:numb="post.favoritesCount" :favored="post.favorited" v-on:favorited="updArtc")
				h3.col-12 {{post.title}}
				p.col-12 {{post.description}}
				router-link.col-3(:to="`/article/${post.slug}`" class="text-success") Read more...
				.col-9(style="display:flex; justify-content: flex-end")
					button.badge(
						v-for="tag in post.tagList" :key="tag"
						class="badge-pill badge-secondary" @click="returnTag(tag)"
					) {{tag}}
</template>

<script>
	import like from "./Like.vue";
	import axios from 'axios';
	import { authHeader } from '../authHeader';

    export default {
		name: 'artc',
		props: { 
			artc: {} 
		},
		data() {
			return {
				post: {}
			}
		},
		components: { like },
		methods: {
			updArtc(value) {
				if (authHeader())
					if (value)
						axios({url: `http://localhost:3000/api/articles/${this.post.slug}/favorite`, method: 'delete', headers: authHeader()})
							.then(response => {this.post = response.data.article})
							.catch(e => console.log(e))
					else
						axios({url: `http://localhost:3000/api/articles/${this.post.slug}/favorite`, method: 'post', headers: authHeader()})
							.then(response => {this.post = response.data.article})
							.catch(e => console.log(JSON.stringify(e)))
			},
			returnTag(value) {
				this.$emit('changeTag', value);
			},
			getDate(date) {
				return new Date(date).toDateString()
			}
		},
		mounted() {
			this.post=this.artc
			this.$nextTick(function () {
                if (this.$refs.ava.width >= this.$refs.ava.height)
                    this.$refs.ava.style.height = '35px'
                else
                    this.$refs.ava.style.width = '35px'
            })
		},
		watch: {
			artc(value) {
				this.post = value
			}
		}
	}
</script>

<style scoped>
</style>