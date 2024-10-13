import { configDotenv } from "dotenv";
import db from "../db-connection/db.js"

export function Comments (req, res) {
    const query = `
    SELECT comments.id AS comment_id, comments.content, guests.fullname, 
        SUM(CASE WHEN comment_reactions.reaction = 1 THEN 1 ELSE 0 END) AS likes,
        SUM(CASE WHEN comment_reactions.reaction = -1 THEN 1 ELSE 0 END) AS dislikes
    FROM comments
    LEFT JOIN guests ON comments.guest_id = guests.id
    LEFT JOIN comment_reactions ON comments.id = comment_reactions.comment_id
    GROUP BY comments.id
    ORDER BY comments.created_at;
`;
    db.query(query, (err, result) => {
        if (err) throw err;
        return res.send({
            status: true,
            usersComments: result
        })
    })
}

export function Tamu (req, res) {
    const nama = req.query.username
    const password = req.query.password
    const query = `SELECT * FROM guests WHERE fullname = '${nama}' AND password = '${password}'`;
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
    const username = req.query.username;
    const query = `SELECT * FROM guests WHERE id = ${username}`
    db.query(query, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
}


export function Guests (req, res) {
    db.query("SELECT * FROM guests", (err, result) => {
        if (err) throw err
        res.json({success: true, datas: result})
    })
}

export function SudoLogin (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.json({
            status: false,
            message: "Username and password are required"
        });
    }
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
                    message: `Welcome, ${username}`,
                    datas: [username, password]
                }
            )
        }
    })
}
