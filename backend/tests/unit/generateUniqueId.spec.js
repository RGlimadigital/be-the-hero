const uniqueId = require('../../src/utils/generateUniqId')

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = uniqueId()

        expect(id).toHaveLength(8)

    })
})