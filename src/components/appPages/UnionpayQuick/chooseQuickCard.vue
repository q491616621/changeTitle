<template>
	<div>
		<!-- 顶部标题栏 -->
<!-- 		<div class="title-bar flx-r">
			<top-title :titleName="titleName"></top-title>
		</div> -->
		<div class="container flx-cas">
			<div class="order-info">
				<!-- <div class="order-li flx-r">
					<div>订单编号</div>
					<div class="order-num medium">201908131725188450042</div>
				</div> -->
				<div class="order-li flx-r">
					<div>交易类型</div>
					<div class="order-type medium">银联快捷</div>
				</div>
				<div class="order-li flx-r">
					<div>交易金额</div>
					<div class="order-amount medium">¥{{amount}}</div>
				</div>
			</div>
			<div class="title">选择银行卡</div>
			<div class="card-list">
				<div class="card-li flx-rs" v-for="(item,index) in cardList" :key='index' @click="checkCard(index)">
					<img class="bank-img" :src="item.bankLogo">
					<div class="card-info flx-cs">
						<div class="medium">{{item.bankName}}</div>
						<!-- <div>**** **** **** 1234</div> -->
						<div>{{item.bankNum}}</div>
					</div>
					<img class="choose-img" src="../../../assets/img/UnionpayQuick/checked.png" v-if="item.checked">
				</div>
				<div class="add-card flx-r" @click="checkCard(99999)">
					<div class="flx-r">
						<img src="../../../assets/img/UnionpayQuick/add.png">
						<span class="medium">添加信用卡</span>
					</div>
					<img class="choose-img" src="../../../assets/img/UnionpayQuick/checked.png" v-if="addChecked">
				</div>
			</div>
			<div class="title flx-rs">
				<span>请选择支付通道</span>
				<span class="tips">(温馨提示:若支付失败,请更换其他支付通道支付)</span>
			</div>
			<div class="channel-list" @click="goAddQuickCard">
				<div class="channel-li flx-rs">
					<img src="../../../assets/img/cardManagement/Unionpay.png">
					<div style="text-align: left;">
						<div>银联快捷-积分通道B</div>
						<div class="channel-info flx-ras">
							<div>额度:200-20000</div>
							<div>结算:10秒到账</div>
							<div>时间:07:00-21:55</div>
							<div>费率:0.65%+2元/笔</div>
						</div>
						<div class="tip">
							<span style="color: #FF3535;">提示:</span>
							<span>暂不支持交通、浦发银行信用卡</span>
						</div>
					</div>
					<img src="../../../assets/img/UnionpayQuick/intro.png" class="tip2" @click.stop="goChannelIntroduce">
					<!-- <img  class="tip2" @click="goChannelIntroduce"></img> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	// import topTitle from '@/components/common/topTitle.vue';
export default {
	// components: {
	// 	topTitle,
	// },
	
	data() {
		return {
			isFirstEnter: false, //是否是第一次进入这个页面
			titleName: '确认支付', //标题栏标题
			cardList:[],
			quickChannelList:[],
			amount:'',
			addChecked:false,
		};
	},
	beforeRouteEnter(to, from, next) {
		// 当时从cardManagement页面进入进来的,而且有传值的话,把isBack设为false 否则设为true
		if (from.name == 'swipeCard') {
			to.meta.isBack = false;
			console.log('false')
		} else {
			to.meta.isBack = true;
			console.log('true')
		}
		next();
	},
	created() {
		this.isFirstEnter = true;
	},
	activated(){
		console.log(this.$route)
		// 判断isBack为false(非后退)或者是第一次进入这个页面
		if (!this.$route.meta.isBack || this.isFirstEnter) {
			this.addChecked = false;
			this.amount = this.$store.state.unionpayQuickAmount;
			this.getQuickCardList()//调用获取已经绑定的快捷信用卡方法
		}
		this.isFirstEnter = false;
	},
	methods: {
		// 调用获取已经绑定的快捷信用卡方法
		getQuickCardList(){
			// let bankLogo = {
			// 	'工商银行': require('../../../assets/img/bankLogo/bank1.png'),
			// 	'光大银行': require('../../../assets/img/bankLogo/bank2.png'),
			// 	'广发银行': require('../../../assets/img/bankLogo/bank3.png'),
			// 	'华夏银行': require('../../../assets/img/bankLogo/bank4.png'),
			// 	'建设银行': require('../../../assets/img/bankLogo/bank5.png'),
			// 	'交通银行': require('../../../assets/img/bankLogo/bank6.png'),
			// 	'民生银行': require('../../../assets/img/bankLogo/bank7.png'),
			// 	'平安银行': require('../../../assets/img/bankLogo/bank8.png'),
			// 	'浦发银行': require('../../../assets/img/bankLogo/bank9.png'),
			// 	'兴业银行': require('../../../assets/img/bankLogo/bank10.png'),
			// 	'邮政银行': require('../../../assets/img/bankLogo/bank11.png'),
			// 	'招商银行': require('../../../assets/img/bankLogo/bank12.png'),
			// 	'中国银行': require('../../../assets/img/bankLogo/bank13.png'),
			// 	'中信银行': require('../../../assets/img/bankLogo/bank14.png'),
			// 	'上海银行': require('../../../assets/img/bankLogo/bank16.png'),
			// };
			this.cardList = [
				{bankName:'工商银行',bankNum:'**** **** **** 1234',bankLogo:require('../../../assets/img/bankLogo/bank1.png'),checked:true},
				{bankName:'工商银行',bankNum:'**** **** **** 1234',bankLogo:require('../../../assets/img/bankLogo/bank1.png'),checked:false},
				{bankName:'工商银行',bankNum:'**** **** **** 1234',bankLogo:require('../../../assets/img/bankLogo/bank1.png'),checked:false},
				{bankName:'工商银行',bankNum:'**** **** **** 1234',bankLogo:require('../../../assets/img/bankLogo/bank1.png'),checked:false},
				{bankName:'工商银行',bankNum:'**** **** **** 1234',bankLogo:require('../../../assets/img/bankLogo/bank1.png'),checked:false},
				]
		},
		checkCard(index){
			// 判断用户选择的是否是添加信用卡按钮,是的话把上面选择的都变成false,并且不执行下面的语句了
			if(index == 99999){
				this.addChecked = true;
				this.cardList.map(cur=>cur.checked = false);
				return
			}
			// 判断用户选择的是信用卡列表中的哪张,把那张的checked变成true,其他的checked变成false,再把添加信用卡按钮变成非选中的状态
			this.cardList.map((cur,idx)=>{
				if(idx == index){
					cur.checked = true
				}else{
					cur.checked = false
				}
				return cur
			})
			this.addChecked = false;
		},
		// 跳转绑定快捷信用卡页面
		goAddQuickCard(){
			this.$router.push({
				'name':'addQuickCard'
			})
		},
		// 跳转通道介绍页面
		goChannelIntroduce() {
			this.$router.push({
				name:'channelIntroduce',
			})
		}
	},
};
</script>

<style scoped="scoped" lang="less">
	.container{
		background: #fff;
		width: 100%;
		// margin-top: 88px;
		.order-info{
			width: 690px;
			font-size: 30px;
			color: #333;
			.order-li{
				height: 90px;
				border-bottom: 1px solid #E5E5E5;
				justify-content: space-between;
				.order-num{
					font-size: 28px;
				}
				.order-type{
					font-size: 28px;
				}
				.order-amount{
					font-size: 28px;
					color: #5B95F9;
				}
			}
			:nth-child(2){
				border: none;
			}
		}
		.title{
			width:750px;
			height: 90px;
			background: #f6f6f6;
			font-size: 28px;
			color: #666666;
			line-height: 90px;
			box-sizing: border-box;
			padding-left: 30px;
			text-align: left;
		}
		.tips{
			font-size: 18px;
			padding-left: 10px;
			color: #5B95F9;
		}
		.card-list{
			width: 690px;
			font-size:28px;
			.card-li{
				height: 120px;
				border-bottom: 1px solid #E5E5E5;
				.bank-img{
					width: 60px;
					height: 60px;
					padding-right: 20px;
				}
				.card-info{
					flex-grow: 1;
					:nth-child(1){
						padding: 10px 0;
					}
					:nth-child(2){
						font-size: 24px;
						color: #999;
					}
				}
				.choose-img{
					width: 40px;
					height: 40px;
				}
			}
			.add-card{
				height: 90px;
				color:#333;
				justify-content:space-between;
				img{
					width: 40px;
					height: 40px;
					padding-right: 20px;
				}
				.choose-img{
					padding: 0;
				}
			}
		}
		.channel-list{
			width: 690px;
			.channel-li{
				position: relative;
				padding: 20px 0;
				font-size: 28px;
				color: #333;
				border-bottom:1px solid #E5E5E5;
				img{
					width: 50px;
					height: 32px;
					padding-right: 30px;
				}
				.channel-info{
					flex-flow: wrap;
					padding-top:10px;
					div{
						width: 50%;
						font-size: 24px;
						color: #999;
					}
				}
				.tip{
					padding-top: 10px;
					font-size:22px;
					:nth-child(2){
						padding-left: 10px;
					}
				}
				.tip2{
					position: absolute;
					top: 1px;
					right: -31px;
					width: 70px;
					height: 70px;
				}
			}
		}
	}
</style>