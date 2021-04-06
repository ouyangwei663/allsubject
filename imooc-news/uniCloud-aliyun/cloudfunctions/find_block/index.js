'use strict';

const db = uniCloud.database();
const collection = db.collection('opendb-news-articles');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	var row = await collection.orderBy("_id", "desc").get()
	return {
		error: 0,
		data: row.data
	}


	//返回数据给客户端
	return event
};
