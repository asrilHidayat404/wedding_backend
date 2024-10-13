import db from "../db-connection/db.js"
export const DropGuest = (req, res) => {
    const id = req.body.id
    db.query(`delete from guests where id = ${id}`, (err, result) => {
        if (err) throw err
        res.json(
            {
                success: true,
                datas: result,
                message: "Success deleting data"
            }
        )
    })
}