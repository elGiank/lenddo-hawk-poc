const db = require('./db');

class LenddoQueue {
    constructor(dni, score) {
        this.dni = dni;
        this.score = score;
    }

    save() {
        //change this function to return a promise or set this as an await/async function

        let sql = 'INSERT INTO lenddoqueue SET ?';
        let data = {dni: this.dni, score: this.score};

        db.query(sql, data, handleSaveResult);

        return true;
    }
}

function handleSaveResult(error, results, fields) {
    if (error) throw error;
    console.log('saved ' + results.affectedRows + ' rows');
}

module.exports = LenddoQueue;