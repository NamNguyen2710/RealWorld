<template>
    <router-link to="" class="tag">{{ tagName }}</router-link>
</template>

<script>
    export default {
        name: 'tags',
        props: {
            tagUrl: String,
            tagName: String
        },
        methods: {
            getUserUrl(tagUrl){
				return require('' + tagUrl)
			}
        }
    }
</script>

<style scoped>
    .tag {
		text-decoration: none;
		border-radius: 3px;
		padding: 2px;
		padding-left: 8px;
		padding-right: 8px;
		float: right;
		color: white;
		background-color: rgb(82, 80, 80);
		margin:2px;
	}
	.tag:hover {
		background-color: rgb(48, 47, 47);
	}
</style>
