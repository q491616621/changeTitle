import Vue from 'vue';
import Vuex from 'vuex'; //引入vuex
Vue.use(Vuex);
// state 共享仓库
const state = {
	sessionId:null,//登陆凭证
	repayChannelCode:null,//代还通道编号
	userName:null,//用户实名认证姓名
	certificateNum:null,//用户实名认证身份证号码
	withdrawalType:'app',//判断点击右上角返回按钮应该返回h5页面还是app，默认app
	unionpayQuickAmount:'',//银联快捷的金额
	quickChannelInfo:'',//当前选择的银联快捷通道的信息
}
// 修改state仓库数据的方法合集
const mutations = {
	// app端进入H5信用卡管理页面设置state数据调用的方法
	setCardManagement(state,appData){
		// 把app传递过来的参数设置给state里面对应的值
		state.sessionId = appData.sessionId;
		state.repayChannelCode = appData.repayChannelCode;
		state.userName = appData.userName;
		state.certificateNum = appData.certificateNum;
	},
	//设置返回健返回为h5页面
	setWithdrawalType(state){
		state.withdrawalType = 'h5' 
	},
	// 设置银联快捷的金额
	setUnionpayQuickAmount(state,amount){
		state.unionpayQuickAmount = amount
	},
	// 设置银卡选择通道信息
	setQuickChannelInfo(state,channelInfo){
		state.quickChannelInfo = channelInfo
	}
}
//异步掉用mutations里面的方法修改state里面的数据的方法合集
const actions = {
	
}
//实时监听state里面的值的变化
const getters = {
	
}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
});
export default store;