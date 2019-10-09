<template>
	<div class="root">
		<Loading/>
		<!--router-view 就是一个渲染的占位符-->
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import Loading from './components/Loading';
	export default {
		components: { Loading }
	};
</script>

<style lang="stylus" rel="'stylesheet/stylus" scoped>
	.root
		width: 100%
		height: 100%
</style>