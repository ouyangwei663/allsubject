<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
			<view v-if="current==0">
				<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
				<u-form-item>
					<u-input v-model="phone" placeholder="请输入手机号码" />
				</u-form-item>
				<u-form-item>
					<u-input placeholder="请输入验证码" type="text"></u-input>
					<u-button style="width: 20%;margin-right: 0;" slot="right" @click="getCode()" type="success"
						size="medium">{{codeTips}}
					</u-button>
				</u-form-item>
			</view>
			<view v-if="current==1">
				<u-form-item>
					<u-input v-model="userName" placeholder="请输入用户名6位以上" />
				</u-form-item>
				<u-form-item>
					<u-input type="password" v-model="password" placeholder="请输入密s码" />
				</u-form-item>
			</view>

			<u-gap height="80"></u-gap>
			<button @click="submit" class="getSmsCode">登录</button>
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
				phone: '',
				phonenum: '',
				list: [{
					name: '短信登录'
				}, {
					name: '账号密码登录'
				}, ],
				current: 0,
				userName: '',
				password: '',
				codeTips: '',
				captcha: '',
				needCaptcha: uni.getStorageSync('uni-needCaptcha'),
			}
		},
		computed: {

		},
		onLoad() {

		},
		methods: {
			change(index) {
				this.current = index;
			},
			submit() {
				if (this.current == 0) {
					uni.showToast({
						icon: 'none',
						title: '暂时未开放手机短信登录',
						duration: 2000
					});
				} else {
					if (this.userName.length < 3) {
						uni.showToast({
							icon: 'none',
							title: '账号最短为 3 个字符'
						});
						return;
					}
					if (this.password.length < 6) {
						uni.showToast({
							icon: 'none',
							title: '密码最短为 6 个字符'
						});
						return;
					}
					const data = {
						username: this.userName,
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
								uni.reLaunch({
									url: '../index/index'
								});
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

				}




			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			codeChange(text) {
				this.codeTips = text;
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
