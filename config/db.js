const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "SYSTEM",
  password: "pwdrnpc71", // Change this to your MySQL password
  database: "keploy_api_db"
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
