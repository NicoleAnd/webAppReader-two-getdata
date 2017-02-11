var fs = require('fs');
exports.get_test_data = function(){
	// 返回test.json数据
	var content = fs.readFileSync('./mock/test.json', 'utf-8');
	return content;
}
// 调用搜索异步http接口
exports.get_search_data = function(start,end,keyword){
	return function(cb){
		var http = require('http');
		// {a : '1'} => http://127.0.0.1/api?a=1
		var qs = require('querystring');
		var data = {
			s : keyword,
			start : start,
			end: end
		};
		var content = qs.stringify(data);
		var http_request = {
			hostname : 'dushu.xiaomi.com',
			port : 80,
			// 接口路由位置
			path : '/store/v0/lib/query/onebox?' + content
		}
		req_obj = http.request(http_request, function(_res){
			var content = '';
			_res.setEncoding('utf8');
			_res.on('data',function(chunk){
				content += chunk;
			});
			_res.on('end',function(){
				cb(null,content);
			});
		});
		req_obj.on('error',function(){

		})
		req_obj.end();

	}
}