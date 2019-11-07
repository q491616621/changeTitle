<template>
	<div>
		<!-- 顶部标题栏 -->
		<!-- 		<div class="title-bar">
			<top-title :titleName="titleName"></top-title>
		</div> -->
		<!-- 信用卡列表 -->
		<div class="card-box flx-cas">
			<!-- <div class="bg0 no-card"> -->
			<div :class="cardInfo.bgClassName">
				<div class="card-top flx-cas">
					<div class="logo flx-rs">
						<!-- <img src="../../assets/img/cardManagement/logo.png"> -->
						<img :src='cardInfo.logo'>
						<div class="bold">{{cardInfo.bankName}}</div>
						<div class="num1">****</div>
						<div class="num2">{{cardInfo.bankCardNumb}}</div>
					</div>
					<div class="name">{{cardInfo.userName}}<span>持卡人</span></div>
				</div>
				<div class="card-bottom flx-r">
					<div class="card-bottom-li flx-c" @click="setCardQuotaBox = true">
						<div>
							<div class="flx-rs">
								<span>{{planInfo.cardQuota|Quota}}</span>
								<img class="pen" src="../../assets/img/addrePayPlan_pen.png">
							</div>
						</div>
						<div class="bottom-name">额度</div>
					</div>
					<div class="card-bottom-li flx-c" @click="showChooseDateBox(2)">
						<div class="flx-rs">
							<span>{{planInfo.billingDay|dateTime}}</span>
							<img class="operator" src="../../assets/img/del_operator.png">
						</div>
						<div class="bottom-name">账单日</div>
					</div>
					<div class="card-bottom-li flx-c" @click="showChooseDateBox(1)">
						<div class="flx-rs">
							<span>{{planInfo.repaymentDay|dateTime}}</span>
							<img class="operator" src="../../assets/img/del_operator.png">
						</div>
						<div class="bottom-name">还款日</div>
					</div>
				</div>
			</div>
		</div>
		<div class="repayPlan-box flx-c">
			<div class="repayPlan">
				<van-cell-group>
					<van-field class='repayPlan-li medium' label-width="2.373333rem" v-model="planInfo.repayAmount" label="还款金额" type="number"
					 placeholder="请输入还款金额" clearable autosize />
					<van-field class='repayPlan-li medium' label-width="2.373333rem" v-model="planInfo.balanceAmount" label="卡内余额"
					 type="number" placeholder="输入卡上现有的余额" clearable autosize />
					<!-- 选择还款通道 -->
					<div class="road flx-rs medium">
						<div class="name">选择通道</div>
						<van-radio-group v-model="radio" class='radio-box flx-rs' @change='changeRadio'>
							<van-radio :name="index" v-for="(item,index) in channelList" :key='index' :disabled="item.isCardBindsuc == 2?true:false">
								{{item.channelName}}
								<img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.inactive">
							</van-radio>
						</van-radio-group>
					</div>
					<!-- 选择还款方式 -->
					<div class="road flx-rs medium">
						<div class="name">消费方式</div>
						<van-radio-group v-model="radio2" class='radio-box flx-rs' @change='changeRadio2'>
							<van-radio :name="index+1" v-for="(item,index) in planList" :key='item.ChannelID'>
								{{item.name}}
								<img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.inactive">
							</van-radio>
						</van-radio-group>
					</div>
					<!-- 默认日期/定制日期选择 -->
					<div class="road flx-rs medium">
						<!-- <div class="name">消费方式</div> -->
						<van-radio-group v-model="radio3" class='radio-box flx-rs' style="justify-content: space-around;">
							<van-radio :name="0">
								默认日期顺序还款
								<img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.inactive">
							</van-radio>
							<van-radio :name="1" @click="showPopup">
								选择日期还款
								<img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.inactive">
							</van-radio>
						</van-radio-group>
					</div>
					<!-- 已经选择的日期 -->
					<div class="road flx-rs medium" v-if="radio3 == 1&&chooseDateArr.length != 0&&show == false">
						<div class="name2">还款日期</div>
						<div class="days" @click="showPopup">{{chooseDateArr|days}}</div>
					</div>
					<!-- 选择落地城市 -->
					<div class="city-picker flx-rs medium" v-if="isSupportLand == 1">
						<div class="pick-title">落地城市</div>
						<div class="pick-content flx-rs" @click="showPicker">
							<div class="pick-citys flx-rs">
								<div class="pick-provinceName">{{planInfo.provinceName}}</div>
								<div>{{planInfo.cityName}}</div>
							</div>
							<img src="../../assets/img/addCreditCard_choose.png" alt="落地城市">
							<div v-if="!planInfo.provinceName" class="pick-tips">请选择落地城市</div>
						</div>
					</div>
				</van-cell-group>
			</div>
			<button class="repayPlan-btn bold" @click="PreviewRepayment">预览还款计划</button>
		</div>
		<!-- 输入金额框 -->
		<van-dialog v-model="setCardQuotaBox" title="卡片额度" show-cancel-button closeOnClickOverlay @confirm='setCardQuo'
		 @cancel='setCardQuotaBox=false'>
			<div class="input-box flx-r">
				<van-cell-group class='input' :border="false">
					<van-field type="number" v-model="cardQuota" placeholder="请输入卡的额度" />
				</van-cell-group>
			</div>
		</van-dialog>
		<!-- 还款日和账单日选择器 -->
		<div class="addrePayPlan-choose-picker">
			<van-popup v-model="chooseDateBox" position="bottom">
				<van-picker show-toolbar :columns="date" @cancel="chooseDateBox=false" @confirm="setDate" :item-height="60" />
			</van-popup>
		</div>
		<!-- 省市选择器 -->
		<div class="addrePayPlan-choose-picker">
			<van-popup v-model="chooseCityBox" position="bottom">
				<van-picker show-toolbar :columns="columns" @change="onChange" @cancel="chooseCityBox=false" @confirm="onConfirm"
				 :item-height="60" ref='cityPicker' />
			</van-popup>
		</div>
		<!-- 日期选择器 -->
		<van-popup class="date-box" v-model="show" position='bottom' style="height: 85%;" :close-on-click-overlay='false'>
			<div class="date-title flx-r">
				<div class="cancel" @click="cancelDate">取消</div>
				<div class="title">
					<div class="name">制定还款日期</div>
					<!-- <div class="day-num">
						<span>已选择天数：</span>
						<span>0</span>
						<span>天</span>
					</div> -->
				</div>
				<div class="sure" style="color: #2b8eff;" @click="sureDate">确定</div>
			</div>
			<div class="date-table">
				<!-- 				<div class="title flx-r">
					<img src="../../assets/img/addrePayPlan/left.png">
					<div class="time">
						<span>2019</span>
						<span>年</span>
						<span>10</span>
						<span>月</span>
					</div>
					<img src="../../assets/img/addrePayPlan/right.png">
				</div> -->
				<div class="date-list">
					<ul class="title flx-rs">
						<li v-for="(item,index) in ['日','一','二','三','四','五','六']" :key='index'>{{item}}</li>
					</ul>
					<ul class="title flx-rs">
						<!-- <li v-for="(item,index) in arr1" :key='index' class="li-choose">{{item.dateNum}}</li> -->
						<li v-for="(item,index) in arr1" :key='index' :class="item.chooseable?'li-choose flx-r':'li-no-choose flx-r'"
						 @click="chooseDate(item,'arr1')">
							<div :class="item.checked?'li-has-choose':'li-not-choose'">
								{{item.dateNum}}
								<div class="bill" v-if="item.dateNum == planInfo.billingDay&&item.checked == false&&planInfo.billingDay != planInfo.repaymentDay">账单日</div>
								<div class="repay" v-if="item.dateNum == planInfo.repaymentDay&&item.checked == false&&planInfo.billingDay != planInfo.repaymentDay">还款日</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="date-list">
					<ul class="title flx-rs">
						<li v-for="(item,index) in ['日','一','二','三','四','五','六']" :key='index'>{{item}}</li>
					</ul>
					<ul class="title flx-rs">
						<li v-for="(item,index) in arr2" :key='index' :class="item.chooseable?'li-choose flx-r':'li-no-choose flx-r'"
						 @click="chooseDate(item,'arr2')">
							<div :class="item.checked?'li-has-choose':'li-not-choose'">
								{{item.dateNum}}
								<div class="bill" v-if="item.dateNum == planInfo.billingDay&&item.checked == false&&planInfo.billingDay != planInfo.repaymentDay">账单日</div>
								<div class="repay" v-if="item.dateNum == planInfo.repaymentDay&&item.checked == false&&planInfo.billingDay != planInfo.repaymentDay">还款日</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</van-popup>
	</div>
</template>
<script>
	// import topTitle from '@/components/common/topTitle.vue';
	import {
		server
	} from '@/api/server.js';
	import tool from '../../../public/tool/tool.js';
	export default {
		// components: {
		// 	topTitle
		// },
		data() {
			return {
				isFirstEnter: false, //是否是第一次进入这个页面
				titleName: '新增还款计划',
				cardInfo: { //上个页面传过来的卡片信息,
					bankName: '',
					bankCardNumb: '',
					userName: ''
				},
				channelList: [], //通道列表
				planList: [{ //方式列表
					planCode: 1,
					name: '消费1'
				}, {
					planCode: 2,
					name: '消费2'
				}, {
					planCode: 3,
					name: '消费3'
				}],
				radio: 0, //还款通道
				radio2: 1, //还款方式
				radio3: 0, //还款日期选择方式，0默认日期，1手动选择的日期
				planInfo: {
					bindcardUniqueId: null, //绑卡标识id
					repayAmount: null, //还款总额
					balanceAmount: null, //卡内余额
					billingDay: null, //账单日
					repaymentDay: null, //还款日
					channelCode: null, //通道ID
					provinceName: '', //省份名称
					cityName: '', //省份名称
					cardQuota: null, //卡额度
					repayMode: 1, //默认扣1还1
					repayType: '', //还款方式，1：完美还款，2:智能还款，3:0余额还款
					dayString: '', //手动选择的还款日期
				},
				inputCodefocus: false, //自动聚焦
				icon: {
					active: require('../../assets/img/addrePayPlan_roadYes.png'),
					inactive: require('../../assets/img/addrePayPlan_roadNo.png')
				},
				setCardQuotaBox: false, //设置卡片额度弹窗
				chooseDateBox: false, //日期选择框
				chooseCityBox: false, //落地城市选择框
				dateType: null, //设置日期类型 1为还款日 2为账单日
				citys: {},
				cardQuota: null, //卡片额度
				columns: [{
						// values: Object.keys(citys),
						values: [],
						className: 'column1'
					},
					{
						// values: citys['浙江'],
						values: [],
						className: 'column2',
						defaultIndex: 2
					}
				],
				date: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
					30, 31
				],
				isSupportLand: '', //是否支持选择落地城市，1支持，非1不支持
				radioChange: false, //判断刚开始是否触发通道改变的方法
				// --------------------------------------------------------------------------
				show: false, //是否展示手动日期选择
				arr1: [], //日期数组1
				arr2: [], //日期数组2
				checkArr1: [], //已经选择的日期数组1
				checkArr2: [], //已经选择的日期数组2
				chooseDateArr: [], //已经选择的日期总和
			};
		},
		beforeRouteEnter(to, from, next) {
			let arr = Object.keys(to.params)
			// 当时从cardManagement页面进入进来的,而且有传值的话,把isBack设为false 否则设为true
			if (from.name == 'chooseRepaymethod' && arr.length != 0) {
				to.meta.isBack = false;
			} else {
				to.meta.isBack = true;
			}
			next();
		},
		created() {
			this.isFirstEnter = true;
		},
		activated() {
			tool.setAppTitle('新增还款计划');
			if (!this.$route.meta.isBack || this.isFirstEnter) {
				this.planInfo = {
					bindcardUniqueId: null, //绑卡标识id
					repayAmount: null, //还款总额
					balanceAmount: null, //卡内余额
					billingDay: null, //账单日
					repaymentDay: null, //还款日
					channelCode: null, //通道ID
					provinceName: '', //省份名称
					cityName: '', //省份名称
					cardQuota: null, //卡额度
					repayMode: 1, //默认扣1还1
					repayType: '', //还款方式
					dayString: '', //手动选择的还款日期
				};
				// this.columns = [{
				// 		// values: Object.keys(citys),
				// 		values: [],
				// 		className: 'column1'
				// 	},
				// 	{
				// 		// values: citys['浙江'],
				// 		values: [],
				// 		className: 'column2',
				// 		defaultIndex: 2
				// 	}
				// ];
				// ------
				// this.planList=[{ //方式列表
				// 	planCode: 1,
				// 	name: '消费1'
				// }, {
				// 	planCode: 2,
				// 	name: '消费2'
				// }, {
				// 	planCode: 3,
				// 	name: '消费3'
				// }];
				// ------
				this.radioChange = false;
				this.radio = 0; //还款通道
				this.radio2 = 1;
				// -------------------------
				this.radio3 = 0;
				this.arr1 = [], //日期数组1
					this.arr2 = [], //日期数组2
					this.checkArr1 = [], //已经选择的日期数组1
					this.checkArr2 = [], //已经选择的日期数组2
					this.chooseDateArr = [], //已经选择的日期总和
					this.setCardInfo();
				this.getChannelList(); //执行获取代还通道请求
			}
			this.isFirstEnter = false;
		},
		methods: {
			// --------------------------------------------------------------
			// 调起日期选择框
			showPopup() {
				if (this.planInfo.billingDay == null || this.planInfo.repaymentDay == null) {
					this.$toast({
						message: '请先选择好‘账单日’和‘还款日’',
						duration: 1500,
					})
					this.radio3 = 0;
					return;
				}
				let billingDay = this.planInfo.billingDay; //账单日
				let repaymentDay = this.planInfo.repaymentDay; //还款日

				let todayDate = new Date().getDate(); //今天日期
				// -------------------------
				let dayCount = tool.days(); //获取当前月份的天数
				let nextDaysCount = tool.nextDays(); //获取下个月份的天数
				let curWeek = tool.getWeek('current'); //获取当前月份第一天是星期几
				let nextWeek = tool.getWeek('next'); //获取下个月第一天是星期几
				let arr1 = [];
				let arr2 = [];
				// let arr3 = [];
				let day = 0;
				let day2 = 0;

				// let strideMonth; //是否跨月
				// // 确认该计划是否跨月了
				// if (billingDay >= repaymentDay || repaymentDay <= todayDate) {
				// 	// 账单日大于等于还款日或者还款日小于等于当天日期
				// 	strideMonth = true;
				// } else {
				// 	strideMonth = false;
				// }
				for (let i = 0; i < 35; i++) {
					if (i < curWeek || day >= dayCount) {
						arr1.push({
							dateNum: '',
							chooseable: false,
							checked: false
						});
					} else {
						day++
						if (repaymentDay == billingDay || repaymentDay - billingDay == 1) { //账单日=还款日或者还款日-账单日=1；
							// console.log(222)
							arr1.push({
								dateNum: day,
								chooseable: false,
								checked: false
							}); //全部不给选
						} else if (billingDay - repaymentDay > 0) { //账单日大于还款日
							if (day > billingDay && day > todayDate) { //日期大于账单日,且大于今天的日期，变为可选，其他全部不可选
								arr1.push({
									dateNum: day,
									chooseable: true,
									checked: false
								});
							} else {
								arr1.push({
									dateNum: day,
									chooseable: false,
									checked: false
								});
							}
						} else if (repaymentDay - billingDay > 1) { //还款日大于账单日(需要大于1，因为等于1的时候全部不给选)
							// console.log(11)
							if (repaymentDay - todayDate > 1) { //还款日大于今天的日期超过1天（即最少两数相减最少得是2）		
								if (day > billingDay && day > todayDate && day < repaymentDay) { //日期大于账单日且大于当前日且小于还款日，变为可选，其他全部不可选
									arr1.push({
										dateNum: day,
										chooseable: true,
										checked: false
									});
								} else {
									arr1.push({
										dateNum: day,
										chooseable: false,
										checked: false
									});
								}
							} else { //还款日和今天只相差1天，或者还款日等于今天，或者还款日小于今天
								if (day > repaymentDay && day > todayDate) { //日期大于还款日且大于今天，变为可选，其他全部不可选
									arr1.push({
										dateNum: day,
										chooseable: true,
										checked: false
									});
								} else {
									arr1.push({
										dateNum: day,
										chooseable: false,
										checked: false
									});
								}
							}
						} else {
							arr1.push({
								dateNum: day,
								chooseable: false,
								checked: false
							});
						}
					}
				}
				for (let i = 0; i < 35; i++) {
					if (i < nextWeek || day2 >= nextDaysCount) {
						arr2.push({
							dateNum: '',
							chooseable: false,
							checked: false
						});
					} else {
						day2++
						if (repaymentDay == billingDay || repaymentDay - billingDay == 1) { //账单日=还款日或者还款日-账单日=1；
							arr2.push({
								dateNum: day2,
								chooseable: false,
								checked: false
							}); //全部不给选
						} else if (billingDay - repaymentDay > 0) { //账单日大于还款日
							if (day2 < repaymentDay) { //日期只要小于还款日就都可选，其他不可选
								arr2.push({
									dateNum: day2,
									chooseable: true,
									checked: false
								});
							} else {
								arr2.push({
									dateNum: day2,
									chooseable: false,
									checked: false
								});
							}
						} else if (repaymentDay - billingDay > 1) { //还款日大于账单日(需要大于1，因为等于1的时候全部不给选)
							if (repaymentDay - todayDate > 1) { //还款日大于今天的日期超过1天（即最少两数相减最少得是2）
								arr2.push({
									dateNum: day2,
									chooseable: false,
									checked: false
								}); //全部设置为不可选
							} else { //还款日和今天只相差1天，或者还款日等于今天，或者还款日小于今天
								if (day2 < repaymentDay) { //小于还款日的，全部变成可选
									arr2.push({
										dateNum: day2,
										chooseable: true,
										checked: false
									});
								} else {
									arr2.push({
										dateNum: day2,
										chooseable: false,
										checked: false
									});
								}
							}
						} else {
							arr2.push({
								dateNum: day2,
								chooseable: false,
								checked: false
							});
						}
					}
				}
				// 判断用户在这个月是否选择了,选择了的话把已经选择了的,标上颜色
				if (this.checkArr1.length != 0) {
					arr1 = arr1.map(cur => {
						this.checkArr1.forEach(item => {
							if (item.dateNum == cur.dateNum) {
								cur = item
							}
						})
						return cur
					})
				}
				// 判断用户在下个月是否选择了,选择了的话把已经选择了的,标上颜色
				if (this.checkArr2.length != 0) {
					arr2 = arr2.map(cur => {
						this.checkArr2.forEach(item => {
							if (item.dateNum == cur.dateNum) {
								cur = item
							}
						})
						return cur
					})
				}
				this.arr1 = arr1;
				this.arr2 = arr2;
				this.$nextTick(() => {
					this.show = true;
				})
			},
			// 选择日期
			chooseDate(item, type) {
				if (!item.chooseable) return;
				if (type == 'arr1') {
					let arr1 = this.arr1.map(cur => {
						if (cur == item) {
							cur.checked = !cur.checked;
						}
						return cur;
					})
					this.arr1 = arr1;
				} else {
					let arr2 = this.arr2.map(cur => {
						if (cur == item) {
							cur.checked = !cur.checked;
						}
						return cur;
					})
					this.arr2 = arr2;
				}
			},
			// 取消设置日期
			cancelDate() {
				//判断选择的数组长度是否为0，为0的话代表用户没选，把还款方式重置回去默认日期顺序还款
				if (this.chooseDateArr.length == 0) this.radio3 = 0;
				this.show = false;
			},
			// 确定设置日期
			sureDate() {
				let checkArr1 = this.arr1.filter(cur => cur.checked == true);
				let checkArr2 = this.arr2.filter(cur => cur.checked == true);
				this.checkArr1 = checkArr1;
				this.checkArr2 = checkArr2;
				this.chooseDateArr = [...checkArr1, ...checkArr2]
				this.show = false;
				//判断选择的数组长度是否为0，为0的话代表用户没选，把还款方式重置回去默认日期顺序还款
				if (this.chooseDateArr.length == 0) this.radio3 = 0;
			},
			// ---------------------------------------------------------------
			// 把上个页面传递过来的数据设置给这个页面
			setCardInfo() {
				let cardInfo = this.$route.params;
				this.cardInfo = cardInfo;
				// 把上个页面传过来的 绑卡标识id 额度 还款日 账单日 设置给planInfo里面对应的值
				this.planInfo.bindcardUniqueId = cardInfo.uniqueId //绑卡标识id
				this.planInfo.cardQuota = cardInfo.cardQuota //额度
				this.planInfo.repaymentDay = cardInfo.repaymentDay //还款日
				this.planInfo.billingDay = cardInfo.billingDay //账单日 
				this.planInfo.repayType = cardInfo.repaymothod //还款方式，1：完美还款，2:智能还款，3:0余额还款
				// --------------------------------------------------
				this.cardQuota = null;

			},
			// 获取代还通道列表
			getChannelList() {
				this.$toast({
					type: 'loading',
					message: '通道加载中...',
					duration: 0,
					forbidClick: true
				})
				server.newRepayChannels({
					uniqueId: this.cardInfo.uniqueId
				}).then(res => {
					if (res == null) return;
					// 返回和用户选择的通道类型相同的通道
					let channelList = res.data.filter(cur => {
						return cur.channelType == this.planInfo.repayType;
					}).reverse();
					// ---------------------------------
					// channelList = [
					// 	{
					// 		"channelName": "通道2",
					// 		"channelType": 2,
					// 		"channelCode": "1000010002",
					// 		"isSupportLand": 1,
					// 		"isCardBindsuc": 2
					// 	},
					// 	{
					// 		"channelName": "通道3",
					// 		"channelType": 1,
					// 		"channelCode": "1000020002",
					// 		"isSupportLand": 1,
					// 		"isCardBindsuc": 2
					// 	},
					// 	{
					// 		"channelName": "通道1",
					// 		"channelType": 1,
					// 		"channelCode": "1000000001",
					// 		"isSupportLand": 1,
					// 		"isCardBindsuc": 2
					// 	},
					// ]
					// 情况1用户绑定的通道都是失败的
					// 判断该用户的通道是否都是绑定失败的,如果都是失败的话,就不继续下面的操作了，直接提示用户去选择其他还款方式了
					let value = false;
					let a = 2;
					// 判断是否在该还款方式中是否所有的通道都绑定失败
					value = channelList.every(item => item.isCardBindsuc == a)
					if (value) {
						let method = '智能还款'
						if (this.cardInfo.repaymothod == 2) {
							method = '完美还款'
						}
						this.$toast({
							message: `该还款方式您没有成功绑定的通道，无法使用该方式还款，请选择"${method}"进行还款`,
							forbidClick: true,
							duration: 5000,
							onClose: () => {
								this.$router.go(-1)
							}
						})
						return;
					}
					// 情况2用户绑定的通道有成功的或者全部是成功的
					let defaultChannelCode = this.cardInfo.defaultChannelCode; //获取到我们默认的通道
					let radio = 0;
					for (let i = 0; i < channelList.length; i++) {
						if (channelList[i].channelCode == defaultChannelCode && channelList[i].isCardBindsuc != 2) {
							radio = i;
							break;
						} else {
							if (channelList[i].isCardBindsuc != 2) {
								radio = i;
								break;
							}
						}
					}
					// channelList.forEach((cur, index) => {
					// 	// 判断通道列表的通道是否有我们的默认通道,并且这个默认通道用户没有绑定失败
					// 	if (cur.channelCode == defaultChannelCode && cur.isCardBindsuc != 2) {
					// 		// 是的话就把我们默认选中设为我们默认选中的通道
					// 		radio = index;
					// 	} else {
					// 		if(cur.isCardBindsuc != 2){
					// 			radio = index;
					// 		}
					// 	}
					// })
					this.radio = radio;
					this.channelList = channelList;
					this.planInfo.channelCode = channelList[radio].channelCode;
					//设置默认是否显示落地城市选择
					this.isSupportLand = channelList[radio].isSupportLand;
					if (channelList[radio].isSupportLand == 1) {
						this.$toast({
							type: 'loading',
							message: '地区获取中...',
							duration: 0,
							forbidClick: true
						})
						server.queryProvinces({
								channelCode: channelList[radio].channelCode
							})
							.then(res => {
								if (res == null) return;
								this.citys = res.data;
								let province = Object.keys(res.data)[0] //拿到第一个省
								this.columns[0].values = Object.keys(res.data) //设置省选择框内数据
								this.columns[1].values = res.data[province] //设置市选择框内数据
								this.radioChange = true;
								if (this.$refs.cityPicker) {
									this.$refs.cityPicker.setColumnValues(0, Object.keys(res.data));
									this.$refs.cityPicker.setColumnValues(1, res.data[province]);
									this.$refs.cityPicker.setColumnIndex(0, 0);
									this.$refs.cityPicker.setColumnIndex(1, 2);
								}
							})
					} else {
						this.radioChange = true;
					}
				})
			},
			// 确定设置额度
			setCardQuo() {
				this.planInfo.cardQuota = this.cardQuota; //设置额度
				this.setCardQuotaBox = false; //关闭设置额度弹框
			},
			// 调起日期选择框
			showChooseDateBox(type) {
				this.chooseDateBox = true; //弹起选择日期框
				this.dateType = type; //选择设置日期的类型 2账单日 1还款日
			},
			// 确认日期选择
			setDate(value) {
				if (this.dateType == 1) {
					this.planInfo.repaymentDay = value
				} else {
					this.planInfo.billingDay = value
				}
				//重置还款日期选择器所有的东西
				this.arr1 = [];
				this.arr2 = [];
				this.checkArr1 = [];
				this.checkArr2 = [];
				this.chooseDateArr = [];
				//重置为默认日期顺序还款
				this.radio3 = 0;
				// 关闭日期选择器
				this.chooseDateBox = false;
			},
			// 选择通道
			changeRadio(e) {
				if (!this.radioChange) return;
				let name = e;
				// 选择通道时,设置通道id
				this.planInfo.channelCode = this.channelList[name].channelCode;
				// 当通道号等于1000000004时,关闭消费2 消费3选项
				// if (this.channelList[name].channelCode == '1000000004') {
				// 	this.planList = [{ //方式列表
				// 		planCode: 1,
				// 		name: '消费1'
				// 	}]
				// 	this.radio2 = 1;
				// }else{
				// 	this.planList = [
				// 		{ //方式列表
				// 			planCode: 1,
				// 			name: '消费1'
				// 		}, {
				// 			planCode: 2,
				// 			name: '消费2'
				// 		}, {
				// 			planCode: 3,
				// 			name: '消费3'
				// 		}
				// 	]
				// }
				//选择通道时，设置是否支持选择落地城市
				this.isSupportLand = this.channelList[name].isSupportLand;
				if (this.channelList[name].isSupportLand == 1) {
					tool.toastLoading()
					server.queryProvinces({
							channelCode: this.channelList[name].channelCode
						})
						.then(res => {
							if (res == null) return;
							this.citys = res.data;
							let province = Object.keys(res.data)[0] //拿到第一个省
							this.columns[0].values = Object.keys(res.data) //设置省选择框内数据
							this.columns[1].values = res.data[province] //设置市选择框内数据
							this.planInfo.provinceName = '';
							this.planInfo.cityName = '';
							if (this.$refs.cityPicker) {
								this.$refs.cityPicker.setColumnValues(0, Object.keys(res.data));
								this.$refs.cityPicker.setColumnValues(1, res.data[province]);
								this.$refs.cityPicker.setColumnIndex(0, 0);
								this.$refs.cityPicker.setColumnIndex(1, 2);
							}
						})
				}

			},
			// 选择方式
			changeRadio2(e) {
				let name = e;
				this.planInfo.repayMode = name;
			},
			// changeRadio3(e) {
			// 	let name = e;
			// 	console.log(e)
			// },
			// 调起省市选择框
			showPicker() {
				this.chooseCityBox = true;
			},
			// 改变选项
			onChange(picker, value) {
				let province = value[0]
				let citys = this.citys
				picker.setColumnValues(1, citys[province])
			},
			// 点击确定
			onConfirm(value) {
				this.planInfo.provinceName = value[0]
				this.planInfo.cityName = value[1]
				this.chooseCityBox = false;
			},
			// 预览还款计划
			PreviewRepayment() {
				let planInfo = this.planInfo;
				// 判断是否有少填写东西
				if (!planInfo.repayAmount) {
					this.$toast('请填写还款金额');
					return
				} else if (!planInfo.balanceAmount) {
					this.$toast('请填写卡内余额');
					return
				} else if (!planInfo.billingDay) {
					this.$toast('请选择账单日');
					return
				} else if (!planInfo.repaymentDay) {
					this.$toast('请选择还款日');
					return
				} else if (!planInfo.cardQuota) {
					this.$toast('请设置卡片额度');
					return
				} else if (this.isSupportLand == 1 && planInfo.provinceName == '' && planInfo.cityName == '') {
					// 判断当前通道是否有落地城市,如果有的话必须填落地省市
					this.$toast('请选择落地城市');
					return
				}
				let days = tool.days(); //获取当前月份的最大天数
				// 判断当前用户设置的账单日或者是还款日是否大于当前月份的最大天数,是的话改成当前月份最大的天数
				if (planInfo.billingDay > days) planInfo.billingDay = days;
				if (planInfo.repaymentDay > days) planInfo.repaymentDay = days;
				if (planInfo.billingDay == planInfo.repaymentDay) return this.$toast('账单日和还款日不能是同一天哦!')
				let repayDate = {};
				if (this.radio3 == 1) {
					repayDate = {
						arr1: this.arr1,
						arr2: this.arr2,
						chooseDateArr: this.chooseDateArr,
					}
				}
				// ----------------------------------------------------------------
				// ----------------------------------------------------------------------------
				if (this.radio3 == 1) {
					planInfo.dayString = this.chooseDateArr.map(cur => cur.dateNum).join(',');
				} else {
					planInfo.dayString = ''
				}
				// -------------------------------------------------------------------------------
				// 弹窗加载中
				tool.toastLoading();
				server.preCreatePlan(planInfo).then(res => {
					if (res == null) return;
					let channelType = this.channelList[this.radio].channelType;
					this.$toast.clear()
					this.$router.push({
						name: 'payPlanInfo',
						params: {
							channelType,
							cardInfo: planInfo,
							planInfo: res.data,
							repayDate
							// userInfo:this.cardInfo
						}
					})
				})
			},
		},
		filters: {
			// 过滤账单日,还款日
			dateTime: (value) => {
				let time = value;
				if (time == null) {
					time = ''
				} else if (time < 10) {
					time = '0' + value;
				}
				return time;
			},
			// 过滤额度
			Quota: (value) => {
				if (value == null || value == '') {
					value = ''
				} else {
					value = tool.centTurnSmacker(value);
				}
				return value;
			},
			//过滤已选择的日期
			days: (value) => {
				let days = value.map(cur => cur.dateNum).join('、')
				// console.log(value)
				return days
			}
		}
	};
</script>
<style lang="less">
	.radio-box {
		width: 100%;
		// justify-content: space-around;

		.van-radio {
			overflow: visible;
			margin-right: 20px;
		}

		.van-radio__label {
			margin-left: 5px;
		}
	}

	.addrePayPlan-choose-picker {
		.van-picker__toolbar {
			height: 70px;
			line-height: 70px;
		}

		.van-popup {
			position: absolute;
		}

		.van-picker__cancel,
		.van-picker__title,
		.van-picker__confirm,
		.van-picker-column {
			font-size: 30px;
		}

		.van-picker__columns {
			height: 300px;

			.van-picker-column {
				font-size: 30px;
			}
		}
	}
</style>
<style scoped="scoped" lang="less">
	// 信用卡
	.card-box {
		// margin-top: 88px;
		box-sizing: border-box;
		padding-top: 20px;

		// --------------------------------------------------------------
		.bg1 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(http://qiniuimg.kfmanager.com/bg1.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg1.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg2 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(http://qiniuimg.kfmanager.com/bg2.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg2.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg3 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(http://qiniuimg.kfmanager.com/bg3.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg3.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg4 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(http://qiniuimg.kfmanager.com/bg4.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg4.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg0 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(http://qiniuimg.kfmanager.com/bg5.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg5.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.card-top {
			width: 100%;
			height: 220px;
			box-sizing: border-box;
			padding: 50px 30px 20px;
			color: #fff;
			align-items: flex-start;

			.logo {
				font-size: 24px;

				img {
					width: 42px;
					height: 37px;
					padding-right: 10px;
				}

				.num1,
				.num2 {
					font-size: 28px;
					color: #fff;
					padding-left: 15px;
				}
			}

			.name {
				font-size: 40px;
				padding-top: 30px;
				padding-left: 50px;
				font-weight: bold;

				span {
					font-size: 26px;
					padding-left: 20px;
					font-weight: normal;
					color: rgba(255, 255, 255, 0.6);
				}
			}
		}

		.card-bottom {
			justify-content: space-between;
			padding: 30px;
			height: 230px;
			font-size: 40px;
			font-weight: bold;
			color: #fff;

			.card-bottom-li {
				width: 33.3333%;
				height: 86px;
				justify-content: space-between;
			}

			.cardQuota {
				// padding-left: 40px;
			}

			.bottom-name {
				font-size: 26px;
				color: rgba(255, 255, 255, 0.6)
			}

			.pen {
				padding-left: 10px;
				width: 28px;
				height: 28px;
				flex-shrink: 0;
			}

			.operator {
				width: 28px;
				height: 28px;
				flex-shrink: 0;
			}
		}

		// -----------------------------------------------------------
		// 		.card-li {
		// 			width: 690px;
		// 			height: 300px;
		// 			margin-bottom: 20px;
		// 			background: linear-gradient(90deg, rgba(253, 68, 68, 1), rgba(255, 144, 125, 1));
		// 			box-shadow: 0px 10px 14px 0px rgba(255, 174, 174, 1);
		// 			border-radius: 14px;
		// 			box-sizing: border-box;
		// 			padding: 30px 30px;
		// 			color: #fff;
		// 			justify-content: flex-start;
		// 
		// 			.top {
		// 				width: 100%;
		// 				height: 50px;
		// 				flex-wrap: nowrap;
		// 
		// 				img {
		// 					width: 48px;
		// 					height: 46px;
		// 					flex-shrink: 0;
		// 				}
		// 
		// 				.bank {
		// 					padding-left: 8px;
		// 					font-size: 30px;
		// 					text-align: left;
		// 					max-width: 300px;
		// 					overflow: hidden;
		// 					text-overflow: ellipsis;
		// 					white-space: nowrap;
		// 				}
		// 
		// 				.number {
		// 					font-size: 34px;
		// 					padding-left: 40px;
		// 				}
		// 
		// 				.repay {
		// 					width: 150px;
		// 					height: 50px;
		// 					line-height: 50px;
		// 					background: #fff;
		// 					margin-left: auto;
		// 					border-radius: 25px;
		// 					color: #fd4444;
		// 					font-size: 24px;
		// 				}
		// 			}
		// 
		// 			.middle {
		// 				padding-top: 20px;
		// 				width: 284px;
		// 				height: 88px;
		// 
		// 				.name {
		// 					font-size: 40px;
		// 				}
		// 
		// 				.people {
		// 					font-size: 26px;
		// 					margin-left: 14px;
		// 					color: rgba(255, 255, 255, 0.6);
		// 					opacity: 0.6;
		// 				}
		// 			}
		// 
		// 			.bottom {
		// 				width: 100%;
		// 				padding-top: 28px;
		// 				justify-content: space-between;
		// 
		// 				.bottom-t {
		// 					font-size: 40px;
		// 					justify-content: flex-end;
		// 
		// 					.pen {
		// 						padding-left: 10px;
		// 						width: 28px;
		// 						height: 28px;
		// 						flex-shrink: 0;
		// 					}
		// 
		// 					.operator {
		// 						width: 28px;
		// 						height: 28px;
		// 						flex-shrink: 0;
		// 					}
		// 				}
		// 
		// 				.bottom-b {
		// 					font-size: 26px;
		// 					color: rgba(255, 255, 255, 0.6);
		// 					opacity: 0.6;
		// 				}
		// 			}
		// 		}
	}

	// 填写信息表
	.repayPlan-box {
		width: 100%;
		padding: 20px;
		box-sizing: border-box;

		.repayPlan {
			width: 690px;
			// height: 740px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 3px 12px 0px rgba(212, 212, 212, 0.5);
			border-radius: 14px;
			box-sizing: border-box;
			padding: 0 30px;

			.repayPlan-li {
				width: 100%;
				// height: 100px;
				font-size: 30px;
				font-weight: 500;
				padding: 25px 0;
				text-align: left;
				color: #212121;
				// line-height: 100px;
				box-sizing: border-box;
				border-bottom: 1px solid #ededed;
			}

			.road {
				width: 100%;
				height: 100px;
				color: #212121;
				font-size: 30px;
				line-height: 100px;
				box-sizing: border-box;
				border-bottom: 1px solid #ededed;

				.name {
					width: 250px;
					text-align: left;
				}

				.radio-box {
					// justify-content: space-around;
				}

				img {
					width: 27px;
					height: 27px;
				}

				.name2 {
					width: 170px;
					text-align: left;
				}

				.days {
					// width: 100%;
					text-align: left;
					width: 400px;
					max-width: 400px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.city-picker {
				height: 100px;
				font-size: 30px;
				color: #212121;

				img {
					width: 11px;
					height: 20px;
				}

				.pick-title {
					width: 250px;
					text-align: left;
				}

				.pick-content {
					width: 100%;
					justify-content: space-between;
					position: relative;

					.pick-citys {
						color: #212121;

						.pick-provinceName {
							padding-right: 10px;
						}
					}

					.pick-tips {
						position: absolute;
						top: 50%;
						margin-top: -20px;
						left: 0;
						color: #d5d5d5;
					}
				}
			}

			.protocol {
				font-size: 24px;

				img {
					width: 22px;
					height: 22px;
					flex-shrink: 0;
					padding-right: 15px;
				}

				.protocol-li {
					color: #1A82FF;
				}
			}

			.repayPlan-btn {
				margin-top: 88px;
				width: 630px;
				height: 90px;
				background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
				box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
				border-radius: 45px;
				color: #fff;
				font-size: 32px;
			}
		}

		.repayPlan-btn {
			margin-top: 58px;
			width: 630px;
			height: 90px;
			background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
			box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
			border-radius: 45px;
			color: #fff;
			font-size: 32px;
		}
	}

	.input-box {
		height: 100px;

		.input {
			width: 400px;
			height: 80px;
			line-height: 80px;
		}
	}

	// 日期选择器
	.date-box {
		.date-title {
			width: 100%;
			height: 120px;
			// background: pink;
			box-sizing: border-box;
			border-bottom: 2px solid #f5f5f5;
			padding: 0 30px;
			font-size: 28px;
			justify-content: space-between;

			.title {
				font-size: 30px;
				color: #333;
				font-weight: bold;

				.day-num {
					padding-top: 5px;
					font-size: 24px;
					font-weight: bold;
				}
			}

			.cancel,
			.sure {
				width: 80px;
				height: 80px;
				// background: pink;
				color: #666;
				font-weight: bold;
				line-height: 80px;
			}
		}

		.date-table {
			.title {
				padding-top: 20px;
				font-size: 26px;

				.time {
					margin: 0 20px;
					color: #333;
					font-weight: bold;
				}

				img {
					width: 40px;
					height: 40px;
				}
			}

			.date-list {
				border-bottom: 20px solid #e0e0e0;

				.title {
					justify-content: space-around;
					flex-wrap: wrap;

					.li-choose {
						width: 107px;
						height: 60px;
						font-weight: bold;
						color: #333;
						line-height: 60px;
					}

					.li-no-choose {
						width: 107px;
						height: 85px;
						font-weight: bold;
						color: #999;
						line-height: 60px;
					}

					.li-has-choose {
						width: 55px;
						height: 55px;
						border-radius: 50%;
						background: #6abcff;
						line-height: 55px;
						color: #fff;
						position: relative;
					}

					.li-not-choose {
						position: relative;
					}

					.bill {
						position: absolute;
						left: 50%;
						margin-left: -54px;
						width: 107px;
						bottom: -30px;
						font-size: 20px;
						color: #2b8eff;
					}

					.repay {
						position: absolute;
						left: 50%;
						margin-left: -54px;
						width: 107px;
						bottom: -30px;
						font-size: 20px;
						color: #fb4c0b;
					}
				}
			}
		}
	}
</style>
