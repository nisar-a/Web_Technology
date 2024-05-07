var http = require('http');
var querystring = require('querystring');

http.createServer(function (req, res) {
    var data1 = '';

    req.on('data', function (chunk) {
        data1 += chunk;
    });

    req.on('end', function () {
        var qs = querystring.parse(data1);
        var name = qs['name'];
        var email = qs['mail'];
        var gender = qs['gender'];
        var address = qs['address'];
        var mobile = qs['number'];
        var state = qs['State'];
        var agree = qs['checkbox']; 
        var responseHtml = `
            <html>
            <head>
                <title>User Information</title>
            </head>
            <body>
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
                        <td>Email</td>
                        <td>${email}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>${gender}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>${address}</td>
                    </tr>
                    <tr>
                        <td>Mobile No.</td>
                        <td>${mobile}</td>
                    </tr>
                    <tr>
                        <td>State</td>
                        <td>${state}</td>
                    </tr>
                    <tr>
                        <td>Agreed</td>
                        <td>${agree}</td>
                    </tr>
                </table>
            </body>
            </html>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(responseHtml);
        res.end();
    });
}).listen(7777);

console.log('Server is running on port 7777');
