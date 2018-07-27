const ChutesAndLadders = require('./utils/chutes_and_ladders');

const questionTwo = new ChutesAndLadders();
let sum = 0;

// The summation of all the rolls returned
questionTwo.initBoard(rolls => sum = sum + rolls);
console.log('\x1b[33m', `The sum of the minimum number of rolls required to win on each solvable board is: ${sum}`, '\x1b[0m');