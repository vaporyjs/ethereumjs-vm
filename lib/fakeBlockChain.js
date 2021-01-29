var utils = require('vaporyjs-util')

module.exports = {
  getBlock: function (n, cb) {
    var hash = utils.sha3(Buffer.from(utils.bufferToInt(n).toString()))

    var block = {
      hash: function () {
        return hash
      }
    }

    cb(null, block)
  }
}
