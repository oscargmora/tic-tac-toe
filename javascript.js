const gameBoard = (() => {
    const row = 3;
    const column = row;
    const _board = [];
    
    for (let i = 0; i < row; i++) {
        _board[i] = [];
        for (let j = 0; j < column; j++) {
            _board[i].push(0);
        };
    };
    
    const dropToken = (row, column, playerToken) => {
        _board[row][column] = playerToken;
        console.log(_board);
    }
    
    const displayBoard = () => _board;
    
    console.log(_board);
    return {dropToken};
})();
  
  
  
  
const Player = (token) => {
    this.token = token;
    const getToken = () => {return token};
    return {getToken};
};
  
  
  
const gameController = (() => {
    const playerOne = Player('X');
    const playerTwo = Player('O');
    
    const playRound = (row, column) => {
        gameBoard.dropToken(row, column, playerOne.getToken());
    }
    
    return {
        playRound
    }
})();