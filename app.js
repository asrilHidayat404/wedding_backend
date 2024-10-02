import express from "express";
import bodyParser from "body-parser"
import db from "./db-connection/db.js"
import cors from "cors"
import dotenv from "dotenv";
import {allGuests, Comments, Tamu} from "./controller/read.js";
import { AddCommentReaction, AddUserComment } from "./controller/create.js";

const app = express();


dotenv.config()

app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:5173', `${process.env.APP_FRONTEND_SERVER}`]
    })
  );
  
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())

app.get("/", (req, res) => res.send("hello"))
app.get("/guests", Tamu)
app.get("/all-guests", allGuests)
app.get("/users-comments", Comments)
app.post("/add-user-comment", AddUserComment)
app.post("/add-comment-reaction", AddCommentReaction);



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
