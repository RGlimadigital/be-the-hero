const crypto = require('crypto')

module.exports = function generateUniqId() {
    return crypto.randomBytes(4).toString('HEX')
}
