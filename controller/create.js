import db from "../db-connection/db.js"
export function AddUserComment (req, res) {
    const data = req.body;
    const {user, comment} = data;
    console.log(data)
    const query = `INSERT INTO KOMENTAR (id_tb_tamu, komen, tgl_komen) VALUES (${user}, '${comment}', now())`;
	console.log(user, comment)

    db.query(query, (err, result) => {
        if(err){
            throw err
        }
        res.send({success: true, data: result})
    })
}

export function addGuest (req, res) {
    const username = req.query.username
    const password = req.query.password
    if(!username || !password) {
        res.json(
            {
                success: false,
                message: "Please insert data"
            }
        )
    } else {
        console.log(username, password)
        db.query(`INSERT INTO tamu (nama, tglLahir) values ("${username}", "${password}")`, (err, result) => {
            if (err) throw err
            res.json(
                {
                    success: true,
                    datas: result,
                    message: "Success inserting data"
                }
            )
        })
    }
}