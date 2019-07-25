var http = require('http');
var urlParse = require('url');
const util = require('util');

let parsedData = String

//function httpServer(dataStuff) {

    

//}

http.get('http://jsonplaceholder.typicode.com/posts', (res) => {

    const { statusCode } = res;
    const contentType = res.headers['content-type'];
    
    let error;
    if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk});
    res.on('end', () => {
        try {
            parsedData = JSON.parse(rawData);
            console.log(parsedData);     
        }catch (e) {
            console.error(e.message);
        }
    });

}).on('error', (e) => {
    console.log(`Error: ${e.message}`);
});

//httpServer(parsedData)

http.createServer(function (req,res) {

    console.log(req.url);
    console.log(util.inspect(urlParse.parse(req.url, true).query));

    if (req = '/') {
        console.log('accessed')
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<h5> ${JSON.stringify(parsedData)} <h5>`);
        res.end()
    }

}).listen('2222');

