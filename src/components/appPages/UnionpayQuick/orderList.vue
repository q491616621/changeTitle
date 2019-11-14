<template>
	<div>
		<!-- 日期栏 -->
		<div class="date-bar flx-r">
			<div @click="oneDateBox=true">{{preDay}}</div>
			<div class="middle">至</div>
			<div @click="twoDateBox=true">{{nowDay}}</div>
		</div>
		<!-- 订单列表 -->
		<van-list class='order-list flx-cas' v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-row class="order-li flx-r" v-for="(item,index) in orderList" :key='index' @click.native='goOrderDetails(item)'>
				<van-col span="2" gutter="0" class="order-left">
					<img src="../../../assets/img/order_icon.png" />
				</van-col>
				<van-col span="12" gutter="0" class="flx-cs order-center">
					<div class="title">银联快捷</div>
					<div class="time">{{item.tradeTime}}</div>
				</van-col>
				<van-col span="8" gutter="0" class="order-right bold">
					<div>{{item.tradeAmount}}</div>
				</van-col>
			</van-row>
		</van-list>
		<!-- 前面月份日期选择 -->
		<van-action-sheet class="search" v-model="oneDateBox" style="height: 50%;" :close-on-click-overlay='false'
		 :lock-scroll='false' @close='oneDateBox=false'>
			<van-datetime-picker v-model="choosePreDay" type="date" :min-date="min" :max-date="max" @confirm='surePreDay'
			 @cancel='oneDateBox = false' />
		</van-action-sheet>
		<!-- 后面月份日期选择 -->
		<van-action-sheet class="search" v-model="twoDateBox" style="height: 50%;" :close-on-click-overlay='false'
		 :lock-scroll='false' @close='twoDateBox=false'>
			<van-datetime-picker v-model="chooseNowDay" type="date" :min-date="min" :max-date="max" @confirm='sureNowDay'
			 @cancel='twoDateBox = false' />
		</van-action-sheet>
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
				orderList: [], //订单列表
				loading: false,
				finished: false,
				page: 1, //页数
				pageSize: 20, //每页的数量
				nowDay: '',
				preDay: '',
				chooseNowDay: '',
				choosePreDay: '',
				max: '',
				min: '',
				oneDateBox: false,
				twoDateBox: false,
			};
		},
		beforeCreate() {
			document.querySelector('body').setAttribute('style', 'background-color:#fff')
		},
		created() {
			tool.setAppTitle('全部')
			let date = new Date();
			let nowDay = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
			let preDay = tool.GetPreMonthDay(nowDay, 1);
			this.nowDay = nowDay;
			this.preDay = preDay;
			nowDay = nowDay + ' 00:00';
			preDay = preDay + ' 00:00';
			this.chooseNowDay = new Date(nowDay.replace(/-/g, "/"));
			this.choosePreDay = new Date(preDay.replace(/-/g, "/"));
			let a = '1999-01-01 00:00';
			let b = '2039-12-31 00:00';
			this.max = new Date(b.replace(/-/g, "/"));
			this.min = new Date(a.replace(/-/g, "/"));
			// console.log(nowDay)
			// console.log(preDay)
		},
		methods: {
			goOrderDetails(details) {
				this.$router.push({
					name: 'orderDetails',
					params: {
						details
					}
				})
				// console.log(item)
			},
			//设置上个月的日期
			surePreDay(value) {
				let d = new Date(value);
				let month = d.getMonth() + 1;
				let days = d.getDate();
				if (d.getMonth() + 1 < 10) month = '0' + (d.getMonth() + 1);
				if (d.getDate() < 10) days = '0' + (d.getDate());
				// this.cardInfo.idcardValidStart = d.getFullYear() + '-' + month + '-' + days;
				this.preDay = `${d.getFullYear()}-${month}-${days}`;
				this.orderList = [];
				this.page = 1;
				this.oneDateBox = false;
				this.onLoad();
			},
			// 设置当前月的日期
			sureNowDay(value) {
				let d = new Date(value);
				let month = d.getMonth() + 1;
				let days = d.getDate();
				if (d.getMonth() + 1 < 10) month = '0' + (d.getMonth() + 1);
				if (d.getDate() < 10) days = '0' + (d.getDate());
				// this.cardInfo.idcardValidStart = d.getFullYear() + '-' + month + '-' + days;
				this.nowDay = `${d.getFullYear()}-${month}-${days}`;
				this.orderList = [];
				this.page = 1;
				this.twoDateBox = false;
				this.onLoad()
			},
			//加载全部列表
			onLoad() {
				let init = {};
				init.page = this.page;
				init.pageSize = this.pageSize;
				init.startDate = this.preDay;
				init.endDate = this.nowDay;
				this.loading = true;
				server.queryQuickOrderList(init)
					.then(res => {
						if (res == null) return;
						if (res.data.length == 0) {
							this.loading = false;
							this.finished = true;
							return;
						}
						console.log(res.data)
						// return
						let arr = res.data.map(cur => {
							cur.tradeAmount = tool.centTurnSmacker(cur.tradeAmount / 100);
							cur.rateAmount = tool.centTurnSmacker(cur.rateAmount / 100);
							if (cur.status == 1) {
								cur.tips = '需短验'
							} else if (cur.status == 2) {
								cur.tips = '扣款中'
							} else if (cur.status == 3) {
								cur.tips = '扣款失败'
							} else if (cur.status == 4) {
								cur.tips = '扣款成功'
							} else if (cur.status == 5) {
								cur.tips = '结算中'
							} else if (cur.status == 6) {
								cur.tips = '结算失败'
							} else if (cur.status == 7) {
								cur.tips = '结算成功'
							}
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
	.date-bar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 88px;
		background: #ebebeb;
		font-size: 32px;
		font-weight: bold;
		justify-content: space-around;

		.middle {
			line-height: 88px;
		}
	}

	.order-list {
		margin-top: 88px;
	}

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
