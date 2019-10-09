<template>
	<div class="loading" v-show="$store.state.loading.isShow">
	</div>
</template>

<script type="text/ecmascript-6">
        export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.loading
		position: fixed
		left: 0
		top: 0
		width: 100%
		height: 100%
		background: url("loading.gif") no-repeat center center
		background-color: #fff
</style>