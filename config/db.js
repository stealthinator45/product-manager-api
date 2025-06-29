const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "192.168.1.6",  // Use your Windows IP
  user: "SYSTEM",
  password: "pwdrnpc71", // Change this to your MySQL password
  database: "keploy_api_db",
  port: 3306
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
