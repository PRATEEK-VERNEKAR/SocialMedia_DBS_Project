const mysql = require('mysql');


const pool = mysql.createPool({
  connectionLimit: 5000,
  host: "localhost",
  user: "root",
  password: "",
  database: "Jan1SocialMedia"
});


module.exports  = pool;