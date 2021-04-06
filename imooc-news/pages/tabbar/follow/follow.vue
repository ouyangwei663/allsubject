<template>
	<view class="add">
		<u-form-item>
			<u-input v-model="phone" placeholder="请输入手机号码" />
		</u-form-item>
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
						content: '1234567879878456'
					}
				}).then(res => {
					console.log('res', res)
					this.articleList = res.result.data
				})
			}

		}
	}
</script>
