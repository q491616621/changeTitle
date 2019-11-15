<template>
	<div>
		<!-- 顶部标题栏 -->
		<!-- 		<div class="title-bar flx-r">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div> -->
		<!-- <div class="container flx-cas" v-if="false"> -->
		<div class="container flx-cas" v-if="show">
			<div class="instructions flx-r">
				<!-- <img src="../../../assets/img/UnionpayQuick/explain.png"> -->
				<div style="font-weight: bold;" @click="goOrderList">订单详情</div>
			</div>
			<div class="amount-box flx-cas">
				<div class="title">
					<span>请输入刷卡金额</span>
					<span>(元)</span>
				</div>
				<div class="content flx-rs">
					<div>￥</div>
					<div v-if="amount.length>0">{{amount}}</div>
					<div v-if="!(amount.length>0)">0.00</div>
					<!-- <span>0.00</span> -->
				</div>
				<div class="bottom flx-r">
					<div class="bottom-li flx-c">
						<div>限额</div>
						<div>2万元/笔</div>
					</div>
					<div class="bottom-li flx-c">
						<div>费率</div>
						<div>0.55%+3元/笔</div>
					</div>
					<div class="bottom-li flx-c">
						<div>结算</div>
						<div>10秒内到账</div>
					</div>
				</div>
			</div>
			<div class="number-keyboard flx-ras">
				<div class="keybord-left flx-ras">
					<van-button class='keybord-li' type="default" @click='setAmount("1")'>1</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("2")'>2</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("3")'>3</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("4")'>4</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("5")'>5</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("6")'>6</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("7")'>7</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("8")'>8</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("9")'>9</van-button>
					<van-button class='keybord-zero' type="default" @click='setAmount("0")'>0</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount(".")'>·</van-button>
				</div>
				<div class="keybord-right flx-cs">
					<van-button class='keybord-x' type="default" @click="setAmount('D')">
						<img src="../../../assets/img/UnionpayQuick/del.png">
						<!-- <span class="x">x</span> -->
					</van-button>
					<van-button class='keybord-pay' type="default" @click='goChooseQuickCard'>
						<span>确认</span>
						<span>付款</span>
					</van-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	// import topTitle from '@/components/common/topTitle.vue';
	import tool from '../../../../public/tool/tool.js';
	import switchServer from '../../../../public/tool/switchServer.js';
	export default {
		// components: {
		// 	topTitle,
		// },
		data() {
			return {
				// -------
				show:false,
				// -------
				titleName: '信用卡刷卡', //标题栏标题
				pageType: 'app',
				amount: '', //提现金额
				userInfo:'',
				// userInfo:{
				// 	realName:'于洪申',
				// 	certificateNumb:'210423198801023053'
				// }
			};
		},
		beforeRouteEnter(to, from, next) {
			let name = from.name;
			if (name == 'chooseQuickCard' || name == 'orderList') {
				to.params.type = 'next'
			}
			next();
		},
		beforeCreate() {
			document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
		},
		created() {
			tool.setAppTitle('信用卡刷卡')
			// let platFlag = tool.testPlat();
			// this.$dialog.alert({
			// 	message:'该功能正在开发中，敬请期待！',
			// 	beforeClose:(action, done)=>{
			// 		if (platFlag == 1) {
			// 			// closeWeb ios定义的退回上一页，关闭H5页面的方法
			// 			window.webkit.messageHandlers.closeWeb.postMessage('');
			// 			done()
			// 		} else {
			// 			// btnBack 安卓定义的退回上一页,关闭H5页面的方法
			// 			window.android.btnBack()
			// 			done()
			// 		}
			// 	}
			// })
			this.amount = this.$store.state.unionpayQuickAmount;
			this.show = this.$store.state.show;
			// ----------------------------------
			let me = this;
			window['setSwipeCardData'] = (url) => {
				me.setSwipeCardData(url)
			}
		},
		methods: {
			// 设置获取app传过来的数据
			setSwipeCardData(data){
				let appData = JSON.parse(data)
				let sessionId = appData.sessionId;//app传过来的sessionId
				// let faceStatus = appData.faceStatus;//app传过来的faceStatus（实名认证状态）
				let realName = appData.realName;//app传过来的用户姓名
				let certificateNumb = appData.certificateNumb;//app传过来的用户身份证号码
				// return //功能暂时不放开
				// this.$toast({
				// 	message:`sessionId:${sessionId},faceStatus:${faceStatus},realName:${realName},certificateNumb:${certificateNumb}`,
				// 	duration:0
				// })
				switchServer.setCookie(sessionId);//调用switchServer的setCookie方法设置cookie
				this.userInfo = {realName,certificateNumb}
				// -----------------------------------
				let nameArr = [
					{name:'孙兆国'},
					{name:'于洪申'},
					{name:'杨海军'},
					{name:'杜洋洋'},
					{name:'李俊鹏'},
					]
				let a = false;
				for (let i = 0; i < nameArr.length; i++) {
					if(nameArr[i].name == realName){
						a = true;
					}
				}
				if(a){
					this.$store.commit('setShow')
					this.show = true
				}else{
					let platFlag = tool.testPlat();
					this.$dialog.alert({
						message:'该功能正在开发中，敬请期待！',
						beforeClose:(action, done)=>{
							if (platFlag == 1) {
								// closeWeb ios定义的退回上一页，关闭H5页面的方法
								window.webkit.messageHandlers.closeWeb.postMessage('');
								done()
							} else {
								// btnBack 安卓定义的退回上一页,关闭H5页面的方法
								window.android.btnBack()
								done()
							}
						}
					})
				}
				// -----------------------------------
				// 这行代码用来判断用户是否是从app端进来当前页面的,如果不是的app端进来的或者处于非swipeCard页面,不执行下面的操作(这个是为了优化安卓不多次去设置金额)
				if(this.$route.name != 'swipeCard'||this.$route.params.type == 'next')return;
				//只要是从app进来的，就把vuex的方法把输入的金额设置为''
				this.$store.commit('setUnionpayQuickAmount', '')
				this.amount = '';
			},
			// 跳转选择信用卡页面
			goChooseQuickCard() {
				if (!this.amount || this.amount == 0) {
					this.$toast({
						message: '请输入刷卡金额',
					})
					return;
				}
				//调用vuex 设置银联快捷的金额
				this.$store.commit('setUnionpayQuickAmount',parseFloat(this.amount).toString())
				// 跳转选择快捷信用卡页面
				this.$router.push({
					name: 'chooseQuickCard',
					params:{userInfo:this.userInfo}
				})
			},
			// 跳转订单列表页面
			goOrderList(){
				this.$router.push({
					name:'orderList'
				})
			},
			// 输入金额
			setAmount(num) {
				// let str = this.amount;
				switch (String(num)) {
					// 小数点
					case '.':
						this._handleDecimalPoint();
						break;
						// 删除键
					case 'D':
						this._handleDeleteKey();
						break;
					default:
						// 数字键
						this._handleNumberKey(num);
						break;
				}
			},
			// 小数点
			_handleDecimalPoint() {
				let amount = this.amount;
				// 如果已经包含了小数点,直接返回
				if (amount.indexOf('.') > -1) return;
				//如果小数点是第一位，补0
				if (!amount.length) {
					// amount = '0.'
					return;
				} else {
					//如果不是，添加一个小数点
					amount += '.'
				}
				this.amount = amount;
				// console.log('点')
			},
			// 删除键
			_handleDeleteKey() {
				let amount = this.amount;
				// 如果没有输入,直接返回
				if (!amount.length) return;
				// 否则删除最后一个 
				amount = amount.substring(0, amount.length - 1);
				this.amount = amount;
				// console.log('删除')
			},
			// 数字键
			_handleNumberKey(num) {
				let amount = this.amount;
				//如果有小数点且小数点位数不小于2
				if (amount.indexOf('.') > -1 && amount.substring(amount.indexOf('.') + 1).length < 2) {
					amount += num;
				}
				// 有小数点
				if (!(amount.indexOf('.') > -1)) {
					if (num == 0 && amount.length == 0) {
						// amount = '0.'
						amount = '0'
						// return;
					} else {
						if (amount.length && Number(amount.charAt(0)) === 0) return;
						amount += num;
					}
				}
				this.amount = amount;
				// console.log('数字')
			}
		},
	};
</script>
<style scoped="scoped" lang="less">
	.container {
		width: 100%;
		// margin-top: 88px;

		.instructions {
			width: 690px;
			height: 90px;
			justify-content: flex-end;
			font-size: 24px;
			color: #000;

			img {
				width: 20px;
				height: 23px;
				padding-right: 10px;
			}
		}

		// 金额信息表
		.amount-box {
			width: 690px;
			height: 368px;
			background: #fff;
			border-radius: 20px;
			font-size: 24px;
			color: #333;
			box-sizing: border-box;
			padding: 30px;

			.title {
				text-align: left;
				width: 100%;
				padding-top: 20px;
				font-size: 28px;
				color: #666;

				:nth-child(2) {
					padding-left: 20px;
				}
			}

			.content {
				width: 100%;
				height: 100px;
				line-height: 100px;
				padding-top: 60px;
				// border-bottom: 1px solid #e5e5e5;
				
				div {
					height: 100px;
					line-height: 80px;
					font-size: 60px;
					color: #444;
				}

				:nth-child(2) {
					color: #666;
				}
			}

			.bottom {
				border-top: 1px solid #e5e5e5;
				padding-top: 20px;
				width: 100%;
				height: 100%;
				justify-content: space-around;

				.bottom-li {
					justify-content: space-between;
					height: 80px;

					:nth-child(2) {
						color: #5B95F9;
					}
				}
			}
		}

		// 数字键盘

		.number-keyboard {
			position: fixed;
			bottom: 30px;
			width: 100%;
			height: 510px;

			.keybord-left {
				width: 514px;
				justify-content: space-between;
				align-items: flex-start;
				flex-wrap: wrap;

				.keybord-li {
					width: 165px;
					height: 120px;
					margin-bottom: 10px;
					border-radius: 5px;
					font-size: 40px;
					color: #333;
					font-weight: blod;
				}

				.keybord-zero {
					width: 340px;
					height: 120px;
					border-radius: 5px;
					font-size: 40px;
					color: #333;
					font-weight: blod;
				}
			}

			.keybord-right {
				width: 176px;

				.keybord-x {
					width: 165px;
					height: 120px;
					margin: 0 0 10px 10px;
					border-radius: 5px;
					line-height: 0;

					img {
						width: 34px;
						height: 26px;
					}
				}

				.keybord-pay {
					width: 165px;
					height: 380px;
					border-radius: 5px;
					background: #5B95F9;
					margin-left: 10px;
					line-height: 50px;

					span {
						width: 70px;
						font-size: 36px;
						color: #fff;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
