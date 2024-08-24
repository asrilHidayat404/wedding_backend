import db from '../db-connection/db.js'

export function updateState(req, res) {
    const {state, data, id_komentar} = req.query
    const datas = {state, data, id_komentar}
    console.log(state, data, id_komentar)
    const query = `UPDATE komentar SET ${state} = ${data} WHERE id_komentar = ${id_komentar}`
    console.log(query)
    db.query(query, (err, result) => {
        if (err) throw err
        console.log(result)
        res.json(
            {
                success: result.message,
                datas: datas
            }
        )
    })
}