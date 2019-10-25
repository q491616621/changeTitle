<template>
	<div>
	</div>
</template>
<script>
	import tool from '../../../public/tool/tool.js'
export default {
	data() {
		return {
			
		};
	},
	created() {
		let platFlag = tool.testPlat();
		tool.setAppTitle('绑卡成功');
		this.$dialog.alert({
			message:'恭喜：绑卡成功',
			beforeClose:(action, done)=>{
				if(platFlag == 1){
					// 调用ios返回app的方法
					window.webkit.messageHandlers.closeWeb.postMessage('');
				}else{
					//调用安卓返回app的方法
					window.android.btnBack()
				}
				done()
			}
		})
	}
};
</script>

<style scoped lang="less">
</style>