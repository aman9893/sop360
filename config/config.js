var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'shopCart360',
    multipleStatements: true
});
connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log(err);
        console.log("Error while connecting with database");
    }
});

module.exports = connection;
