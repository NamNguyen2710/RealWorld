<template lang="pug">
    button.btn(
        class="artcBtn" @click="favorited" 
        :class="favored? 'liked' : 'like'"
    ) {{optText}}{{numb}} 
        span.heart
</template>

<script>
    export default {
        name: 'like',
        props: {
            numb: Number,
            favored: Boolean,
            optText: String
        },
        methods: {
            favorited() {
                this.$emit('favorited', this.favored)
            }
        }
    }
</script>

<style scoped>
    .like:hover .heart:before, .like:hover .heart:after, .liked .heart:after, .liked .heart:before{
        background: white;
    }
    
    .heart {
        position: relative;
        width: 10px;
        height: 10px;
        float: right;
        margin: 1px 3px;
    }
    .heart:before, .heart:after {
        position: absolute;
        z-index: 0;
        content: "";
        left: 6px;
        top: 0;
        width: 6px;
        height: 10px;
        background: rgb(118, 201, 118);
        border-radius: 6px 6px 0 0;
        -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
        -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
    }
    .heart:after {
        left: 0;
        -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
        -webkit-transform-origin: 100% 100%;
            transform-origin :100% 100%;
    }
</style>
