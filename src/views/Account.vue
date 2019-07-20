<template>
    <div>
        <topbar :page="0"></topbar>
        <br>
        <div class="head">
            <img :src="getImgUrl(nam.image)" style="width: 100px; clip-path: circle()">
            <h2 style="font-family: tahoma; margin: 0">{{ nam.username }}</h2>
            <button class="follow">+ Following {{ nam.username }}</button>
            <br><br>
        </div>
        <table style="width: 77%; float: left; margin: 30px">
            <tr>
                <td>
                    <router-link to="/account" class="feed" :class="{'inFeed':curPath === '/'}">My article</router-link>
                    <router-link to="/account" class="feed" :class="{'inFeed':curPath === '/favorite'}">Favorite articles</router-link>
                </td>
            </tr>
            <printartc :articles="namArt"></printartc> 
        </table>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import printartc from '../components/PrintArticles';
    import mockData from './user.json';
    import mockData2 from '../test.json';

    export default {
        name: 'account',
        components: {
            topbar,
            mockData,
            mockData2,
            printartc
        },
        data() {
            return {
                nam: mockData.profile[1],
                namArt: mockData.article,
                curPath: window.location.pathname
            }
        },
        methods: {
			getImgUrl(avaUrl){
				return require('../assets/' + avaUrl)
            }
        }
    }
</script>

<style scoped>
    .follow {
        padding: 5px; 
        border-radius:3px;
        size: 20px;
        position: absolute;
        left: 75%;
        border: 1px solid rgb(167, 167, 167);
        background: rgb(238, 238, 238); 
        color: rgb(167, 167, 167);
    }
    .follow:hover {
        background: rgb(201, 201, 201)
    }

    .head {
        text-align: center; 
        background: rgb(238, 238, 238); 
        padding: 15px;
        margin-left: -13%;
        margin-right: -11.5%;
    }

    td {
        border-bottom: 1px solid rgb(236, 236, 236);
        padding: 15px;
        padding-left: 0;
    }

    .feed {
        color: rgb(118, 201, 118); 
        background-color: white; 
        border: hidden; 
        text-decoration: none;
        padding: 15px; 
        margin: 0;
    }
    .inFeed {
        border-bottom: 1px solid rgb(118, 201, 118)
    }
</style>