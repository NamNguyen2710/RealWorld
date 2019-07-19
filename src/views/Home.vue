<template>
    <div>
        <topbar :page="1"></topbar>
		<h1 class="heading" style="font-size: 40px;padding-top: 30px;"><b>conduit</b></h1>
		<h3 class="heading" style="padding-bottom: 30px">A place to share your knowledge</h3>
		<br>
		<table style="width: 77%; float: left;">
            <tr>
                <td style="padding: 0">
                    <button @click="componentKey += 1"> Global feed </button>
                </td>
            </tr>
            <printartc :articles="mockDataArticle" :key="componentKey"></printartc>
		</table>
		<favtags :tagsLs="favtagslist"></favtags>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import printartc from '../components/PrintArticles.vue';
    import favtags from '../components/FavTags.vue';
    import mockData from "../test.json";

    export default {
        name: 'home',
        components: {
            topbar,
            printartc,
            favtags
        },
        data() {
            return {
                componentKey: 0,
                mockDataArticle: mockData.article,
                favtagslist: mockData.favtagsList
            }
        }
    }
</script>

<style scoped>
    .heading {
        font-family:courier;
        text-align:center;
        background-color:rgb(118, 201, 118);
        color:white;
        margin:0;
        padding: 15px;
        margin-left: -13%;
        margin-right: -11.9%;
    }
    tr, td {
        border-bottom: 1px solid rgb(167, 164, 164);
        padding: 30px;
    }
    button {
        color: rgb(118, 201, 118); 
        background-color: white; 
        border: hidden; 
        padding: 20px; 
        margin: 0;
    }
</style>