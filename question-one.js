const ChutesAndLadders = require('./utils/chutes_and_ladders');

const questionOne = new ChutesAndLadders();
let totalNum = 0;
questionOne.initBoard(moves => {
    if (moves === 0) {
        totalNum++;
    }
});
console.log('\x1b[33m', `The total of ${totalNum} boards in chutes_and_ladders.txt are unsolvable`, '\x1b[0m');