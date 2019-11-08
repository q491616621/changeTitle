<template>
	<div>
	</div>
</template>
<script>
	import tool from '../../../../public/tool/tool.js'
export default {
	data() {
		return {
		};
	},
	created() {
		tool.setAppTitle('推广奖励')
		let platFlag = tool.testPlat();
		this.$dialog.alert({
			message:'该功能正在开发中，敬请期待！',
			beforeClose:(action, done)=>{
				if (platFlag == 1) {
					// closeWeb ios定义的退回上一页，删除H5页面的方法
					window.webkit.messageHandlers.closeWeb.postMessage('');
					done()
				} else {
					// btnBack 安卓定义的退回上一页,删除H5页面的方法
					window.android.btnBack()
					done()
				}
			}
		})
	}
};
</script>

<style>
</style>