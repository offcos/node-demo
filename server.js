var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');


function startServer(route, handle) {
    var onRequest = function(request, response) {
        
        var pathname = url.parse(request.url).pathname;
        console.log('Request received ' + pathname);
        var data = '';
        request.on('data', function(chunk){
            data += chunk;
        }).on('error', function(err){
            console.error(err);
        }).on('end', function(){
            if(request.method === "POST"){
                if (data.length > 1e6) {
                    request.connection.destroy();
                }
                route(handle, request.url, response, querystring.parse(data));
            }else {
                var params = url.parse(request.url, true).query;
                route(handle, pathname, response, params);
            }
            
        });
        
    }

    var server = http.createServer(onRequest);

    server.listen(8000, '127.0.0.1');
    console.log('Server started on localhost port 8000');
}

module.exports.startServer = startServer;





// var events = require('events');
// var util = require('util');
// var fs = require('fs');

// var readStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
// var writeStream = fs.createWriteStream(__dirname + '/writeStream.txt');

// readStream.pipe(writeStream);


// var data = 'hello world here you are';
// writeStream.write(data, 'utf8');
// writeStream.end();
// writeStream.on('finished', function(){
//     console.log('write data finished!')
// })


// readStream.on('data', 'utf8', function(chunk){
//     writeSteam.write(chunk);
// });


// readStream.setEncoding('utf8');

// var data = '';

// readStream.on('data', function(chunk){
//     data += chunk;
//     console.log(chunk);
// });

// readStream.on('end', function(){
//     console.log(data);
// })



// fs.mkdir('stuff', function(){
//     fs.readFile('readMe.txt', 'utf8', function(err, data) {
//         fs.writeFile('./stuff/writeMe.txt', data, function() {
//             console.log('copy successfully!');
//         })
//     })
// });


// fs.unlink('writeMe.txt', (err) => {
//     if (err) {
//         console.log(err.stack);
//     }
//     console.log('file has been deleted!');
// })


// var readMe = fs.readFile('readMe.txt', 'utf8', function(err, data){
    
//     fs.writeFile('writeMe.txt', data, function(){
//         console.log('write finished!');
//     })
    
//     console.log(data);
    
// });

// console.log('finished!');

// var readMe = fs.readFileSync('readMe.txt', 'utf8');

// fs.writeFileSync('writeMe.txt', readMe)



// var count = require('./count');

// console.log(count.counter(['html', 'css', 'js']));


// eventEmitter.on('someevent', function(message) {
//     console.log(message);
// })

// eventEmitter.emit('someevent' ,'hello world') //手动触发时间



// var Person = function(name) {
//     this.name = name
// };

// util.inherits(Person, events.EventEmitter);

// var xiaoming = new Person();
// var lilei = new Person();
// var hanmeimei = new Person();

// Persons = [xiaoming, lilei, hanmeimei];

// Persons.forEach(person => {
//     person.on('speak', function(message) {
//         console.log(person.name + ' says: ' + message);    
//     })
// });

// xiaoming.emit('speak', 'hello !');
// lilei.emit('speak', 'what u doing?');
// hanmeimei.emit('speak', 'See you tomorrow.')