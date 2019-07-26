<template>
    <button :class="{'clickedButt':favored === true}" @click="favored=!favored">
        {{ optText }}{{ numb }} <span class="heart" :class="{'clickHrt':favored === true}"></span>
    </button>
</template>

<script>
    export default {
        name: 'like',
        props: {
            numb: Number,
            favored: Boolean,
            optText: String
        }
    }
</script>

<style scoped>
    button { 
        border-radius: 3px;
        padding: 4px 8px 1px 8px;
        border: 1px solid rgb(118, 201, 118);
        color:rgb(118, 201, 118);
        float: right;
        background:none;
    }
    button:hover, .clickedButt {
        color: white;
        background-color: rgb(118, 201, 118);
    }
    button:hover .heart:before, button:hover .heart:after, .clickHrt:after, .clickHrt:before{
        background: white;
    }
    

    .heart {
        position: relative;
        width: 10px;
        height: 10px;
        float: right;
        margin: 4px;
        top: -2.5px;
    }
    .heart:before, .heart:after {
        position: absolute;
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
