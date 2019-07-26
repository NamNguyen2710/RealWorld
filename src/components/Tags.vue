<template>
    <button to="" class="tag" @click="returnTag">
		{{ tagName }}</button>
</template>

<script>
    export default {
        name: 'tags',
        props: {
            tagName: String
		},
		methods: {
			returnTag() {
				this.$emit('changeTag', this.tagName);
			}
		}
    }
</script>

<style scoped>
    .tag {
		border-radius: 3px;
		padding: 2px;
		padding-left: 8px;
		padding-right: 8px;
		float: right;
		color: white;
		background-color: rgb(82, 80, 80);
		margin:2px;
		border: hidden;
	}
	.tag:hover {
		background-color: rgb(48, 47, 47);
	}
	.tag:focus {
		outline: none;
	}
</style>
