<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录</view>
			<u-form-item>
				<u-input v-model="userName" placeholder="请输入用户名6位以上" />
			</u-form-item>
			<u-form-item>
				<u-input type="password" v-model="password" placeholder="请输入密码" />
			</u-form-item>
			<u-gap height="80"></u-gap>
			<button @click="submit" class="getSmsCode">登录</button>
			<view class="alternative">
				<view class="password">忘记密码</view>
				<view class="issue" @click="loginBy()">遇到问题</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getDeviceUUID
	} from '@/common/utils.js'

	const captchaOptions = {
		deviceId: getDeviceUUID(),
		scene: 'login'
	}
	export default {
		data() {
			return {
				userName: '',
				password: '',
				captcha: '',
				needCaptcha: uni.getStorageSync('uni-needCaptcha'),
			}
		},
		computed: {

		},
		onLoad() {

		},
		methods: {
			submit() {
				console.log(1)
				const data = {
					username: this.username,
					password: this.password,
					captcha: this.captchaText,
					...captchaOptions
				};


				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'login',
						params: data
					},
					success: (e) => {
						if (e.result.code == 0) {
							this.needCaptcha = false;
							uni.setStorageSync('uni-needCaptcha', this.needCaptcha)

							uni.setStorageSync('uni_id_token', e.result.token)
							uni.setStorageSync('username', e.result.username)
							uni.setStorageSync('login_type', 'online')
							uni.setStorageSync('uni_id_has_pwd', true)
					
						} else {
							uni.showModal({
								content: e.result.message,
								showCancel: false
							})

							this.needCaptcha = e.result.needCaptcha;
							uni.setStorageSync('uni-needCaptcha', this.needCaptcha)
							if (this.needCaptcha) {
								this.captcha('createCaptcha')
							}
						}
					},
					fail: (e) => {
						uni.showModal({
							content: JSON.stringify(e),
							showCancel: false
						})
					},
					complete: () => {
						this.loginBtnLoading = false
					}
				})




			},
			loginBy(type) {
				this.$u.toast('开发中，敬请期待');
			},
			goPage(url) {
				this.$u.route({
					url: url
				})
			},

		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 0 auto;
			padding-top: 80rpx;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				font-size: 20rpx;
				margin-bottom: 60rpx;
				margin-top: 30rpx;
			}

			.getSmsCode {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.bottom {
			.loginType {
				display: flex;
				padding: 260rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
