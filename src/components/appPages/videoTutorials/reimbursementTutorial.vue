<template>
	<div>
		<div class="tutorial-box flx-c" v-if="type == 1">
			<div class="title">智能还款</div>
			<div class="content">
				这是一款安装在手机上的应用软件，注册实名以后，只需将自己名下的信用卡添加到软件上，在信用卡账单日的次日就可以进行还款设置。用5%-10%的信用卡余额，就可以实现整个账单100%的还款，毫无压力，通过模拟个人日常消费，小金额，多笔数，不同阶段，不同行业，不同商户，为我们打造完美的个性化账单。每月出账只需要根据账单欠款金额设置几次就能全部自动还清，省了我们很多的倒卡时间，省去了管理多张卡片的精力。
			</div>
		</div>
		<div class="tutorial-box flx-c" v-if="type == 2">
			<div class="title">资金安全</div>
			<div class="content">
				首先安安卡管家是由持牌支付公司直接消费还款的智能还款平台，所有的资料绑定都受到银行级保密协议的保护。
				只有我们在提交了计划账单后，才会进行消费，就像你绑卡在支付宝微信，你不转账，钱不会动一个道理。
			</div>
		</div>
		<div class="tutorial-box flx-c" v-if="type == 3">
			<div class="title">用卡安全</div>
			<div class="content">
				我们所有使用的支付公司的通道，背后全部都是真实的标准类的商户。在安安的每一笔消费，银行都是实实在在的收到了全额手续费的，互利互惠。
			</div>
		</div>
		<div class="tutorial-box flx-c" v-if="type == 4">
			<div class="title">市场前景</div>
			<div class="content">
				<div>1、刚需: 78.8%的信用卡用户都有还款压力，信用卡账单又必须还</div>
				<div>2、痛点: 没钱还，又不敢不还</div>
			</div>
		</div>
	</div>
</template>
<script>
	import tool from '../../../../public/tool/tool.js'
	export default {
		data() {
			return {
				type:null
			};
		},
		beforeCreate() {
			document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
		},
		created(){
			tool.setAppTitle('还款教程')
			this.type = this.$route.params.type;
		}
	};
</script>

<style scoped="scoped" lang="less">
	.tutorial-box{
		margin-top: 10px;
		width: 750px;
		background: #fff;
		.title{
			width: 690px;
			font-size: 32px;
			font-weight: bold;
			color: #333;
			// background: pink;
			text-align: left;
			height: 80px;
			line-height: 80px;
			border-bottom: 2px solid #d4d4d4;
		}
		.content{
			width: 690px;
			padding: 20px 0;
			font-size: 28px;
			text-align: left;
		}
	}
</style>
