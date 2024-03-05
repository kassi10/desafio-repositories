const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('Kassi A. Pegoraro')`;
connection.query(sql);
let global_result = null;

var test = connection.query("SELECT * FROM people", function (err, result, fields) {
  if (err) throw err;
  global_result = result;
});

connection.end();

app.get("/", (req, res) => {
 
  let html_string = '<h1>Full Cycle Rocks!</h1><br><ul>';
  
  console.log(test)
  for (let index = 0; index < global_result.length; index++) {
    const element = global_result[index];
    html_string = html_string + '<li>' + element.name + '</li><br>';
    
  }
  
  html_string = html_string + '</ul>';
  res.send(html_string)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
