// Konfigurasi koneksi ke database
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config()

const connection = mysql.createConnection({
  host: process.env.APP_DB_HOST,
  user: process.env.APP_DB_USERNAME,
  password: process.env.APP_DB_PASSWORD,
  database: process.env.APP_DB_NAME
});

export default connection