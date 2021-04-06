'use strict';

const db = uniCloud.database();
const collection = db.collection('opendb-news-articles');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('参数', event)
	let action = event.action;
	let res = {};

	if (action == '') {
		res.code = 1
		res.msg = '请填写action'
		return res
	} else {
		let params = event.params;

		switch (action) {
			case 'getlist':
				var row = await collection.orderBy("_id", "desc").get()
				res.data = row.data
				res.code = 0
				break;
			case 'add_list':
				let obj = {};
				obj._id = "605daa2ad635880001556696"
				obj.title = "第二篇文章"
				obj.content = event.conent
				var row = await collection.add()
				res.data = row.data
				res.code = 0

				break;
			default:
				res = {
					code: 403,
					msg: '非法访问'
				}
				break;
		};
		return res
	}

}
