<template>
	<view class="home">
		<view>
			<u-navbar :is-back="false" :is-fixed="true " :background="{ background: '#f07373' }">
				<view style="width: 100%;">
					<u-row>
						<u-col span="8" offset="1">
							<u-search height="56" :show-action="false" :action-style="{color: '#fff'}">
							</u-search>
						</u-col>
						<u-col span="3">
							<u-icon name="reload" color="white
							" size="38"></u-icon><text style="color: white;line-height: 56 px;">刷新</text>
						</u-col>
					</u-row>
				</view>
			</u-navbar>
			<text>
				尊敬的{{username}}欢迎来到本软件
			</text>
			<view v-if="false" class="content">
				<!-- 正文内容 -->
				<view class="wrap">
					<u-sticky :enable="enable">
						<!-- 只能有一个根元素 -->
						<view class="sticky">
							<view class="u-tabs-box">
								<u-tabs-swiper activeColor="#d9d8d5" ref="tabs" :list="list" :current="current"
									@change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
							</view>
						</view>
					</u-sticky>
					<view>
						<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
							@animationfinish="animationfinish">
							<swiper-item class="swiper-item">
								<scroll-view scroll-y style="width: 100%;">
									<view class="bl_card">
										<u-row>
											<u-col span="5">
												<view class="photo">
													<image style="height: 100%;width: 100%;"
														src="https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg">
													</image>
												</view>
											</u-col>
											<u-col span="7">
												<view class="news">
													<text> safeeeeeeeeeeeeeefsefsaefasef</text>
												</view>
											</u-col>
										</u-row>
									</view>

								</scroll-view>
							</swiper-item>
							<swiper-item class="swiper-item">
								<scroll-view scroll-y style="height: 100%;width: 100%;">
									222
								</scroll-view>
							</swiper-item>
							<swiper-item class="swiper-item">
								<scroll-view scroll-y style="height: 100%;width: 100%;">
									333
								</scroll-view>
							</swiper-item>
							<swiper-item class="swiper-item">
								<scroll-view scroll-y style="height: 100%;width: 100%;">
									44
								</scroll-view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		onLoad() {
			let username = uni.getStorageSync('username')
			if (username) {
				this.username = username
			} else {
				this.username = '游客'
			}
			let uniIdToken = uni.getStorageSync('uni_id_token')
			if (uniIdToken) {
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'checkToken',
					},
					success: (e) => {
						if (e.result.code > 0) {
							//token过期或token不合法，重新登录
							this.guideToLogin()
						}
					},
					fail(e) {
						uni.showModal({
							content: JSON.stringify(e),
							showCancel: false
						})
					}
				})
			} else {
				this.guideToLogin()
			}
		},
		data() {
			return {
				username: '',
				list: [{
						name: 'html'
					},
					{
						name: 'css'
					},
					{
						name: 'js'
					},
					{
						name: 'vue',
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				enable: true,
			};
		},
		onShow() {
			this.enable = true
		},
		onHide() {

			this.enable = false
			console.log('enable', this.enable)

		},
		methods: {

			//去登录页
			guideToLogin() {
				uni.showModal({
					title: '未登录',
					content: '您未登录或者token已过期，需要登录后才能继续',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.reLaunch({
								url: '../my/my'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}

				})
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;

			},

			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}

	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.bl_card {
		height: 100px;
		width: 100%;
		background-color: #FFFFFF;

		.photo {
			padding: 8px;
			height: 100px;
			width: 100%;
		}
	}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
