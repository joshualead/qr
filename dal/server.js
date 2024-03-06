var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "sql.freedb.tech",
  user: "freedb_newuser",
  password: "UBryy&AEN7YdCkc",
  database: "freedb_QrTable",
  port: 3306
});

const connectionPromise = new Promise((res, rej) => {
  res();
  rej();
});

const createTable = () => {
  con.connect(function (err) {
    if (err) {
      con.destroy();
      createTable();
      throw err;
    };
    console.log("Connected!");
    var sql = `CREATE TABLE IF NOT EXISTS Persons ( PersonID varchar(30) PRIMARY KEY, Name varchar(255) NOT NULL UNIQUE, Score int default (0));`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
      return;
    });
  });
}

createTable();

const dal = {
  addScore: (uid, callback) => {
    connectionPromise
      .then(() => {
        con.query(`UPDATE Persons SET Score += 1 WHERE PersonID = ?`, uid, callback);
      })
      .catch((err) => {
        callback(err);
        con.destroy();
        con.connect(function (err) {
          if (err) {
            throw err
          };
          console.log("Connected!");
          this.addScore(uid, callback);
        });
      });
  },
  addPerson: (list, callback) => {
    connectionPromise
      .then(() => {
        con.query(`INSERT INTO Persons (PersonID, Name) VALUES (?,?)`, list, callback);
      })
      .catch((err) => {
        callback(err);
        con.destroy();
        con.connect(function (err) {
          if (err) {
            throw err
          };
          console.log("Connected!");
          this.addPerson(list, callback);
        });
      });
  },
  all: (callback) => {
    connectionPromise
      .then(() => {
        con.query(`SELECT * FROM Persons`, callback);
      })
      .catch((err) => {
        callback(err);
        con.destroy();
        con.connect(function (err) {
          if (err) {
            throw err
          };
          console.log("Connected!");
          this.all(callback);
        });
      });
  },
};

module.exports = dal;
