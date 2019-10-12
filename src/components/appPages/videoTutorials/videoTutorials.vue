<template>
	<div>
		<div class="video-box">
			<div class="video-title flx-c">
				<img class="img1" src="../../../assets/img/knowledge.png">
				<div class="title1">还款教程</div>
			</div>
			<div style="width: 100%;">
				<div class="video-li flx-r" @click="goReimbursementTutorial(1)">
					<div>智能还款</div>
					<img src="../../../assets/img/addCreditCard_choose.png">
				</div>
				<div class="video-li flx-r" @click="goReimbursementTutorial(2)">
					<div>资金安全</div>
					<img src="../../../assets/img/addCreditCard_choose.png">
				</div>
				<div class="video-li flx-r" @click="goReimbursementTutorial(3)">
					<div>用卡安全</div>
					<img src="../../../assets/img/addCreditCard_choose.png">
				</div>
				<div class="video-li flx-r border-none" @click="goReimbursementTutorial(4)">
					<div>市场前景</div>
					<img src="../../../assets/img/addCreditCard_choose.png">
				</div>
			</div>
		</div>
		<div class="video-box">
			<div class="video-title title flx-c">
				<img src="../../../assets/img/video.png">
				<div>教学视频</div>
			</div>
			<div style="width: 100%;">
				<div class="video-li flx-r" @click="goVideoPlay(1)">
					<div>还款使用说明</div>
					<img src="../../../assets/img/addCreditCard_choose.png">
				</div>
	<!-- 			<a class="video-li flx-r" href="http://47.112.10.80/producth5/video/video1.mp4" title="还款使用说明">
					<div>还款使用说明</div>
					<img src="../../../assets/img/addCreditCard_choose.png">
				</a> -->
				<div class="video-li flx-r" @click="goVideoPlay(2)">
					<div>绑卡使用说明</div>
					<img src="../../../assets/img/addCreditCard_choose.png">
				</div>
				<div class="video-li flx-r border-none" @click="goVideoPlay(3)">
					<div>如何赚钱使用说明</div>
					<img src="../../../assets/img/addCreditCard_choose.png">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import tool from '../../../../public/tool/tool.js'
	export default {
		data() {
			return {
			};
		},
		beforeCreate() {
			document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
		},
		created(){
			tool.setAppTitle('视频教程')
		},
		methods:{
			// 跳转视频教程页面
			goReimbursementTutorial(type){
				this.$router.push({
					name:'reimbursementTutorial',
					params:{type}
				})
			},
			// 跳转播放视频
			goVideoPlay(type){
				if(type == 1){
					// this.$toast({
					// 	message:'视频录制中，敬请期待！'
					// })
					window.location.href = 'http://47.112.10.80/producth5/video/video1.mp4'
				}else if(type == 2){
					// this.$toast({
					// 	message:'视频录制中，敬请期待！'
					// })
					window.location.href = 'http://47.112.10.80/producth5/video/video1.mp4'
				}else if(type == 3){
					// this.$toast({
					// 	message:'视频录制中，敬请期待！'
					// })
					window.location.href = 'http://47.112.10.80/producth5/video/video1.mp4'
				}
			}
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
			width: 200px;
			height: 320px;
			// background: pink;
			border-right: 1px solid #f5f5f5;
			color: #c4c4c4;
			img{
				width: 80px;
				height: 80px;
			}
		}
		.video-li{
			width: 100%;
			height: 80px;
			border-bottom: 1px solid #f5f5f5;
			// border-bottom: 1px solid #000;
			text-align: left;
			line-height: 80px;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 20px;
			color: #333;
			img{
				width: 15px;
				height: 28px;
			}
		}
		.border-none{
			border: none;
		}
	}
	.title{
		height: 240px!important;
	}
	.img1{
		width: 60px!important;
		height: 60px!important;
	}
	.title1{
		padding-top: 10px;
	}
</style>
