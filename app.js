var server = require('./server');
var router = require('./router');
var handler = require('./handler');

var handle = {};
handle["/"] = handler.home;
handle['/home'] = handler.home;
handle['/review'] = handler.review;
handle['/api/v1/records'] = handler.api_records;

server.startServer(router.route, handle);


// const { URL } = require('url');
// const myURL =
//   new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
// console.log(myURL);