<template>
    <table align="center">
        <tr style="padding: 0">
            <td style="padding: 0; height: 100px">
                <textarea></textarea>
            </td>
        </tr>
        <tr>
            <td class="author">
                <button>Post comment</button>
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: 'addcomm'
    }
</script>

<style scoped>
    table {
        width: 40%; 
        border: 1px solid rgb(206, 206, 206);
        border-radius: 3px;
        padding: 0;
        margin-top: 50px;
    }
    .author {
        border-top: 1px solid rgb(206, 206, 206); 
        padding: 10px; 
        background: rgb(236, 236, 236);
    }

    button {
        border: none;
        background: rgb(118, 201, 118);
        color: white;
        float: right;
        padding: 5px;
        border-radius: 3px;
    }

    textarea {
        width: 100%;
        height: 100%;
        border: none;
        margin: 0;
        padding: 0;
        position: relative;
        top: 4px;
    }
</style>
