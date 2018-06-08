class LenddoQueue {
    constructor(dni, score) {
        this.dni_encrypted = dni;
        this.score = score;
    }
}

class LenddoQueueRepository {
    constructor(db) {
        this.db = db;
    }

    save(lenddoQueue) {
        let sql = 'INSERT INTO lenddo_queue SET ?';
        let data = lenddoQueue || {};

        return new Promise((resolve, reject) => {
            this.db.query(sql, data, (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows > 0);
            });
        });
    }
}

module.exports = {LenddoQueue, LenddoQueueRepository};