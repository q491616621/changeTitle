<template>
	<div>
		<!-- 顶部标题栏 -->
		<!-- 		<div class="title-bar">
			<top-title :titleName="titleName"></top-title>
		</div> -->
		<!-- 信息栏列表 -->
		<div class="addCreditCard-bottom flx-c">
			<van-cell-group class="addInfo-box">
				<!-- <van-field class="addInput-li" label-width="2.373333rem" v-model="cardInfo.userName" disabled clearable label="姓名"
				 placeholder="请输入姓名" />
				<van-field class="addInput-li" label-width="2.373333rem" v-model="cardInfo.certificateNum" disabled clearable label="身份证"
				 placeholder="请输入身份证号码" /> -->
				<!-- 银行卡号 -->
				<van-field class="addInput-li" label-width="2.373333rem" type="number" v-model="cardInfo.bankCardNumb" clearable
				 label="储蓄卡" placeholder="请输入储蓄卡卡号" @blur='getBankName' />
				 <div @click="aa">按钮</div>
				<!-- 银行名称 -->
				<div class="addPicker-li flx-rs">
					<div>银行名称</div>
					<div class="right" @click="chooseBankBox = true">
						<div v-if="cardInfo.bankName ==''" class="default">请选择银行</div>
						<div class="bank-name" v-if="cardInfo.bankName !=''">{{ cardInfo.bankName }}</div>
						<img src="../../../assets/img/addCreditCard_choose.png" />
					</div>
				</div>
				<!-- 开户支行 -->
				<div class="addPicker-li flx-rs">
					<div>开户支行</div>
					<div class="right" @click="showSearchBox">
						<div v-if="cardInfo.bankNameBranch ==''" class="default">请选择所在开户支行</div>
						<div v-if="cardInfo.bankNameBranch !=''" class="name">{{ cardInfo.bankNameBranch }}</div>
						<img src="../../../assets/img/addCreditCard_choose.png" />
					</div>
				</div>
				<!-- 开户行省市 -->
				<div class="city-picker flx-rs medium">
					<div class="pick-title">开户行省市</div>
					<!-- <div class="pick-content flx-rs" @click="showCityPicker"> -->
					<div class="pick-content flx-rs" @click="chooseCityBox = true">
						<div style="color:#d5d5d5;" v-if="cardInfo.province == ''">请选择开户行省市</div>
						<div class="pick-citys flx-rs" v-if="cardInfo.province != ''">
							<div class="pick-provinceName">{{cardInfo.province}}</div>
							<div>{{cardInfo.city}}</div>
						</div>
						<img src="../../../assets/img/addCreditCard_choose.png" />
					</div>
				</div>
				<!-- 开户行省市 -->
				<div class="addPicker-li flx-rs">
					<div>开户所在区</div>
					<div class="right" @click="getRegion">
						<div v-if="cardInfo.dist ==''" class="default">请选择开户行所在区</div>
						<div v-if="cardInfo.dist !=''">{{ cardInfo.dist }}</div>
						<img src="../../../assets/img/addCreditCard_choose.png" />
					</div>
				</div>
				<!-- 身份证有效期开始时间 -->
				<div class="addPicker-li flx-rs">
					<div>有效期开始</div>
					<div class="right" @click="showValidityBox(1)">
						<div v-if="cardInfo.idcardValidStart ==''" class="default">请选择身份证有效期开始时间</div>
						<div v-if="cardInfo.idcardValidStart !=''">{{ cardInfo.idcardValidStart }}</div>
						<img src="../../../assets/img/addCreditCard_choose.png" />
					</div>
				</div>
				<!-- 身份证有效期结束时间 -->
				<div class="addPicker-li flx-rs">
					<div>有效期结束</div>
					<div class="right" @click="showValidityBox(0)">
						<div v-if="cardInfo.idcardValidEnd ==''" class="default">请选择身份证有效期结束时间</div>
						<div v-if="cardInfo.idcardValidEnd !=''">{{ cardInfo.idcardValidEnd }}</div>
						<img src="../../../assets/img/addCreditCard_choose.png" />
					</div>
				</div>

				<!-- 用户住址 -->
				<van-field class="addInput-li" label-width="2.373333rem" v-model="cardInfo.registAddr" clearable label="用户住址"
				 placeholder="请输入住址" />
				<!-- 银行预留手机号 -->
				<van-field class="addInput-li" label-width="2.373333rem" type="number" v-model="cardInfo.bankCardMobile" clearable
				 label="手机号码" placeholder="请输入银行预留手机号" />
				<button class="sure-btn bold" @click="bindAtmCard">确认绑定</button>
			</van-cell-group>
		</div>
		<!-- 选择银行 -->
		<div class="addCreditCard-choose-picker">
			<van-popup v-model="chooseBankBox" position="bottom">
				<van-picker show-toolbar title="请选择所属银行" :columns="bankColumns" @cancel="chooseBankBox=false" @confirm="sureBank"
				 :item-height='50' />
			</van-popup>
		</div>
		<!-- 省市选择器 -->
		<div class="addrePayPlan-choose-picker">
			<van-popup v-model="chooseCityBox" position="bottom">
				<van-picker show-toolbar :columns="columns" @change="onChange" @cancel="chooseCityBox=false" @confirm='onConfirm'
				 :item-height="60" />
			</van-popup>
		</div>
		<!-- 区选择器 -->
		<div class="addrePayPlan-choose-picker">
			<van-popup v-model="regionBox" position="bottom">
				<van-picker show-toolbar :columns="columns2" @change="onChange" @cancel="regionBox=false" @confirm='setRegion'
				 :item-height="60" />
			</van-popup>
		</div>
		<!-- 开户支行 -->
		<div class="search-box">
			<van-action-sheet class="search" v-model="branchBankSearchBox" title="搜索" style="height: 100%;"
			 :close-on-click-overlay='false' :lock-scroll='false' @close='closeSearchBox'>
				<van-search v-model="searchValue" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch" @input='list=[]'>
					<div slot="action" @click="onSearch">搜索</div>
				</van-search>
				<div class="search-list">
					<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
						<van-cell v-for="(item,index) in list" :key="index" :title="item.key" @click='setBranchBank(item)' />
					</van-list>
				</div>
			</van-action-sheet>
		</div>
		<!-- 身份证有效期 -->
		<van-action-sheet class="search" v-model="validityBox" :title="title?'有效期开始时间':'有效期结束时间'" style="height: 50%;"
		 :close-on-click-overlay='false' :lock-scroll='false' @close='validityBox=false'>
			<van-datetime-picker v-model="currentDate" type="date" :min-date="min" :max-date="max" @confirm='sureValidity'
			 @cancel='validityBox = false' />
		</van-action-sheet>
	</div>
</template>
<script>
	// import topTitle from '@/components/common/topTitle.vue';
	import tool from '../../../../public/tool/tool.js';
	// import citys from '../../../../public/tool/city.json';
	import {
		server
	} from '@/api/server.js';
	import {
		Toast
	} from 'vant';
	export default {
		// components: {
		// 	topTitle
		// },
		data() {
			return {
				// currentDate: '',
				currentDate: new Date(),
				max: '',
				min: '',
				titleName: '绑定提现银行卡', //标题栏标题
				from: '', //来自哪个页面
				cardInfo: {
					// userName: '王金盛', //姓名
					// certificateNum: '4451456464646846844', //身份证
					id: '',
					bankCardNumb: '', //储蓄卡号码
					bankCardMobile: '', //预留银行的手机号
					bankName: '', //选择的银行名称
					bankNameBranch: '', //支行名称
					bankBranchCode: '', //银行支行联行号
					province: '', //省份名称
					provinceCode: '', //省份编码
					city: '', //城市名称
					cityCode: '', //城市编码
					dist: '', //开户行所在区
					distCode: '', //区域编码
					idcardValidStart: '', //身份证有效期开始时间
					idcardValidEnd: '', //身份证有效期结束时间
					registAddr: '', //用户住址
				},
				title: '', //用户现在开始或者结束，1有效期开始，0有效期结束
				bankCode: '', //选择的银行code
				chooseBankBox: false, //控制银行的picker盒子显示与否
				branchBankSearchBox: false, //控制搜索盒子显示与否
				validityBox: false, //控制有效期选择盒子显示与否
				searchValue: '', //搜索内容

				// ---------------------------
				list: [],
				loading: false,
				finished: true,
				page: 1, //页数
				pageSize: 10, //每页个数
				// ---------------------------
				bankColumns: [], //银行列表
				chooseCityBox: false, //控制省市的picker盒子显示与否
				regionBox: false, //控制区的picker盒子显示与否
				citys: '',
				regionList:[],
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
				columns2:[],//区列表
			};
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.from = from.name;
			})
		},
		beforeCreate() {
			document.querySelector('body').setAttribute('style', 'background-color:#fff')
		},
		created() {
			// 转化时间(这个是为了修复ios手机new Date方法生成的不能使用)
			let a = '1999-01-01 00:00';
			let b = '2039-12-31 00:00';
			let c = '2019-01-01 00:00';
			this.max = new Date(b.replace(/-/g, "/"));
			this.min = new Date(a.replace(/-/g, "/"));
			this.currentDate = new Date(c.replace(/-/g, "/"));
			// 调用方法设置苹果手机顶部标题
			tool.setAppTitle('绑定提现银行卡')
			// 判断上个页面是否传值过来了,传了的话把值设置给相对的值
			let arr = Object.keys(this.$route.params)
			if (arr.length > 0) {
				if (this.$route.params.bankBranchCode) {//判断用户的bankBranchCode（支行联行号）是否存在，存在的话代表用户是已经完善过数据了的，把传过来的数据设置进去
					this.cardInfo.bankBranchCode = this.$route.params.bankBranchCode;
					this.cardInfo.bankNameBranch = this.$route.params.bankNameBranch;
					this.cardInfo.province = this.$route.params.province;
					this.cardInfo.provinceCode = this.$route.params.provinceCode;
					this.cardInfo.city = this.$route.params.city;
					this.cardInfo.cityCode = this.$route.params.cityCode;
					this.cardInfo.dist = this.$route.params.dist;
					this.cardInfo.distCode = this.$route.params.distCode;
				} else {//未完善数据的把数据设置为''
					this.cardInfo.bankBranchCode = '';
					this.cardInfo.bankNameBranch = '';
					this.cardInfo.province = '';
					this.cardInfo.provinceCode = '';
					this.cardInfo.city = '';
					this.cardInfo.cityCode = '';
					this.cardInfo.dist = '';
					this.cardInfo.distCode = '';
				}
				this.cardInfo.id = this.$route.params.id;
				// this.cardInfo.bankBranchCode = this.$route.params.bankBranchCode;
				// this.cardInfo.bankNameBranch = this.$route.params.bankNameBranch;
				this.cardInfo.bankCardMobile = this.$route.params.bankCardMobile;
				this.cardInfo.bankCardNumb = this.$route.params.bankCardNumb;
				this.cardInfo.bankName = this.$route.params.bankName;
				this.cardInfo.idcardValidEnd = this.$route.params.idcardValidEnd;
				this.cardInfo.idcardValidStart = this.$route.params.idcardValidStart;
				this.cardInfo.registAddr = this.$route.params.registAddr;
				this.bankCode = this.$route.params.bankCode;
			}
			this.setColums();
			this.setbankColumns();
			// --------------------
			let me = this;
			window['setBankNum'] = (url) => {
				me.setBankNum(url)
			}
		},
		methods: {
			aa(){
				let platFlag = tool.testPlat();
				if (platFlag == 1) {
					// closeWeb ios定义的退回上一页，删除H5页面的方法
					window.webkit.messageHandlers.closeWeb.getBankNum('');
				} else {
					// btnBack 安卓定义的退回上一页,删除H5页面的方法
					window.android.getBankNum()
				}
			},
			setBankNum(e){
				let appData = JSON.parse(e);
				let bankNum = appData.bankNum;
				this.$toast({
					message:bankNum,
					duration:0
				})
			},
			// 设置省市列表
			setColums() {
				tool.toastLoading();
				server.querySdjPronAndCityList()
				.then(res=>{
					if (res == null) return;
					// 把本地的省市json设置给页面
					this.citys = res.data;
					let arr = [];
					let arr2 = [];
					res.data.forEach(cur => {
						arr.push(cur.name)
					})
					res.data[0].cities.forEach(cur => {
						arr2.push(cur.name)
					})
					// 把省市设置给选择器
					this.columns[0].values = arr;
					this.columns[1].values = arr2;
				})
				// // 把本地的省市json设置给页面
				// this.citys = citys.provinces;
				// let arr = [];
				// let arr2 = [];
				// citys.provinces.forEach(cur => {
				// 	arr.push(cur.name)
				// })
				// citys.provinces[0].cities.forEach(cur => {
				// 	arr2.push(cur.name)
				// })
				// // 把省市设置给选择器
				// this.columns[0].values = arr;
				// this.columns[1].values = arr2;
			},
			// 设置银行列表
			setbankColumns() {
				tool.toastLoading();
				server.querySettleBankList()
					.then(res => {
						if (res == null) return;
						let bankColumns = [];
						res.data.forEach(cur => {
							let init = {};
							init.text = cur.key;
							init.bankCode = cur.value;
							bankColumns.push(init)
						})
						this.bankColumns = bankColumns;
						// return
						// 判断用户是否带着上个页面的参数进来的
						if (Object.keys(this.$route.params).length > 0) {
							// 判断上个页面传进来的银行名称是否和我们的银行数组相匹配,不匹配的话 把银行名,卡号,银行code，支行名称都重置
							let arr = bankColumns.filter(cur => cur.text == this.$route.params.bankName);
							if (arr.length != 0) {
								this.cardInfo.bankName = arr[0].text;
								this.bankCode = arr[0].bankCode;
							} else {
								this.cardInfo.bankName = '';
								this.bankCode = '';
								this.cardInfo.bankCardNumb = '';
								this.cardInfo.bankNameBranch = '';
								this.cardInfo.bankBranchCode = '';
							}
							// 判断上个页面传过来的数据是否有provinceCode或者是cityCode,没有的话循环遍历相对应的给到他
							// if (this.cardInfo.provinceCode == '' || this.cardInfo.cityCode == '') {
							// 	let arr2 = this.citys.filter(cur => cur.name == this.cardInfo.province);
							// 	let arr3 = arr2[0].cities.filter(cur => cur.name == this.cardInfo.city);
							// 	this.cardInfo.provinceCode = arr2[0].code;
							// 	this.cardInfo.cityCode = arr3[0].code;
							// }
							
							// else {
							// 	console.log('aa')
							// 	this.cardInfo.province = '';
							// 	this.cardInfo.provinceCode = '';
							// 	this.cardInfo.city = '';
							// 	this.cardInfo.cityCode = '';
							// }
						}
					})
			},
			getBankName() {
				tool.toastLoading()
				server.queryBankcardInfo({
						bankcardNumb: this.cardInfo.bankCardNumb
					})
					.then(res => {
						if (res == null) return;
						if (JSON.stringify(res.data) == '{}') return;
						// 判断返回的bankName是否和银行名称数组里有一样的,有的话把相同的设置给数据
						let arr = this.bankColumns.filter(cur => cur.text == res.data.bankName);
						if (arr.length != 0) {
							this.cardInfo.bankName = arr[0].text;
							this.bankCode = arr[0].bankCode;
						}
					})
			},
			// 展示有效期选择盒子
			showValidityBox(value) {
				this.title = value;
				this.validityBox = true;
			},
			// 确认有效期选择
			sureValidity(value) {
				if (this.title) {
					//设置身份证有效期开始时间
					let d = new Date(value);
					let month = d.getMonth() + 1;
					let days = d.getDate();
					if (d.getMonth() + 1 < 10) month = '0' + (d.getMonth() + 1);
					if (d.getDate() < 10) days = '0' + (d.getDate());
					// this.cardInfo.idcardValidStart = d.getFullYear() + '-' + month + '-' + days;
					this.cardInfo.idcardValidStart = `${d.getFullYear()}-${month}-${days}`;
					this.validityBox = false;
				} else {
					//设置身份证有效期结束时间
					let d = new Date(value);
					let month = d.getMonth() + 1;
					let days = d.getDate();
					if (d.getMonth() + 1 < 10) month = '0' + (d.getMonth() + 1);
					if (d.getDate() < 10) days = '0' + (d.getDate());
					// this.cardInfo.idcardValidEnd = d.getFullYear() + '-' + month + '-' + days;
					this.cardInfo.idcardValidEnd = `${d.getFullYear()}-${month}-${days}`;
					this.validityBox = false;
				}
			},
			// // 展示银行选择框
			// showChooseBankBox() {
			// 	// 判断数组里面是否有数据了,有的话不再发请求
			// 	if (this.bankColumns.length != 0) return this.chooseBankBox = true;
			// 	tool.toastLoading();
			// 	server.querySettleBankList()
			// 		.then(res => {
			// 			let bankColumns = [];
			// 			res.data.forEach(cur => {
			// 				let init = {};
			// 				init.text = cur.key;
			// 				init.bankCode = cur.value;
			// 				bankColumns.push(init)
			// 			})
			// 			this.bankColumns = bankColumns;
			// 			this.chooseBankBox = true;
			// 		})
			// },
			// 确认选择的银行
			sureBank(value) {
				this.cardInfo.bankName = value.text;
				this.bankCode = value.bankCode;
				this.chooseBankBox = false;
			},
			//展示支行搜索框
			showSearchBox() {
				if (this.cardInfo.bankName == '' || this.bankCode == '') {
					this.$toast({
						message: '请先选择银行！',
						duration: 2000
					})
					return
				}
				this.branchBankSearchBox = true;
			},
			// 关闭搜素框
			closeSearchBox() {
				this.page = 1;
				this.finished = true;
			},
			// 搜索支行
			onSearch() {
				if (this.searchValue == '') {
					this.$toast({
						message: '请输入搜索内容！',
						duration: 2000
					})
					return
				}
				this.page = 1;
				this.list = [];
				this.finished = false;
				// this.$nextTick(()=>{
				this.onLoad()
				// })
			},
			//设置支行
			setBranchBank(item) {
				this.cardInfo.bankNameBranch = item.key;
				this.cardInfo.bankBranchCode = item.value;
				this.list = [];
				this.searchValue = '';
				this.branchBankSearchBox = false;
			},
			// 支行列表加载
			onLoad() {
				let init = {
					bankFlag: this.bankCode,
					branchName: this.searchValue,
					page: this.page,
					pageSize: this.pageSize,
				};
				this.loading = true;
				server.querySettleBankBranchList(init)
					.then(res => {
						if (res == null) return;
						if (res.data.length == 0) {
							this.loading = false;
							this.finished = true;
							return;
						}
						let arr = res.data;
						this.list = this.list.concat(arr);
						this.loading = false;
						// 判断这次拿回来的数据是否小于每页的条数,小于的话不必再触发onLoad事件
						if (res.data.length < this.pageSize) {
							this.loading = false;
							this.finished = true;
							return
						}
						this.page += 1;
					})
			},
			// 改变省市选择
			onChange(picker, value) {
				let province = value[0]
				let citys = this.citys
				let arr = [];
				citys.forEach(cur => {
					if (cur.name == province) {
						cur.cities.forEach(item => {
							arr.push(item.name)
						})
					}
				})
				this.columns[1].values = arr;
				picker.setColumnValues(1, arr)
			},
			// 确定省市选择
			onConfirm(value, index) {
				this.cardInfo.province = value[0] //设置省的值
				this.cardInfo.city = value[1] //设置市的值
				this.cardInfo.provinceCode = this.citys[index[0]].code; //设置省的code
				this.cardInfo.cityCode = this.citys[index[0]].cities[index[1]].code; //设置市的code
				this.chooseCityBox = false;
			},
			// 获取区列表,调起区选择picker
			getRegion(){
				if(this.cardInfo.province == ''||this.cardInfo.city == ''){
					this.$toast({
						message: '请先选择省市',
						duration: 1500
					})
					return
				}
				tool.toastLoading()
				server.querySdjDistList({parentCode:this.cardInfo.cityCode})
				.then(res=>{
					if (res == null) return;
					let arr = [];
					res.data.forEach(cur => {
						arr.push(cur.name)
					})
					this.columns2 = arr;
					this.regionBox = true;
					this.regionList = res.data;
				})
			},
			//确认所选的区的选项
			setRegion(value,index){
				this.cardInfo.dist = value;
				this.cardInfo.distCode = this.regionList[index].code; 
				this.regionBox = false;
			},
			// 提交资料绑定银行卡
			bindAtmCard() {
				let cardInfo = this.cardInfo;
				let value = true;
				let verifier = {
					'bankCardNumb': '请填写储蓄卡号码', //储蓄卡号码
					'province': '请选择开户行省市', //省份名称
					'dist':'请选择开户行所在区',//区名称
					'bankName': '请选择银行', //开户行
					'bankNameBranch': '请选择支行', //支行
					'bankCardMobile': '请填写预留银行手机号', //预留银行的手机号
					'registAddr': '请填写用户地址',
					'idcardValidStart': '请选择身份证有效期开始时间',
					'idcardValidEnd': '请选择身份证有效期结束时间',
				}
				// 判读cardInfo 里面哪个值没填写,返回对应提示文字
				for (let it in cardInfo) {
					if (cardInfo[it] == null || cardInfo[it] == '') {
						for (let item in verifier) {
							if (item == it) {
								value = verifier[item]
							}
						}
					}
				}
				// 如果value 为true 的话,进行下一步绑定卡片，否则提示用户哪些信息未填写
				if (value === true) {
					tool.toastLoading()
					server.bindSettleCard(cardInfo)
						.then(res => {
							if (res == null) return;
							this.$toast({
								message: '绑定成功',
								duration: 2000,
								forbidClick: true,
								// onClose: () => {
								// 	this.$router.push({
								// 		name: 'withdrawal'
								// 	})
								// }
							})
							// 判断用户是从哪个页面进来的,根据来的方向返回不同的页面
							if (this.from == 'bindChannel') {
								setTimeout(() => {
									this.$router.replace({
										name: 'bindChannel',
										params: {
											channelCode: '1000000004',
											page: 'bindAtmCard',
											type:'ok'
										}
									})
								}, 2000)
							} else {
								setTimeout(() => {
									this.$router.push({
										name: 'withdrawal'
									})
								}, 2000)
							}
						})
				} else {
					this.$toast({
						message: value
					})
				}
			},
		},
	};
</script>
<style lang="less">
	.addCreditCard-choose-picker {
		.van-picker__toolbar {
			height: 70px;
			line-height: 70px;
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

	.mint-toast-text {
		font-size: 30px;
	}

	// -------------------------------
	// 搜索盒子
	.search-box {
		.van-action-sheet__header {
			position: fixed;
			width: 100%;
			top: 0;
			left: 0;
		}

		.van-search {
			position: fixed;
			width: 100%;
			top: 86px;
			left: 0;
		}

		.search-list {
			// margin-top: 194px;
			position: fixed;
			width: 100%;
			// height: 100%;
			top: 194px;
			bottom: 10px;
			left: 0;
			overflow-y: scroll;
		}

		.van-cell {
			border-bottom: 1px solid #f5f5f5;
		}

	}
</style>
<style scoped="scoped" lang="less">
	// 信息栏列表
	.addCreditCard-bottom {
		// margin-top: 88px;
		width: 100%;
		box-sizing: border-box;
		padding: 20px 30px;

		.addInfo-box {
			width: 690px;
			box-sizing: border-box;
			padding: 0 30px 110px;
			// height: 980px;
			background: #fff;
			box-shadow: 0px 3px 12px 0px rgba(212, 212, 212, 0.5);
			border-radius: 14px;

			.addInput-li {
				width: 100%;
				// height: 100px;
				font-size: 30px;
				font-weight: 500;
				padding: 25px 0;
				text-align: left;
				color: #888;
				// line-height: 100px;
				box-sizing: border-box;
				border-bottom: 1px solid #ededed;
			}

			.addPicker-li {
				width: 100%;
				height: 100px;
				font-size: 30px;
				font-weight: 500;
				color: #888;
				line-height: 100px;
				box-sizing: border-box;
				border-bottom: 1px solid #ededed;

				.right {
					width: 450px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #323233;

					.default {
						height: 100px;
						width: 100%;
						color: #d5d5d5;
					}

					.name {
						white-space: nowrap;
						width: 420px;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					img {
						width: 11px;
						height: 20px;
					}
				}
			}

			.addPicker-li :first-child {
				width: 178px;
				text-align: left;
			}

			.sure-btn {
				margin-top: 80px;
				width: 630px;
				height: 90px;
				background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
				box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
				border-radius: 45px;
				line-height: 90px;
				color: #fff;
				font-size: 32px;
			}
		}
	}

	.userInfo-box {
		width: 690px;
		height: 980px;
		box-sizing: border-box;
		// border: 1px solid #000;
		border-radius: 10px;
		padding: 0 30px;
		-moz-box-shadow: 0px 0px 20px #f0f0f0;
		-webkit-box-shadow: 0px 0px 20px #f0f0f0;
		box-shadow: 0px 0px 20px #f0f0f0;
	}

	// 验证码弹窗
	.code-box {
		width: 630px;
		height: 571px;
		background: #fff;
		border-radius: 22px;
		box-sizing: border-box;
		padding-top: 247px;

		.codeBox-logo {
			width: 192px;
			height: 192px;
			position: absolute;
			top: -86px;
			left: 50%;
			margin-left: -96px;
			z-index: 9999;
			border-radius: 50%;
			background: #fff;

			img {
				width: 175px;
				height: 175px;
				border-radius: 50%;
			}
		}

		.code-input {
			width: 553px;
			height: 100px;
			background: #fff;
			border: 1px solid #ededed;
			border-radius: 10px;
			box-sizing: border-box;
			padding: 0 26px;
			font-size: 130px;

			.input-box {
				font-size: 30px;
			}

			.send-btn {
				width: 180px;
				height: 55px;
				flex-shrink: 0;
				background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
				box-shadow: 0px 6px 12px 0px rgba(53, 133, 254, 0.5);
				border-radius: 28px;
				font-size: 26px;
				line-height: 55px;
				color: #fff;
			}

			.count-down {
				color: #fff;
				letter-spacing: 4px;
			}
		}

		.sumbit-btn {
			margin-top: 63px;
			width: 440px;
			height: 90px;
			background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
			box-shadow: -1px 8px 14px 0px rgba(53, 133, 254, 0.5);
			border-radius: 45px;
			color: #fff;
			font-size: 32px;
		}

		.cancel-btn {
			width: 68px;
			height: 68px;
			position: absolute;
			bottom: -118px;
			left: 50%;
			margin-left: -34px;
			z-index: 9999;
			background: url(../../../assets/img/addCreditCard_XX.png) no-repeat center center;
			background-size: 100% 100%;
		}
	}

	.van-dialog {
		overflow: visible;
	}

	.van-cell:not(:last-child)::after {
		border: none;
	}

	// 落地城市
	.city-picker {
		height: 100px;
		font-size: 30px;
		color: #888;
		border-bottom: 1px solid #ededed;

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

			.pick-citys {
				color: #212121;

				.pick-provinceName {
					padding-right: 10px;
				}
			}
		}
	}

	.search {
		max-height: 100%;
	}
	.bank-name{
		min-width: 400px;
	}
</style>
