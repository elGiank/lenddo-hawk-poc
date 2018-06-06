const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : process.env.DB_HOST      || 'lenddo-test.mysql.database.azure.com',
    user     : process.env.DB_USER      || 'lenddo@lenddo-test',
    password : process.env.DB_PASSWORD  || 'Lendo123',
    database : process.env.DB_NAME      || 'lenddo'
});

connection.connect((err) => {
    if (err) {
        console.error('error connecting to database: ' + err.stack);
        return;
    }
    keepAlive();
});

function keepAlive() {
    setInterval(() => {
        connection.ping();
    }, 110 * 1000);
}

module.exports = connection;