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

function capitalizeFirstLetter(str) {
    return str[0].toUpperCase().concat(str.slice(1));
}

function getResultPhrase(winnerChoise, loserChoise) {
    return `${capitalizeFirstLetter(winnerChoise)} beats ${capitalizeFirstLetter(loserChoise)}`;
}

function changeScreen(index) {
    screens[index].classList.add('up');
}

function game(playerChoice, computerChoice) {
    while (playerScore < 5 && computerScore < 5) {
        let roundWinner = getRoundWinner(playerChoice, computerChoice);
        if (roundWinner === 'computer') {
            computerScoreElement.textContent = ++computerScore;
            gameStatus.textContent = `You lose! ${getResultPhrase(computerChoice, playerChoice)}`;
        } else if (roundWinner === 'player') {
            playerScoreElement.textContent = ++playerScore;
            gameStatus.textContent = `You win! ${getResultPhrase(playerChoice, computerChoice)}`;
        } else {
            gameStatus.textContent = `It's a draw!`;
        }
    }
    changeScreen(1);
    winner.textContent = getGameWinner();
}

function getGameWinner() {
    return computerScore > playerScore ? "You lose the game :(" : computerScore < playerScore ? "You win the game :)" : "It's a draw!";
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

startBtn.addEventListener('click', event => {
    event.preventDefault();
    changeScreen(0);
});

playerOptions.addEventListener('click', event => {
    if (event.target.classList.contains('game__option')) {
        let playerChoice = event.target.getAttribute('data-value');
        let computerChoice = getComputerChoice();
        computerChoiseElement.classList = `game__option ${computerChoice}`;
        game(playerChoice, computerChoice);
    }
});

startAgainBtn.addEventListener('click', event => {
    event.preventDefault();
    cleanGameData();
    changeScreen(0);

    console.log(screens);
});