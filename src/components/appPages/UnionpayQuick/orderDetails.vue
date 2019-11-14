<template>
	<!-- 订单明细 -->
	<div class="orderDetails flx-c">
		<van-cell-group class="details-box">
			<van-field class="addInput-li" clearable readonly label="订单编号"
				v-model="orderInfo.quickOrderId" />
			<van-field class="addInput-li" clearable readonly label="商品名称"
				v-model="orderName" />
			<van-field class="addInput-li" clearable readonly label="交易金额"
				v-model="orderInfo.tradeAmount" />
			<van-field class="addInput-li" clearable readonly label="手续费"
				v-model="orderInfo.rateAmount" />
			<van-field class="addInput-li" clearable readonly label="订单状态"
				v-model="orderInfo.tips" />
			<van-field class="addInput-li" clearable readonly label="订单创建时间"
				v-model="orderInfo.createTime" />
			<van-field class="addInput-li" clearable readonly label="订单交易时间"
				v-model="orderInfo.tradeTime" />
		</van-cell-group>
	</div>
</template>

<script>
	import {
		server
	} from '@/api/server.js';
	import tool from '../../../../public/tool/tool.js'
	
	export default {
		
		data() {
			return {
				titleName: '订单明细', //标题栏标题
				orderInfo: {
					createTime:'',
					quickOrderId:'',
					rateAmount:'',
					status:'',
					tips:'',
					tradeAmount:'',
					tradeTime:'',
				},
				orderName: '银联快捷', //订单名称
			};
		},
		created() {
			this.onLoad();
			console.log(this.$route.params)
			tool.setAppTitle('订单明细')
			this.orderInfo = this.$route.params.details
		},
		methods: {
			// 加载订单明细
			onLoad() {
				
				// let init = {};
				// server.queryIncomeDetail(init)
				// 	.then(res => {
				// 		if (res == null) return;
				// 		if (res.data.length == 0) {
				// 			return;
				// 		}
				// 		let arr = res.data.map(cur => {
				// 			cur.profitAmount = tool.centTurnSmacker(cur.profitAmount / 100);
				// 			return cur;
				// 		});
						
						// 赋值订单明细						
						this.orderInfo.orderNum = "165165165165165131651";
						this.orderInfo.orderName = "完美订单";
						this.orderInfo.orderAmount = "1000.00元";
						this.orderInfo.orderCost = "7.9元";
						this.orderInfo.orderStatus = "已付款";
						this.orderInfo.orderGenerateTime = "2019-11-13 15:30:46";
						this.orderInfo.orderPaymentTime = "2019-11-13 15:28:46";
						
					// })
			}
			
		}
	};
	
</script>

<style scoped="scoped" lang="less">
	.orderDetails {
		width: 100%;
		box-sizing: border-box;
		
		.details-box {
			width: 100%;
			background-color: #fff;
			
			.addInput-li {
				border-bottom: 1px solid #DCDCDC;
				text-align: left;
				
				input:disabled {
					color: #323233 !important;
				}
				> :first-child {
					padding-right: 20px;
					width: auto;
				}
			}
		}
	}
</style>
