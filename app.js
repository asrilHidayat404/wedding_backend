import express from "express";
import bodyParser from "body-parser"
import db from "./db-connection/db.js"
import cors from "cors"
import dotenv from "dotenv";
import {allGuests, getUsername, Komentar, sudoLogin, Tamu} from "./controller/read.js";
import { addGuest, AddUserComment } from "./controller/create.js";
import { updateState } from "./controller/update.js";

const app = express();


dotenv.config()

app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3300', `${process.env.FRONTEND_SERVER}`]
    })
  );
  
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())

app.get("/", (req, res) => res.send("hello"))
app.get("/tamu", Tamu)
app.get("/semua-tamu", allGuests)
app.get("/users-comments", Komentar)
app.get("/get-username", getUsername)
app.post("/super-user-login", sudoLogin)
app.post("/update-state", updateState)
app.post("/add-user-comment", AddUserComment)
app.post("/tambah-tamu", addGuest)


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
