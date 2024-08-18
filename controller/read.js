import db from "../db-connection/db.js"

export function Komentar (req, res) {
    const query = `SELECT * FROM komentar left join tamu on komentar.id = tamu.id ORDER BY tgl_komen`;
    db.query(query, (err, result) => {
        if (err) throw err;
        console.log(result)
        return res.send({komentar: result})
    })
}

export function Tamu (req, res) {
    const nama = req.query.username
    const password = req.query.password
    const query = `SELECT * FROM tamu WHERE nama = '${nama}' AND tglLahir = '${password}'`;
    db.query(query, (err, result) => {
        if (err) throw err;
        console.log(result)
        return res.send({
            success: result.length ? true : false,
            message: result.length ? 'Tamu terdaftar' : 'Tamu tidak terdaftar',
            result: result
        });
    })
}

