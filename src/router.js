import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// login //登陆页面
//turnBackApp//提示返回app页面
// addCreditCard //添加信用卡页面
// contactServer //联系客服页面
// cardManagement //信用卡管理页面
// addrePayPlan //新增还款计划页面
// payPlanInfo //新增的还款计划详情页面
// surePlan //执行计划(确认计划)
// planDetail //计划详情
// myMessage //我的消息
// chooseRepaymethod //选择还款方式
//incomeDetails //收益明细
//withdrawal //提现
// bindAtmCard //绑定银行卡
//withdrawalRecord // 提现记录
//updateMember // 购买升级会员
// registerProtocol //注册协议
// privacyProtocol //隐私协议
// shareRegister //分享注册
// downloadApp //下载app
// sharePosters //分享海报
// sharePostersTwo //分享海报2
//swipeCard //信用卡刷卡
//quickVerify //快捷支付短信验证
//channelIntroduce //积分通道介绍
//chooseQuickCard //选择快捷支付银行卡
//addQuickCard //添加快捷信用卡
//bindChannel //绑定通道
//myMerchant //我的商户
//merchantDetails //我的商户详情
//companyIntroduction //公司简介
//videoTutorials //适配教程
//reimbursementTutorial //还款教程
//sdjBindChannel //盛迪佳通道绑定页面
//promotionRewards//推广奖励页面

const router = new Router({
	base: process.env.BASE_URL,
	// mode: 'history',
	routes: [
		// {
		//    path: '',
		//    redirect: '/login',
		//    name: 'login',
		//  },
		{
			path: '/login',
			name: 'login',
			component: resolve => require(['@/components/common/login.vue'], resolve)
		},
		{
			path: '/turnBackApp',
			name: 'turnBackApp', //turnBackApp 提示返回app页面
			meta:{
				title:'绑卡成功'
			},
			component: resolve => require(['@/components/common/turnBackApp.vue'], resolve)
		},
		{
			path: '/commonError',
			name: 'commonError', //commonError 统一处理错误页面
			component: resolve => require(['@/components/common/commonError.vue'], resolve)
		},
		{
			path: '/test',
			name: 'test', //测试用的
			meta:{
				title:'积分攻略'
			},
			component: resolve => require(['@/components/common/test.vue'], resolve)
		},
		{
			path: '/sdjBindChannel',
			name: 'sdjBindChannel', //盛迪佳通道绑定
			
			component: resolve => require(['@/components/common/sdjBindChannel.vue'], resolve)
		},
		{
			path: '/addCreditCard',
			name: 'addCreditCard', // addCreditCard //添加信用卡页面
			meta:{
				title:'添加信用卡'
			},
			component: resolve => require(['@/components/appPages/addCreditCard.vue'], resolve)
		},
		{
			path: '/contactServer',
			name: 'contactServer', // contactServer //联系客服页面
			meta:{
				title:'联系客服'
			},
			component: resolve => require(['@/components/appPages/contactServer.vue'], resolve)
		},
		{
			path: '/cardManagement',
			name: 'cardManagement', // cardManagement //信用卡管理页面
			meta: {
				// index:0,
				title:'信用卡管理'
			},
			component: resolve => require(['@/components/appPages/cardManagement.vue'], resolve)
		},
		{
			path: '/addrePayPlan',
			name: 'addrePayPlan', // addrePayPlan //新增还款计划页面
			meta: {
				// index:2,
				title:'新增还款计划',
				keepAlive: true, //该字段表示该页面需要缓存
				isBack: true
			},
			component: resolve => require(['@/components/appPages/addrePayPlan.vue'], resolve)
		},
		{
			path: '/payPlanInfo',
			name: 'payPlanInfo', // payPlanInfo //新增的还款计划详情页面
			meta: {
				// index:3,
				title:'还款总金额(元)',
				keepAlive: true, //该字段表示该页面需要缓存
				isBack: true
			},
			component: resolve => require(['@/components/appPages/payPlanInfo.vue'], resolve)
		},
		{
			path: '/surePlan',
			name: 'surePlan', // surePlan //执行计划(确认计划)
			meta: {
				// index:4,
				title:'执行计划',
				keepAlive: true, //该字段表示该页面需要缓存
				isBack: true
			},
			component: resolve => require(['@/components/appPages/surePlan.vue'], resolve)
		},
		{
			path: '/planDetail',
			name: 'planDetail', // planDetail //计划详情
			meta: {
				// index:1,
				title:'计划详情',
				keepAlive: true, //该字段表示该页面需要缓存
				isBack: true
			},
			component: resolve => require(['@/components/appPages/planDetail.vue'], resolve)
		},
		{
			path: '/chooseRepaymethod',
			name: 'chooseRepaymethod', // chooseRepaymethod //选择还款方式
			meta: {
				// index:1,
				title:'选择还款方式',
				keepAlive: true, //该字段表示该页面需要缓存
				isBack: true
			},
			component: resolve => require(['@/components/appPages/chooseRepaymethod.vue'], resolve)
		},
		{
			path: '/myMessage',
			name: 'myMessage', // myMessage //我的消息
			meta: {
				title: '我的消息'
			},
			component: resolve => require(['@/components/appPages/myMessage.vue'], resolve)
		},
		{
			path: '/incomeDetails',
			name: 'incomeDetails', // incomeDetails //收益明细
			meta: {
				title: '收益明细'
			},
			component: resolve => require(['@/components/appPages/incomeDetails.vue'], resolve)
		},
		{
			path: '/withdrawal',
			name: 'withdrawal', // withdrawal //提现
			meta: {
				title: '提现'
			},
			component: resolve => require(['@/components/appPages/incomes/withdrawal.vue'], resolve)
		},
		{
			path: '/withdrawalRecord',
			name: 'withdrawalRecord', // withdrawalRecord //提现记录
			meta: {
				title: '提现记录'
			},
			component: resolve => require(['@/components/appPages/incomes/withdrawalRecord.vue'], resolve)
		},
		{
			path: '/bindAtmCard',
			name: 'bindAtmCard', // bindAtmCard //绑定银行卡
			meta: {
				title: '绑定提现银行卡'
			},
			component: resolve => require(['@/components/appPages/incomes/bindAtmCard.vue'], resolve)
		},
		{
			path: '/updateMember',
			name: 'updateMember', // updateMember //购买升级会员
			meta: {
				title: '会员升级'
			},
			component: resolve => require(['@/components/appPages/payment/updateMember.vue'], resolve)
		},
		{
			path: '/registerProtocol',
			name: 'registerProtocol', // registerProtocol //注册协议
			meta: {
				title: '注册协议'
			},
			component: resolve => require(['@/components/appPages/protocol/registerProtocol.vue'], resolve)
		},
		{
			path: '/privacyProtocol',
			name: 'privacyProtocol', // privacyProtocol //隐私协议
			meta: {
				title: '隐私协议'
			},
			component: resolve => require(['@/components/appPages/protocol/privacyProtocol.vue'], resolve)
		},
		{
			path: '/shareRegister',
			name: 'shareRegister', // shareRegister //分享注册
			component: resolve => require(['@/components/appPages/share/shareRegister.vue'], resolve)
		},
		{
			path: '/downloadApp',
			name: 'downloadApp', // downloadApp //下载app
			component: resolve => require(['@/components/appPages/downloadApp/downloadApp.vue'], resolve)
		},
		{
			path: '/sharePosters',
			name: 'sharePosters', // sharePosters //分享海报
			component: resolve => require(['@/components/appPages/share/sharePosters.vue'], resolve)
		},
		{
			path: '/sharePostersTwo',
			name: 'sharePostersTwo', // sharePostersTwo //分享海报2
			meta: {
				title: '分享海报'
			},
			component: resolve => require(['@/components/appPages/share/sharePostersTwo.vue'], resolve)
		},
		{
			path: '/swipeCard',
			name: 'swipeCard', // swipeCard //信用卡刷卡
			meta:{
				title:'信用卡刷卡'
			},
			component: resolve => require(['@/components/appPages/UnionpayQuick/swipeCard.vue'], resolve)
		},
		{
			path: '/quickVerify',
			name: 'quickVerify', // quickVerify //快捷支付短信验证
			meta:{
				title:'短信验证'
			},
			component: resolve => require(['@/components/appPages/UnionpayQuick/quickVerify.vue'], resolve)
		},
		{
			path: '/channelIntroduce',
			name: 'channelIntroduce', // channelIntroduce //通道介绍
			meta:{
				title:'通道介绍'
			},
			component: resolve => require(['@/components/appPages/UnionpayQuick/channelIntroduce.vue'], resolve)
		},
		{
			path: '/chooseQuickCard',
			name: 'chooseQuickCard', // chooseQuickCard //选择快捷支付银行卡
			meta:{
				title:'选择支付银行',
				keepAlive: true, //该字段表示该页面需要缓存
				isBack: true
			},
			component: resolve => require(['@/components/appPages/UnionpayQuick/chooseQuickCard.vue'], resolve)
		},
		{
			path: '/addQuickCard',
			name: 'addQuickCard', // addQuickCard //添加快捷信用卡
			meta: {
				title: '添加快捷信用卡',
				keepAlive: true, //该字段表示该页面需要缓存
				isBack: true
			},
			component: resolve => require(['@/components/appPages/UnionpayQuick/addQuickCard.vue'], resolve)
		},
		{
			path: '/bindChannel',
			name: 'bindChannel', // bindChannel //绑定通道
			meta: {
				title: '通道绑定'
			},
			component: resolve => require(['@/components/appPages/bindChannel.vue'], resolve)
		},
		{
			path: '/myMerchant',
			name: 'myMerchant', // myMerchant //我的客户
			meta: {
				title: '我的客户'
			},
			component: resolve => require(['@/components/appPages/myMerchant/myMerchant.vue'], resolve)
		},
		{
			path: '/merchantDetails',
			name: 'merchantDetails', // merchantDetails //我的客户详情
			meta: {
				title: '我的客户'
			},
			component: resolve => require(['@/components/appPages/myMerchant/merchantDetails.vue'], resolve)
		},
		{
			path: '/companyIntroduction',
			name: 'companyIntroduction', // companyIntroduction //公司简介
			meta: {
				title: '公司简介'
			},
			component: resolve => require(['@/components/appPages/companyIntroduction/companyIntroduction.vue'], resolve)
		},
		{
			path: '/videoTutorials',
			name: 'videoTutorials', // videoTutorials //视频教程
			meta: {
				title: '视频教程'
			},
			component: resolve => require(['@/components/appPages/videoTutorials/videoTutorials.vue'], resolve)
		},
		{
			path: '/reimbursementTutorial',
			name: 'reimbursementTutorial', // reimbursementTutorial //还款教程
			meta: {
				title: '还款教程'
			},
			component: resolve => require(['@/components/appPages/videoTutorials/reimbursementTutorial.vue'], resolve)
		},
		{
			path: '/promotionRewards',
			name: 'promotionRewards', // promotionRewards //推广奖励
			meta: {
				title: '推广奖励'
			},
			component: resolve => require(['@/components/appPages/promotionRewards/promotionRewards.vue'], resolve)
		},
	]
})
// router.beforeEach((to, from, next) => {
// 	if(!to.query.name){
// 		let query = to.query;
// 		query.name = 'www.baidu.com';
// 		next({
// 			path:to.path,
// 			query:query,
// 		})
// 	}else{
// 		next()
// 	}
// })
// 
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	window.scrollTo(0, 0);
	next();
});
export default router
