const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'lenddo-test.mysql.database.azure.com',
    user     : 'lenddo@lenddo-test',
    password : 'Lendo123',
    database : 'lenddo'
});

module.exports = db;