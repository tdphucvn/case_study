const childProc = require("child_process");
const CHILD_PROCESSES = 20;
const URL = 'https://casestudynotepad.herokuapp.com/login';

(async () => {
  let times = [];
  let children = [];
  let table = [];

  class Child {
      constructor(childNum, duration){
        this.childNum = childNum;
        this.duration = duration;
      };
  };

  for (let i = 0; i < CHILD_PROCESSES; i++) {
    let childProcess = childProc.spawn("node", ["child.js", `--url=${URL}`])
    children.push(childProcess);
  }

  let responses = children.map(function wait(child, index) {
    return new Promise(function c(res) {
      child.stdout.on('data', (data) => {
        const chTb = new Child(index, parseInt(data));
        table.push(chTb);
        times.push(parseInt(data));
      });
      child.on("exit", function (code) {
        if (code === 0) {
          res(true);
        } else {
          res(false);
        }
      });
    });
  });

  responses = await Promise.all(responses);

  if (responses.filter(Boolean).length == responses.length) {
    const sum = times.reduce((a, b) => a + b, 0);
    const avg = (sum / times.length) || 0;
    console.table(table);
    console.log(`average: ${avg}`);
  } else {
    console.log("Test failed");
  }
})();

// ┌─────────┬──────────┬──────────┐
// │ (index) │ childNum │ duration │
// ├─────────┼──────────┼──────────┤
// │    0    │    3     │   302    │
// │    1    │    4     │   298    │
// │    2    │    2     │   377    │
// │    3    │    0     │   378    │
// │    4    │    1     │   433    │
// │    5    │    8     │   345    │
// │    6    │    6     │   328    │
// │    7    │    7     │   353    │
// │    8    │    11    │   296    │
// │    9    │    5     │   392    │
// │   10    │    10    │   332    │
// │   11    │    9     │   277    │
// │   12    │    17    │   267    │
// │   13    │    14    │   286    │
// │   14    │    13    │   265    │
// │   15    │    15    │   250    │
// │   16    │    12    │   244    │
// │   17    │    19    │   230    │
// │   18    │    18    │   378    │
// │   19    │    16    │   424    │
// └─────────┴──────────┴──────────┘
// average: 322.75