const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/dataBase/connection')


describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('Should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "apad@gmail.com",
                whatsapp: "6669993331",
                city: "Goiânia",
                uf: "GO"
            })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})