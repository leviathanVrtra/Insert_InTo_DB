const fetch = require("node-fetch");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test"
});

connection.connect(err => {
  if (err) {
    console.log("ERROR : ", err);
  } else {
    console.log("Connected to MySql....");
  }
});

const stmt = `insert into user (userId, id, title) values (?, ?, ?)`;

const url = "https://jsonplaceholder.typicode.com/albums";

fetch(url)
  .then(resp => resp.json())
  .then(Jobj => {
    for (var i = 0; i < Jobj.length; i++) {
      var { userId, id, title } = Jobj[i];
      const sql = [userId, id, title];
      connection.query(stmt, sql, (err, results, fields) => {
        if (err) {
          return console.error("ERROR : ", err.message);
        }
      });
    }
    connection.end();
  })
  .catch(err => {
    console.log("ERROR : ", err);
  });
