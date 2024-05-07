const http = require('http');
const url = require('url');
const querystring = require('querystring');

function onRequest(request, response) {
    const path = url.parse(request.url).pathname;
    console.log('Request for ' + path + ' requested');

    const query = url.parse(request.url).query;
    console.log(query);

    const name = querystring.parse(query)['name'];
    const mail = querystring.parse(query)['mail'];
    const gen = querystring.parse(query)['gender'];
    const address = querystring.parse(query)['address'];
    const no = querystring.parse(query)['number'];
    const state = querystring.parse(query)['State'];
    const cb = querystring.parse(query)['checkbox'];

    response.writeHead(200, { 'Content-Type': 'text/html' });

    response.write(`
        <html>
        <head>
            <title>User Information</title>
        </head>
        <body>
            <center>
            <h1>User Information</h1>
            <table border="1">
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>${name}</td>
                </tr>
                <tr>
                    <td>Mail</td>
                    <td>${mail}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>${gen}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>${address}</td>
                </tr>
                <tr>
                    <td>Mobile Number</td>
                    <td>${no}</td>
                </tr>
                <tr>
                    <td>State</td>
                    <td>${state}</td>
                </tr>
                <tr> 
                    <td>Checkbox (Agree)</td>
                    <td>${cb}</td>
                </tr>
            </table>
        </body>
        </html>
    `);

    response.end();
}

http.createServer(onRequest).listen(8000);
console.log('Server is started');
