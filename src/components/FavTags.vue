<template>
    <span class="box">
		Popular Tags:
		<br>
        <nav>
			<tags v-for="tag in tagsLs" :key="tag.id" :tagName="tag"></tags>
        </nav>
	</span>
</template>

<script>
    import tags from './Tags.vue';

    export default {
        name: 'favtags',
        props: {
            tagsLs: {}
        },
        components: {
            tags
        }
    }
</script>

<style scoped>
    .box { 
        border-radius: 3px;
        padding: 2px;
        padding-left: 8px;
        padding-right: 8px;
        width: 20%; 
        background-color: rgb(196, 195, 195); 
        color: black;
    }
</style>
