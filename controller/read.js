import { configDotenv } from "dotenv";
import db from "../db-connection/db.js"

export function Komentar (req, res) {
    const query = `SELECT * FROM komentar left join tamu on komentar.id_tb_tamu = tamu.id_tamu ORDER BY tgl_komen`;
    db.query(query, (err, result) => {
        if (err) throw err;
        return res.send({komentar: result})
    })
}

export function Tamu (req, res) {
    const nama = req.query.username
    const password = req.query.password
    const query = `SELECT * FROM tamu WHERE nama = '${nama}' AND tglLahir = '${password}'`;
    db.query(query, (err, result) => {
        if (err) throw err;
        return res.send({
            success: result.length ? true : false,
            message: result.length ? 'Tamu terdaftar' : 'Tamu tidak terdaftar',
            result: result
        });
    })
}

export function getUsername (req, res) {
    const username = req.query.username
    console.log(username)
    const query = `SELECT * FROM tamu WHERE id_tamu = ${username}`
    db.query(query, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
}


export function allGuests (req, res) {
    db.query("SELECT * FROM tamu", (err, result) => {
        if (err) throw err
        res.json({success: true, datas: result})
    })
}

export function sudoLogin (req, res) {
    const username = req.query.username;
    const password = req.query.password;
    if (!username || !password) {
        return res.json({
            status: false,
            message: "Username and password are required"
        });
    }
    console.log(username, password)
    const query = `SELECT * FROM admin WHERE username = "${username}" AND password = "${password}"`
    db.query(query, (err, result) => {
        if (err) throw err
        console.log(result)
        if (!result.length) {
            res.json(
                {
                    status: false,
                    message: "Invalid username or password"
                }
            )
        } else {
            res.json(
                {
                    status: true,
                    datas: [username, password]
                }
            )
        }
    })
}