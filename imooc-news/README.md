# uni-app 实战

## 登录以及注册
* 账号密码登录
1. 登录传入的参数 
```
{
	name: 'user-center',
	{
	action:'login',
	params:{
		username:str,//用户名
		password:str,//密码
		captcha:str,//验证码
		scene:'login',
		deviceId:str//设备码（自己生成）
		}
	
	}
}
```
2. 验证码
- 第一次登录时候默认不显示验证码，自第一次点击登录后看返回的消息
- 如果返回的消息里面needCaptcha 为true就说明要验证码
- 如何获取验证码呢
	```
	name: 'user-center',
	data: {
		action：createCaptcha,
		params: {
			deviceId:str//设备码,
			scene: 'login'
		}
	}
	```
	返回的captchaBase64就是图片的64编码


* 创建账号(注册)
1. 传入参数	
```
	name: 'user-center',
	data: {
		action: 'register',
		params: {
			username:''
			password:''
		}
		},
	
```

##token的校验

