const ChutesAndLadders = require('./utils/chutes_and_ladders');

const questionOne = new ChutesAndLadders();
let totalNum = 0;

// A board is considered to be unsolvable if the rolls returned equals 0
questionOne.initBoard(rolls => {
    if (rolls === 0) {
        totalNum++;
    }
});
console.log('\x1b[33m', `The total number of unsolvable boards in chutes_and_ladders.txt is: ${totalNum}`, '\x1b[0m');