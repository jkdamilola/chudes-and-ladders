const fs = require('fs');
const Queue = require('./queue');
const Vertex = require('./vertex');

class ChutesAndLadders {
    getMinRolls(board) {
        const size = board.length;
        // Create visited array for each cell
        const visited = new Array(size).fill(false);
        let lastRolls = 0;

        // start from position 0 (outside the board)
        const queue = new Queue();
        let vertex = new Vertex(0, 0);
        queue.push(vertex);

        // Bread-First Search from cell number 0
        do {
            // Pops the vertex in the beginning of the queue
            const { cell, rolls } = queue.pop();
            let currentVertex = null;
        
            // if we reach the last cell, break and return the last rolls.
            if (cell === (size - 1)) {
                lastRolls = rolls;
                break;
            }

            /*
                If not, then add the reachable adjacent cells from the current cells,
                since a fair die can be controlled and max value of 6 can be achieved.
                From the current cell, you can reach to next 6 cells, so add the next 6 cells
            */
            for (let i = cell; i < size && i <= cell + 6; i++) {
                // If the next cell doesn't have a ladder/snake
                if (board[i] === -1) {
                    // if the cell is not visited, visit, update the distance and add to the queue
                    if (!visited[i]) {
                        visited[i] = true;
                        currentVertex = new Vertex(i, rolls + 1);
                        queue.push(currentVertex);
                    }
                } else {
                    // if cell has a chute/ladder and it is not visited, visit, update the distance and add to the queue.
                    if (!visited[board[i]]) {
                        visited[board[i]] = true;
                        currentVertex = new Vertex(board[i], rolls + 1);
                        queue.push(currentVertex);
                    }
                }
            }
        } while (!queue.isEmpty());

        return lastRolls;
    }

    initBoard(callback) {
        // Get entries from the text file
        const txtEntries = fs.readFileSync('./chutes_and_ladders.txt').toString().split("\n");
        let position = 0, isNewBoard = true;
        let board, totalNumOfChutesAndLadders;

        txtEntries.forEach(entry => {
            // Ignore all the empty entries
            if (entry.length > 0) {
                entry = entry.split(' ');

                // If new board, create a new board
                if (isNewBoard) {
                    const size = entry[0] * entry[1];
                    board = new Array(size).fill(-1);
                    totalNumOfChutesAndLadders = parseInt(entry[2]);
                    isNewBoard = false;
                } else {
                    // If existing board, create necessary cells
                    position++;
                    const source = entry[1] - 1;
                    const destination = entry[2] - 1;
                    if (entry[0] === 'L') {
                        // Set the source and destination of Ladders
                        board[source] = destination;
                    }

                    if (entry[0] === 'C') {
                        // Set the source and destination of Chutes
                        board[destination] = source;
                    }
                }

                /*
                    If position equals total number of Chutes and Ladder,
                    create a new board, reset position and get minimum rolls.
                */
                if (position === totalNumOfChutesAndLadders) {
                    isNewBoard = true;
                    position = 0;
                    const moves = this.getMinRolls(board);
                    callback(moves);
                }
            }
        });
    }
}

module.exports = ChutesAndLadders;