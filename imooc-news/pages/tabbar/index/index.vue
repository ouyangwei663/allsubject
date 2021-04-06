<template>
	<view class="content">
		<loading text="加载中.." mask="true" click="true" ref="loading"></loading>
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
			<u-card class="articleItem" v-for="(item, index) in articleList" :padding="10" :key="index"
				:title="item.title" :title-size="30" :sub-title="item.subTitle">
				<view class="" slot="body">
					<view class="article-detail" v-html="tranferHtml(item.content)"></view>
				</view>
				<view class="" slot="foot">

				</view>
			</u-card>
		</view>
	</view>
</template>
<script>
	import {
		translateMarkdown,
		calcCommentsCount
	} from '../../../untils/index.js';
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
				articleList: []
			};
		},
		created() {
			var res = uniCloud.callFunction({
				name: "find_block",
				data: {
					action: 'getlist'
				}
			}).then(res => {
				console.log('res', res)
				this.articleList = res.result.data
			})

		},
		onReady() {
			// this.$refs.loading.open();
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
			tranferHtml(content) {
				if (content) {
					console.log('666666666', translateMarkdown(content))
					return translateMarkdown(content);
				}
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
	.content {
		.u-card__foot {
			.list-item-others {
				vertical-align: middle;
				margin-top: 10px;
				color: rgba(0, 0, 0, 0.45);

				.splitLine {
					display: inline-block;
					margin: 0 10rpx;
					width: 2rpx;
					height: 30rpx;
					background: rgba(0, 0, 0, 0.45);
				}
			}
		}

		.article-detail {
			cursor: pointer;
			max-height: 240px;
			overflow: hidden;
			margin: 0 auto;
			font-family: Lato, PingFang SC, Microsoft YaHei, sans-serif;
			color: #555;
			line-height: 2;

			img {
				width: 100%;
				height: 300rpx;
			}

			h1 {
				font-size: 1em;
			}

			h2 {
				font-size: 1em;
			}

			h3 {
				font-size: 0.8em;
			}

			code {
				padding: 2px 4px;
				word-wrap: break-word;
				color: #ff502c;
				background: #fff5f5;
				border-radius: 3px;
				font-size: 13px;
			}

			pre {
				padding: 10px;
				overflow: auto;
				margin: 20px 0;
				font-size: 13px;
				color: #4d4d4c;
				background: #f7f7f7;
				line-height: 1.6;

				code {
					padding: 0;
					color: #555;
					background: none;
					text-shadow: none;
					font-family: consolas, Menlo, PingFang SC, Microsoft YaHei, monospace;
				}
			}

			blockquote {
				margin: 1em 0;
				border-left: 4px solid #ddd;
				padding: 0 1em;
				color: #666;
			}
		}
	}

	.app-article {
		padding: 50rpx;

		.post-header {
			text-align: center;
			padding-bottom: 20px;
			border-bottom: 1px solid #e8e8e8;

			.post-time {
				display: block;

				.time {
					padding-left: 10rpx;
				}
			}

			.post-title {
				color: #0d1a26;
				font-size: 1.7em;
				font-weight: 400;
				margin-top: 0;
				margin-bottom: 0.67em;
			}

			.splitLine {
				display: inline-block;
				margin: 0 10rpx;
				width: 2rpx;
				height: 30rpx;
				background: rgba(0, 0, 0, 0.45);
			}
		}

		.article-detail {
			max-height: 100%;
		}
	}
</style>
