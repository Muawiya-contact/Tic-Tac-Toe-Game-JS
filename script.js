const frame1 = document.getElementById('frame1');
const frame2 = document.getElementById('frame2');
const gameBoard = document.getElementById('gameBoard');
const winnerDisplay = document.getElementById('winner');
const resetBtn = document.getElementById('resetBtn');
const startModeBtn = document.getElementById('startModeBtn');
const startGameBtn = document.getElementById('startGameBtn');
const gameModeSelect = document.getElementById('gameMode');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');

let currentPlayer = 'X';
let gameBoardArray = ['', '', '', '', '', '', '', '', ''];
let playerXName = '';
let playerOName = '';
let gameMode = 'playerVsPlayer'; // Default to player vs player

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Move to frame 2 when game mode is selected
startModeBtn.addEventListener('click', () => {
    gameMode = gameModeSelect.value;
    frame1.classList.remove('active');
    frame2.classList.add('active');
});

// Start the game after names are entered
startGameBtn.addEventListener('click', () => {
    playerXName = playerXInput.value || 'Player 1';
    playerOName = playerOInput.value || 'Player 2';

    if (!playerXName || !playerOName) {
        alert('Please enter names for both players.');
        return;
    }

    resetGame();
    frame2.classList.remove('active');
    gameBoard.style.display = 'grid';
    resetBtn.style.display = 'block';
});

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoardArray[a] && gameBoardArray[a] === gameBoardArray[b] && gameBoardArray[a] === gameBoardArray[c]) {
            return gameBoardArray[a];
        }
    }
    return null;
}

function handleClick(index) {
    if (gameBoardArray[index]) return;
    gameBoardArray[index] = currentPlayer;
    const cell = document.getElementById('cell-' + index);
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    const winner = checkWinner();
    if (winner) {
        winnerDisplay.textContent = `${currentPlayer === 'X' ? playerXName : playerOName} Wins!`;
        winnerDisplay.style.display = 'block';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (gameMode === 'playerVsComputer' && currentPlayer === 'O') {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let emptyCells = gameBoardArray.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    handleClick(randomCell);
}

function createBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = 'cell-' + i;
        cell.addEventListener('click', () => handleClick(i));
        gameBoard.appendChild(cell);
    }
}

resetBtn.addEventListener('click', () => resetGame());

function resetGame() {
    gameBoardArray = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    winnerDisplay.textContent = '';
    winnerDisplay.style.display = 'none';
    createBoard();
}

createBoard();
