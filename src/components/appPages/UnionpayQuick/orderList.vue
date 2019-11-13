<template>
	<div>
		<!-- 订单列表 -->
		<van-list class='order-list flx-cas' v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-row class="order-li flx-r" v-for="(item,index) in orderList" :key='index' :title="item">
				<van-col span="2" gutter="0" class="order-left">
					<img src="../../../assets/img/order_icon.png" />
				</van-col>
				<van-col span="12" gutter="0" class="flx-cs order-center">
					<div class="title">{{item.incomeTypeDes}}</div><!-- title -->
					<div class="time">{{item.createTime}}</div>
				</van-col>
				<van-col span="8" gutter="0" class="order-right bold">
					<div>{{item.profitAmount}}</div><!-- 金额 -->
				</van-col>
			</van-row>
		</van-list>
	</div>
</template>

<script>
	import {
		server
	} from '@/api/server.js';
	import tool from '../../../../public/tool/tool.js';
	
	export default {
		
		data() {
			return {
				titleName: '全部', //标题栏标题
				orderList: [],//订单列表
				loading: false,
				finished: false,
				page: 1, //页数
				pageSize: 20, //每页的数量
			};
		},
		created() {
			tool.setAppTitle('全部')
		},
		methods: {
			//加载全部列表
			onLoad() {
				let init = {};
				init.page = this.page;
				init.pageSize = this.pageSize;
				this.loading = true;
				server.queryIncomeDetail(init)
					.then(res => {
						if (res == null) return;
						if (res.data.length == 0) {
							this.loading = false;
							this.finished = true;
							return;
						}
						let arr = res.data.map(cur => {
							cur.profitAmount = tool.centTurnSmacker(cur.profitAmount / 100);
							return cur;
						});
						// 
						this.orderList = this.orderList.concat(arr);
						this.loading = false;
						
						// 判断这次拿回来的数据是否小于每页的条数,小于的话不必再触发onLoad事件
						if (res.data.length < this.pageSize) {
							this.loading = false;
							this.finished = true;
							return
						}
						this.page += 1;
					})
			}
		},
	};
</script>

<style scoped="scoped" lang="less">
	.order-li {
		width: 690px;
		height: 150px;
		border-bottom: 1px solid #e5e5e5;
		justify-content: space-between;
		background: #fff;

		.order-left {
			text-align: left;
			
			img {
				width: 56px;
				height: 56px;
			}
		}

		.title {
			font-size: 28px;
			color: #333;
		}

		.time {
			padding-top: 15px;
			font-size: 24px;
			color: #999;
		}

		.order-right {
			text-align: right;
			font-size: 36px;
			color: #333;
		}
	}
</style>
