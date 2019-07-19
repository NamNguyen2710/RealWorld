<template>
    <div>
        <topbar :page="0"></topbar>
        <div>
            <div></div>
        </div>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';

    export default {
        name: 'account',
        data() {
            return {
                id: this.$route.params.id,
                account: {}
            }
        },
        components: {
            topbar
        }
    }
</script>

<style scoped>
    .userAva {
		width: 100px;
		height: 100px;
		border-radius: 100px;
        overflow: hidden;
        position: absolute;
        left: 47%;
	}
</style>