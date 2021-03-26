# uni-app 实战

## 登录以及注册
>* 账号密码登录
>>登录传入的参数
>>> action:'login',
>>>params{ username,password,captcha(验证码，可以为空), scene: 'login',deviceId(一串随机数，用来记录设备ID):,}
>>验证码
>>>第一次登录的时候默认不显示验证码，自第一次点击登录后看返回的消息，如果消息里返回needCaptcha为true 就可以说明要显示验证码