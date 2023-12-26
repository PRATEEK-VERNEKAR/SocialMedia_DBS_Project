const mysql = require('mysql');


const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1:3306",
  user: "root",
  password: "",
  database: "SocialMediaApplication",
});

module.exports  = pool;