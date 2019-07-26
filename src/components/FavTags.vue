<template>
    <div class="box">
		<p style="font-family: sans-serif; margin: 5px; font-size: 14px">Popular Tags</p>
		<tags v-for="tag in tagsLs" :key="tag.id" :tagName="tag" v-on:changeTag="returnTag"></tags>
	</div>
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
        },
        methods: {
            returnTag(value) {
                this.$emit('changeTag', value)
            }
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
        float:right;
    }
</style>
