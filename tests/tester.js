var vapTests = require('vaporyjs-testing').tests;
var test = require('tape');
var cp = require('child_process');
var vt = require('vaporyjs-testing/tests/GeneralStateTests/stRefundTest/refund50_1.json');
//console.log(vt);
test('executable test', function (t) {
  /*var stateTest = {
    'randomTest': vapTests.GeneralStateTests.stRefundTest.refund50_1
  };*/
  /*var stateTest = {
    'randomTest': vt
  };
  var ejt = cp.spawn(__dirname + '/tester', ['-r', JSON.stringify(stateTest)]);
  ejt.stderr.on('data', function (d) {
    t.fail(d.toString());
  });

  ejt.stdout.on('data', function (data) {
    t.equal(data.toString(), '0', 'should not error');
  });

  ejt.on('close', function () {
    t.end();
  });*/
  t.end();
});
