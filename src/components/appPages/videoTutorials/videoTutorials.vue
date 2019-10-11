<template>
	<div>
		<div class="video-box">
			<div class="video-title">
				教学视频
			</div>
			<div>
				<div class="video-li">支付使用说明</div>
				<div class="video-li">还款使用说明</div>
				<div class="video-li">完美账单还款使用说明</div>
			</div>
		</div>
	</div>
</template>
<script>
	import tool from '../../../../public/tool/tool.js'
	export default {
		data() {
			return {
				titleName: '视频教程', //标题栏标题
				pageType: 'app', //上个页面是什么h5还是app?
			};
		},
		beforeCreate() {
			document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
		},
		created(){
			tool.setAppTitle('视频教程')
		}
	};
</script>

<style scoped="scoped" lang="less">
	.video-box{
		width: 750px;
		height: 100%;
		font-size: 28px;
		display: flex;
		justify-content: flex-start;
		background: #fff;
		margin-top: 20px;
		.video-title{
			width: 250px;
			height: 300px;
			background: pink;
		}
		.video-li{
			width: 100%;
			height: 80px;
		}
	}
</style>
