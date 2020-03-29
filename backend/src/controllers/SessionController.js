const connection = require('../dataBase/connection')

module.exports = {
    async create(req, res) {
        const { id } = req.body

        const ongs = await connection('ongs').where('id', id)
            .select('name')
            .first()


        return !ongs ? res.status(400).json({ error: 'No ONG found with this ID' }) : res.json(ongs)

    }
}