const startBtn = document.querySelector('.main__start-btn');
const restartBtn = document.querySelector('.result__restart-btn');
const screens = document.querySelectorAll('.screen');
const playerOptions = document.querySelector('.game__options');
const computerChoiseElement = document.querySelector('.game__computer')?.querySelector('.game__option');
const playerScoreElement = document.querySelector('.player-score');
const computerScoreElement = document.querySelector('.computer-score');
const gameStatus = document.querySelector('.game__status');
const winner = document.querySelector('.result__winner');

const options = ['rock', 'paper', 'scissors'];

let playerScore = 0;
let computerScore = 0;

startBtn.addEventListener('click', event => startGame(event));
playerOptions.addEventListener('click', event => handleClick(event));
restartBtn.addEventListener('click', event => restartGame(event));

function changeScreen(index) {
    screens[index].classList.add('up');
}

function startGame(event) {
    event.preventDefault();
    changeScreen(0);
}

function handleClick(event) {
    if (event.target.classList.contains('game__option')) {
        let playerChoice = event.target.getAttribute('data-value');
        let computerChoice = getComputerChoice();
        computerChoiseElement.classList = `game__option ${computerChoice}`;
        playRound(playerChoice, computerChoice);
    }
}

function capitalizeFirstLetter(str) {
    return str[0].toUpperCase().concat(str.slice(1));
}

function getComputerChoice() {
    return options[Math.floor(Math.random() * options.length)];
}

function getRoundWinner(playerChoise, computerChoise) {
    if (playerChoise === computerChoise) {
        return 'draw';
    }
    switch (playerChoise) {
        case options[0]: //rock
            return computerChoise === options[1] ? 'computer' : 'player';
        case options[1]: //paper
            return computerChoise === options[2] ? 'computer' : 'player';
        case options[2]: //scissors
            return computerChoise === options[0] ? 'computer' : 'player';
    }
}

function getResultPhrase(winnerChoise, loserChoise) {
    return `${capitalizeFirstLetter(winnerChoise)} beats ${capitalizeFirstLetter(loserChoise)}`;
}

function getGameWinner() {
    return computerScore > playerScore ? "You lose the game :(" : computerScore < playerScore ? "You win the game :)" : "It's a draw!";
}

function isGameOver() {
    return playerScore === 5 || computerScore === 5;
}

function playRound(playerChoice, computerChoice) {
    const roundWinner = getRoundWinner(playerChoice, computerChoice);
    switch (roundWinner) {
        case 'computer':
            computerScoreElement.textContent = ++computerScore;
            gameStatus.textContent = `You lose! ${getResultPhrase(computerChoice, playerChoice)}`;
            break;
        case 'player':
            playerScoreElement.textContent = ++playerScore;
            gameStatus.textContent = `You win! ${getResultPhrase(playerChoice, computerChoice)}`;
            break;
        default:
            gameStatus.textContent = `It's a draw!`;
            break;
    }

    if (isGameOver()) {
        changeScreen(1);
        winner.textContent = getGameWinner();
    }
}

function cleanGameData() {
    screens.forEach(screen => screen.classList.remove('up'));
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    gameStatus.textContent = 'Pick an option';
    computerChoiseElement.classList = 'game__option';
}

function restartGame(event) {
    event.preventDefault();
    cleanGameData();
    changeScreen(0);
}