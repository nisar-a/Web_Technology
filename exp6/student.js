const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB();

async function onRequest(req, res) {
    const path = url.parse(req.url).pathname;
    console.log('Request for ' + path + ' received');

    const query = url.parse(req.url).query;
    const params = querystring.parse(query);
    const name = params["name"];
    const email = params["email"];
    const id = params["id"];
    const branch = params["branch"];
    const mobileNo = params["phno"];
    const gender = params["gender"];
    const branchadd = params["branchadd"];

    if (req.url.includes("/insert")) {
        await insertData(req, res, name, email, id, branch, mobileNo, gender, branchadd);
    } else if (req.url.includes("/delete")) {
        await deleteData(req, res, id);
    } else if (req.url.includes("/update")) {
        await updateData(req, res, id, mobileNo);
    } else if (req.url.includes("/display")) {
        await displayTable(req, res);
    }
}

async function insertData(req, res, name, email, id, branch, mobileNo, gender, branchadd) {
    try {
        const database = client.db('exp6');
        const collection = database.collection('employee');

        const employee = {
            name,
            email,
            id,
            branch,
            mobileNo,
            gender,
            branchadd
        };

        const result = await collection.insertOne(employee);
        console.log(`${result.insertedCount} document inserted`);
        const htmlResponse = `
            <html>
                <head>
                    <title>User Details</title>
                    <style>
                        table {
                            font-family: Arial, sans-serif;
                            border-collapse: collapse;
                            width: 50%;
                            margin: 20px auto;
                        }
                        td, th {
                            border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h2>User Details</h2>
                    <table>
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
                            <td>ID</td>
                            <td>${id}</td>
                        </tr>
                        <tr>
                            <td>Branch</td>
                            <td>${branch}</td>
                        </tr>
                        <tr>
                            <td>Mobile No</td>
                            <td>${mobileNo}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>${gender}</td>
                        </tr>
                        <tr>
                            <td>Branch Address</td>
                            <td>${branchadd}</td>
                        </tr>
                    </table>
                    <a href="/display">View Inserted Table</a>
                </body>
            </html>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(htmlResponse);
        res.end();
    } catch (error) {
        console.error('Error inserting data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function deleteData(req, res, id) {
    try {
        const database = client.db('exp6'); 
        const collection = database.collection('employee');
        const filter = { id: id };

        const result = await collection.deleteOne(filter);
        console.log(`${result.deletedCount} document deleted`);
        if (result.deletedCount === 1) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Document deleted successfully');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Document not found');
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function updateData(req, res, id, newPhoneno) {
    try {
        const database = client.db('exp6');
        const collection = database.collection('employee');
        const filter = { id: id };
        const updateDoc = {
            $set: { mobileNo: newPhoneno }
        };

        const result = await collection.updateOne(filter, updateDoc);
        console.log(`${result.modifiedCount} document updated`);
        if (result.modifiedCount === 1) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Phone number updated successfully');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Employee ID not found');
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function displayTable(req, res) {
    try {
        const database = client.db('exp6');
        const collection = database.collection('employee');

        const cursor = collection.find({});
        const employees = await cursor.toArray();
        let tableHtml = `
            <html>
                <head>
                    <title>Details</title>
                    <style>
                        table {
                            font-family: Arial, sans-serif;
                            border-collapse: collapse;
                            width: 100%;
                        }
                        th, td {
                            border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h2>Employee Details</h2>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>ID</th>
                            <th>Branch</th>
                            <th>Mobile No</th>
                            <th>Gender</th>
                            <th>Branch Address</th>
                        </tr>
        `;
        employees.forEach(employee => {
            tableHtml += `
                <tr>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.id}</td>
                    <td>${employee.branch}</td>
                    <td>${employee.mobileNo}</td>
                    <td>${employee.gender}</td>
                    <td>${employee.branchadd}</td>
                </tr>
            `;
        });
        tableHtml += `
                    </table>
                </body>
            </html>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(tableHtml);
        res.end();
    } catch (error) {
        console.error('Error displaying table:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}
http.createServer(onRequest).listen(7050);
console.log('Server is running on port 7050...');