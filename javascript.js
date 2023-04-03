/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
let round = 0;

const Player = (token) => {
    this.token = token;
    const getToken = () => token;
    return { getToken };
};

const gameController = (() => {
    const _playerOne = Player('X');
    const _playerTwo = Player('O');

    // prettier-ignore
    const getActivePlayerToken = () => round % 2 === 0 ? _playerOne.getToken() : _playerTwo.getToken();

    const playRound = (row, column) => {
        if (row > 2 || column > 2) return console.log('Invalid Entry');
        if (round > 9) return;
        gameBoard.dropToken(row, column, getActivePlayerToken());
    };

    return { playRound, getActivePlayerToken };
})();

const displayController = (() => {
    const playerTurnDisplay = document.querySelector('#player-turn');
    const htmlBoard = Array.from(document.querySelectorAll('button.pad'));

    const updatePlayerTurnDisplay = () => {
        if (round === 9) {
            console.log("It's a Draw!");
            playerTurnDisplay.innerText = "It's a Draw!";
            return round++;
        }

        console.log(`${gameController.getActivePlayerToken()}'s Turn`);
        playerTurnDisplay.innerText = `${gameController.getActivePlayerToken()}'s Turn`;
    };

    return { updatePlayerTurnDisplay };
})();

const gameBoard = (() => {
    const row = 3;
    const column = row;
    const _board = [];
    let _win = false;

    for (let i = 0; i < row; i++) {
        _board[i] = [];

        for (let j = 0; j < column; j++) {
            _board[i].push(0);
        }
    }

    const _checkRows = (board) => {
        for (const row of board) {
            if (
                row.every((val) => val === 'X') ||
                row.every((val) => val === 'O')
            ) {
                return true;
            }
        }
        return false;
    };

    const _checkColumns = (board) => {
        const numRows = board.length;
        const numColumns = board[0].length;

        for (let i = 0; i < numColumns; i++) {
            const column = [];
            for (let j = 0; j < numRows; j++) {
                column.push(board[j][i]);
            }
            if (
                column.every((val) => val === 'X') ||
                column.every((val) => val === 'O')
            ) {
                return true;
            }
        }
        return false;
    };

    const _checkDiagonals = (board) => {
        const diagonal1 = [board[0][0], board[1][1], board[2][2]];
        const diagonal2 = [board[0][2], board[1][1], board[2][0]];

        if (
            diagonal1.every((val) => val === 'X') ||
            diagonal1.every((val) => val === 'O')
        ) {
            return true;
        }
        if (
            diagonal2.every((val) => val === 'X') ||
            diagonal2.every((val) => val === 'O')
        ) {
            return true;
        }
        return false;
    };

    const _checkForWin = (board) => {
        // prettier-ignore
        if (_checkRows(board) || _checkColumns(board) || _checkDiagonals(board)) {
            _win = true;
            console.log(`${gameController.getActivePlayerToken()} Wins!`);
            return true;
        }
        return false;
    };

    const dropToken = (row, column, playerToken) => {
        if (_win) return;

        if (_board[row][column] !== 0) {
            console.log('Spot Already Taken');
            return console.log(_board);
        }

        _board[row][column] = playerToken;

        _checkForWin(_board);

        console.log(_board);

        round++;

        if (_win) return;

        displayController.updatePlayerTurnDisplay();
    };

    console.log(_board);
    displayController.updatePlayerTurnDisplay();

    return { dropToken };
})();
