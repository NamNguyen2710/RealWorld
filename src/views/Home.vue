<template>
    <div>
        <TopBar v-bind:page="1"></TopBar>
		<h1 class="heading" style="font-size: 40px;padding-top: 30px;"><b>conduit</b></h1>
		<h3 class="heading" style="padding-bottom: 30px">A place to share your knowledge</h3>
		<br>
		<table style="width: 77%; float: left;">
			<tr>
				<td style="padding: 0">
					<button style="text-decoration: none; color: rgb(118, 201, 118); background-color: white; border: hidden; padding: 20px; margin:0">
						Global feed </button>
				</td>
			</tr>
			<tr>
                <td>
                    <artc :avaUrl="'image.jpg'"
                            :likes="1"
                            userName="NamNguyen"
                            date="July 17, 2019"
                            artTitle="Test article"
                            artTheme='"New" tag'>
                    </artc>
				</td>
			</tr>
		</table>
		<span class="box" style="width: 20%; background-color: rgb(196, 195, 195); color: black">
				Popular Tags:
				<br>
				<a href=""><span class="box tag">dragon</span></a>
				<a href=""><span class="box tag">training</span></a>
				<a href=""><span class="box tag">tags</span></a>
		</span>
    </div>
</template>

<script>
    import TopBar from '../components/TopBar.vue';
    import Artc from '../components/Artc.vue';

    export default {
        name: 'home',
        components: {
            TopBar,
            artc: Artc
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
</style>


