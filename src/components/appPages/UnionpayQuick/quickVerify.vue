<template>
	<div>
		<!-- 顶部标题栏 -->
<!-- 		<div class="title-bar flx-r">
			<top-title :titleName="titleName"></top-title>
		</div> -->
		<div class="verify-box">
			<div class="channel-information flx-rs" @click="aaa">
				<img src="../../../assets/img/unionpay.png">
				<div class="right flx-cs">
					<div  class="medium">快捷A(到账:9:10-22:10)</div>
					<div>普通0.6%+3;VIP:0.55%+3元/笔(最低支付金额到底方法</div>
				</div>
			</div>
			<van-cell-group class="sms-input">
			  <van-field v-model="smsCode" placeholder="请输入收到的短信验证码" />
			</van-cell-group>
			<button class="sure-btn" @click="sureBind">确定</button>
		</div>
	</div>
</template>
<script>
	// import topTitle from '@/components/common/topTitle.vue';
	import {
		server
	} from '@/api/server.js';
export default {
	// components: {
	// 	topTitle,
	// },
	data() {
		return {
			titleName: '短信验证', //标题栏标题
			smsCode:'',//短信验证码
			orderInfo:'',//订单详情
		};
	},
	beforeCreate() {
		document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
	},
	created() {
		this.orderInfo = this.$route.params.orderInfo;
	},
	methods: {
		aaa() {
			this.$dialog.alert({
				title:'快捷A',
				message:'普通0.6%+3；VIP：0.55%+3元/笔（最低支付金额10元)'
			}).then(()=>{
				
			})
		},
		// 确定绑定
		sureBind(){
			if(this.smsCode == ''){
				this.$toast({
					message:'验证码不能为空',
					forbidClick: true,
					duration:2000
				})
				return;
			}
			let orderInfo = this.orderInfo;
			orderInfo.smsCode = this.smsCode;
			server.quickVerifyBindcardSm(orderInfo)
			.then(res=>{
				if(res == null)return;
				//绑卡状态，0-处理中，1-绑卡成功，2-绑卡失败,3-已解绑，4-需短验
				if(res.data.status == 0){
					this.$toast({
						message:'您的绑卡正在处理中，请耐心等待！',
						forbidClick: true,
						duration:2000
					})
					setTimeout(()=>{
						this.$router.replace({
							name:'chooseQuickCard',
						})
					},2000)
					return;
				}else if(res.data.status == 1){
					this.$toast({
						message:'您的卡已经绑定成功',
						forbidClick: true,
						duration:2000
					})
					// setTimeout(()=>{
					// 	this.$router.replace({
					// 		name:'chooseQuickCard',
					// 	})
					// },2000)
					return;
				}else if(res.data.status == 2){
					this.$toast({
						message:'卡片绑定失败',
						forbidClick: true,
						duration:2000
					})
					return;
				}else if(res.data.status == 3){
					this.$toast({
						message:'该卡已解绑',
						forbidClick: true,
						duration:2000
					})
					setTimeout(()=>{
						this.$router.replace({
							name:'chooseQuickCard',
						})
					},2000)
					return;
				}else if(res.data.status == 4){
					this.$toast({
						message:'验证短信已发送,请留意接收',
						forbidClick: true,
						duration:2000
					})
					return;
				}
			})
		}
	},
};
</script>

<style scoped="scoped" lang="less">
	.verify-box{
		width: 750px;
		// margin-top: 88px;
		.channel-information{
			background: #fff;
			width: 100%;
			height: 120px;
			img{
				width: 50px;
				height: 32px;
				padding: 0 30px;
			}
			.right{
				// width: 505px;	
				height: 100%;
				text-align: left;
				line-height:44px;
				:nth-child(1){
					font-size: 28px;
					color: #333;
				}
				:nth-child(2){
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 24px;
					color: #999;
					width: 510px;
				}
			}
		}
		.sms-input{
			margin-top: 20px;
			height: 90px;
		}
		.sure-btn{
			width: 690px;
			height: 88px;
			margin-top: 100px;
			background:linear-gradient(-90deg,rgba(63,129,246,1),rgba(127,187,249,1));
			box-shadow:0px 5px 10px 0px rgba(62,128,247,0.2);
			border-radius: 10px;
			font-size: 36px;
			color: #FFFFFF;
			
		}
	}
</style>