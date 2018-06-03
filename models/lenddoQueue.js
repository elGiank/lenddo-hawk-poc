const db = require('./db');

class LenddoQueue {
    constructor(dni, score) {
        this.dni = dni;
        this.score = score;
    }

    save() {
        let sql = 'INSERT INTO lenddoqueue SET ?';
        let data = {dni: this.dni, score: this.score};

        return new Promise((resolve, reject) => {
            db.query(sql, data, (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows > 0 ? true : false);
            });
        });
    }
}

module.exports = LenddoQueue;