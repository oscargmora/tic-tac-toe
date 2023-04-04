/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
let round = 0;
let win = false;

const Player = (token) => {
    this.token = token;
    const getToken = () => token;
    return { getToken };
};

const gameController = (() => {
    const _playerOne = Player('X');
    const _playerTwo = Player('O');

    const getActivePlayerToken = () => (round % 2 === 0 ? _playerOne.getToken() : _playerTwo.getToken());

    const playRound = (row, column) => {
        if (row > 2 || column > 2) return;
        if (round > 9) return;
        gameBoard.dropToken(row, column, getActivePlayerToken());
    };

    return { playRound, getActivePlayerToken };
})();

const displayController = (() => {
    const _playerTurnDisplay = document.querySelector('#player-turn');
    const _btn0 = document.getElementById('btn0');
    const _btn1 = document.getElementById('btn1');
    const _btn2 = document.getElementById('btn2');
    const _btn3 = document.getElementById('btn3');
    const _btn4 = document.getElementById('btn4');
    const _btn5 = document.getElementById('btn5');
    const _btn6 = document.getElementById('btn6');
    const _btn7 = document.getElementById('btn7');
    const _btn8 = document.getElementById('btn8');

    const _btnArray = [_btn0, _btn1, _btn2, _btn3, _btn4, _btn5, _btn6, _btn7, _btn8];

    const updateGameButtons = (board) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const value = board[i][j];
                const button = _btnArray[i * board[i].length + j];
                button.innerHTML = value;
            }
        }
    };

    const updatePlayerTurnDisplay = () => {
        if (win === true) {
            _playerTurnDisplay.innerText = `${gameController.getActivePlayerToken()} Wins!`;
            return;
        }
        if (round === 9) {
            _playerTurnDisplay.innerText = "It's a Draw!";
            return round++;
        }

        _playerTurnDisplay.innerText = `${gameController.getActivePlayerToken()}'s Turn`;
    };

    return { updatePlayerTurnDisplay, updateGameButtons };
})();

const gameBoard = (() => {
    const _row = 3;
    const _column = _row;
    const board = [];

    // Create Array for Board
    for (let i = 0; i < _row; i++) {
        board[i] = [];
        for (let j = 0; j < _column; j++) {
            board[i].push('&nbsp;');
        }
    }

    const _checkRows = (board) => {
        for (const _row of board) {
            if (_row.every((val) => val === 'X') || _row.every((val) => val === 'O')) {
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
            if (column.every((val) => val === 'X') || column.every((val) => val === 'O')) {
                return true;
            }
        }
        return false;
    };

    const _checkDiagonals = (board) => {
        const diagonal1 = [board[0][0], board[1][1], board[2][2]];
        const diagonal2 = [board[0][2], board[1][1], board[2][0]];

        if (diagonal1.every((val) => val === 'X') || diagonal1.every((val) => val === 'O')) {
            return true;
        }
        if (diagonal2.every((val) => val === 'X') || diagonal2.every((val) => val === 'O')) {
            return true;
        }
        return false;
    };

    const _checkForWin = (board) => {
        if (_checkRows(board) || _checkColumns(board) || _checkDiagonals(board)) {
            win = true;
            displayController.updatePlayerTurnDisplay();
            return true;
        }
        return false;
    };

    const dropToken = (_row, _column, playerToken) => {
        if (win) return;

        if (board[_row][_column] !== '&nbsp;') {
            return;
        }

        board[_row][_column] = playerToken;

        _checkForWin(board);

        displayController.updateGameButtons(board);

        round++;

        if (win) return;

        displayController.updatePlayerTurnDisplay();
    };

    displayController.updatePlayerTurnDisplay();

    return { dropToken, board };
})();
