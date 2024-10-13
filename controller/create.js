import db from "../db-connection/db.js"
export function AddUserComment (req, res) {
    const data = req.body;
    const {user, comment} = data;
    console.log(data)
    const query = `INSERT INTO comments (guest_id, content, created_at) VALUES (${user}, '${comment}', now())`;
	console.log(user, comment)

    db.query(query, (err, result) => {
        if(err){
            throw err
        }
        res.send({success: true, data: result})
    })
}


export function AddCommentReaction(req, res) {
    const { guest_id, comment_id, reaction } = req.body;

    const checkQuery = `
        SELECT reaction FROM comment_reactions 
        WHERE guest_id = ? AND comment_id = ?;
    `;
    
    db.query(checkQuery, [guest_id, comment_id], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            // Jika reaksi sudah ada, cek reaksi saat ini
            const currentReaction = result[0].reaction;

            if (currentReaction === reaction) {
                // Jika reaksi yang diberikan sama, tidak melakukan apa-apa
                return res.send({ status: false, message: 'Reaction already exists' });
            } else {
                // Jika reaksi yang diberikan berbeda, update reaksi
                const updateQuery = `
                    UPDATE comment_reactions 
                    SET reaction = ? 
                    WHERE guest_id = ? AND comment_id = ?;
                `;
                db.query(updateQuery, [reaction, guest_id, comment_id], (err) => {
                    if (err) throw err;
                    return res.send({ status: true, message: 'Reaction updated' });
                });
            }
        } else {
            // Jika reaksi belum ada, insert
            const insertQuery = `
                INSERT INTO comment_reactions (guest_id, comment_id, reaction) 
                VALUES (?, ?, ?);
            `;
            db.query(insertQuery, [guest_id, comment_id, reaction], (err) => {
                if (err) throw err;
                return res.send({ status: true, message: 'Reaction added' });
            });
        }
    });
}


export function AddGuest (req, res) {
    const fullname = req.body.fullname
    const password = req.body.password
    console.log(req.body)
    if(!fullname || !password) {
        res.json(
            {
                success: false,
                message: "Please insert data",
                data: req.body
            }
        )
    } else {
        console.log(fullname, password)
        db.query(`INSERT INTO guests (fullname, password) values ("${fullname}", "${password}")`, (err, result) => {
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