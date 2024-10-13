import express from "express";
import bodyParser from "body-parser"
import db from "./db-connection/db.js"
import cors from "cors"
import dotenv from "dotenv";
import {Guests, Comments, Tamu, SudoLogin} from "./controller/read.js";
import { AddCommentReaction, AddUserComment, AddGuest  } from "./controller/create.js";
import { DropGuest } from "./controller/delete.js";

const app = express();


dotenv.config()

app.use(
    cors({
      credentials: true,
      origin: 'https://e-wedding-invitation-three.vercel.app',
    })
  );
  
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())

app.get("/", (req, res) => res.send("hello"))
app.get("/guests", Tamu)
app.get("/all-guests", Guests)
app.post("/add-guest", AddGuest)
app.post("/drop-guest", DropGuest)
app.get("/users-comments", Comments)
app.post("/add-user-comment", AddUserComment)
app.post("/add-comment-reaction", AddCommentReaction);
app.post("/sudo-login", SudoLogin)



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
