const mysql = require('mysql');

const connection = mysql.createPool({
    connectionLimit : 3,
    host     : process.env.DB_HOST      || 'lenddo-test.mysql.database.azure.com',
    user     : process.env.DB_USER      || 'lenddo@lenddo-test',
    password : process.env.DB_PASSWORD  || 'Lendo123',
    database : process.env.DB_NAME      || 'lenddo'
});

module.exports = connection;