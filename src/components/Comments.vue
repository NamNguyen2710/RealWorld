<template>
    <table align="center">
        <tr>
            <td style="padding: 25px">
                {{ comm.body }}
            </td>
        </tr>
        <tr>
            <td class="author">
                <ufa :post="comm" :page="false" ></ufa>
            </td>
        </tr>
    </table>
</template>

<script>
    import ufa from '../components/UserForArtc.vue';

    export default {
        name: 'comment',
        props: {
            comm: {}
        },
        components: {
            ufa
        }
    }
</script>

<style scoped>
    table {
        width: 40%; 
        border: 1px solid rgb(206, 206, 206);
        border-radius: 3px;
        margin-top: 10px;
    }
    .author {
        border-top: 1px solid rgb(206, 206, 206); 
        padding: 10px 10px 0 10px; 
        background: rgb(236, 236, 236);
    }
</style>