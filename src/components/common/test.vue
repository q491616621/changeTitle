<template>
	<div>
		<button @click="jump">跳转</button>
	</div>
</template>
<script>
	import axios from 'axios'
	export default {
		data() {
			return {};
		},
		created() {

		},
		methods: {
			jump() {
				axios({
					method:'post',
					url:'http://47.112.10.80:9010/channelapi/admin/help/testSdjBindcard.do',
					// url:'http://47.112.10.80:9010/channelapi/repaysdj/admin/help/testSdjBindcard.do',
				})
				.then(res=>{
					let routeData = this.$router.resolve({
						path:'/test2',
						query:{
							htmls:res.data.unionHtml
						}
					});
					window.open(routeData.href,'_blank');
					// res.data.unionHtml
					// console.log(res.data.unionHtml)
				})
			}
		}

	};
</script>

<style>
</style>
