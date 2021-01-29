var genesisData = require('vaporyjs-testing/tests/BasicTests/genesishashestest.json');
var tape = require('tape');
var VM = require('../index.js');

var vm = new VM();

tape('[Common]: genesis hashes tests', function (t) {
  t.test('should generate the genesis state correctly', function (st) {
    vm.stateManager.generateCanonicalGenesis(function () {
      st.equal(vm.trie.root.toString('hex'), genesisData.genesis_state_root);
      st.end();
    })
  })
})
