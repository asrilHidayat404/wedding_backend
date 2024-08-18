import db from "../db-connection/db.js"
export function AddUserComment (req, res) {
    const data = req.body;
    const {user, comment} = data;
	console.log(user, comment)
    const query = `INSERT INTO KOMENTAR VALUES ('${user}', '${comment}', now())`;

    db.query(query, (err, result) => {
        if(err){
            throw err
        }
        res.send({success: true, data: result})
    })
}