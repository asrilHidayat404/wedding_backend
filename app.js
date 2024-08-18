import express from "express";
import bodyParser from "body-parser"
import db from "./db-connection/db.js"
import cors from "cors"
import dotenv from "dotenv";
import {Komentar, Tamu} from "./controller/read.js";
import { AddUserComment } from "./controller/create.js";

const app = express();


dotenv.config()

app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_SERVER
    })
  );
  
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())


app.get("/tamu", Tamu)
app.get("/users-comments", Komentar)
app.post("/add-user-comment", AddUserComment)


app.listen(process.env.APP_PORT, () => {
    console.log(`App is running on port ${process.env.APP_PORT}`);
    // Membuka koneksi
    db.connect((err) => {
        if (err) {
            console.error('Koneksi database gagal: ', err);
            return;
        }
        console.log('Terhubung ke database MySQL');
    });
});
