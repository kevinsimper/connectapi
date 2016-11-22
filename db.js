var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('test.db');


// Database initialization
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='bookmarks'",
    function(err, rows) {
        if (err !== null) {
            console.log(err);
        } else if (rows === undefined) {
            db.run('CREATE TABLE "cars" ' +
                '("id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                '"name" VARCHAR(255), ' +
                '"year" INTEGER, ' +
                '"driven" VARCHAR(255))',
                function(err) {
                    if (err !== null) {
                        console.log(err);
                    } else {
                        console.log("SQL Table 'cars' initialized.");
                    }
                });
        } else {
            console.log("SQL Table 'cars' already initialized.");
        }
    });


module.exports = db;
