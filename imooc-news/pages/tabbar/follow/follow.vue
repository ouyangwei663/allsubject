<template>
	<view class="add">
		<textarea maxlength="-1" v-model="phone" auto-height />

	<button @click="submit" class="getSmsCode">添加</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				phone: '',
			}
		},
		computed: {

		},
		onLoad() {

		},
		methods: {
			submit() {
				uniCloud.callFunction({
					name: "find_block",
					data: {
						action: 'add_list',
						content: this.phone
					}
				}).then(res => {
					console.log('res', res)
					this.articleList = res.result.data
				})
			}

		}
	}
</script>
