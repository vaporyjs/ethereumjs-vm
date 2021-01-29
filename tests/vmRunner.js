var async = require('async')
var VM = require('../index')
var Account = require('vaporyjs-account')
var testUtil = require('./util')
var Trie = require('@vaporyjs/merkle-patricia-tree/secure')
var vapUtil = require('vaporyjs-util')
var BN = vapUtil.BN

module.exports = function runStateTest (options, testData, t, cb) {
  var sstream = false
  var state = new Trie()
  var results
  var account

  async.series([
    function (done) {
      var acctData = testData.pre[testData.exec.address]
      account = new Account()
      account.nonce = testUtil.format(acctData.nonce)
      account.balance = testUtil.format(acctData.balance)
      testUtil.setupPreConditions(state, testData, done)
    },
    function (done) {
      state.get(Buffer.from(testData.exec.address, 'hex'), function (err, data) {
        var a = new Account(data)
        account.stateRoot = a.stateRoot
        // console.log(account.toJSON(true))
        done(err)
      })
    },
    function (done) {
      var block = testUtil.makeBlockFromEnv(testData.env)
      var vm = new VM(state)
      var runCodeData = testUtil.makeRunCodeData(testData.exec, account, block)

      if (options.vmtrace) {
        sstream = testUtil.enableVMtracing(vm, options.vmtrace)
      }

      vm.runCode(runCodeData, function (err, r) {
        if (r) {
          results = r
        }
        done(err)
      })
    },
    function (done) {
      if (sstream) {
        sstream.push(null)
      }

      if (testData.out.slice(2)) {
        t.equal(results.return.toString('hex'), testData.out.slice(2), 'valid return value')
      }

      if (testData.log && testData.logs.length !== 0) {
        testUtil.verifyLogs(results.logs, testData, t)
      }

      if (testData.gas && !results.exceptionError) {
        t.equal(results.gas.toString(), new BN(testUtil.format(testData.gas)).toString(), 'valid gas usage')
      } else {
        // OOG
        t.equal(results.gasUsed.toString(), new BN(testUtil.format(testData.exec.gas)).toString(), 'valid gas usage')
      }

      done()
    }
  ], cb)
}
