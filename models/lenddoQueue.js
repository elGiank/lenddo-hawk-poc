const db = require('./connection');

class LenddoQueue {
    constructor(dni, score) {
        this.dni = dni;
        this.score = score;
    }

    save() {
        let sql = 'INSERT INTO lenddo_queue SET ?';
        let data = {dni_encrypted: this.dni, score: this.score};

        return new Promise((resolve, reject) => {
            db.query(sql, data, (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows > 0);
            });
        });
    }
}

module.exports = LenddoQueue;