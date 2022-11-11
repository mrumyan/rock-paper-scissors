/***GAME LOGIC***/
const options = ['rock', 'paper', 'scissors'];

// function getPlayerChoice() {
//     return prompt('Rock, paper or scissors?', options[0]);
// }

function getComputerChoice() {
    return options[Math.floor(Math.random() * options.length)];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 'draw';
    }
    switch (playerSelection) {
        case options[0]: //rock
            return computerSelection === options[1] ? 'computer' : 'player';
        case options[1]: //paper
            return computerSelection === options[2] ? 'computer' : 'player';
        case options[2]: //scissors
            return computerSelection === options[0] ? 'computer' : 'player';
    }
}

function getWinner(playerScore, computerScore) {
    return computerScore > playerScore ? "You lose the game :(" : computerScore < playerScore ? "You win the game :)" : "It's a draw!";
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < 5; i++) {
        let playerSelection = getPlayerChoice();
        let computerSelection = getComputerChoice();
        let roundWinner = playRound(playerSelection, computerSelection);
        console.log(`---${i + 1} round---`);
        if (roundWinner === 'computer') {
            computerScore++;
            console.log(`You lose! ${computerSelection} beats ${playerSelection}`);
        } else if (roundWinner === 'player') {
            playerScore++;
            console.log(`You win! ${playerSelection} beats ${computerSelection}`);
        } else {
            console.log(`It's a draw!`);
        }
        console.log(`--------------`);
    }
    console.log(`--Final score--`);
    console.log('Computer: ', computerScore);
    console.log('Player: ', playerScore);
    return getWinner(computerScore, playerScore);
}

//console.log(game());

/***UI***/
const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const playerChoices = document.querySelector('.game__options');
const computerChoiseBtn = document.querySelector('.game__computer').querySelector('.game__option');

const playerScoreBtn = document.querySelector('.player-score');
// console.log(playerScoreBtn.textContent);
const computerScoreBtn = document.querySelector('.computer-score');
// console.log(computerScoreBtn.textContent);

const gameStatus = document.querySelector('.game__status');

const winner = document.querySelector('.result__winner');
const startAgainBtn = document.querySelector('#start-again');

let playerChoice = '';
let computerChoice = '';

let playerScore = 0;
let computerScore = 0;

function capitalizeFirstLetter(str) {
    return str[0].toUpperCase().concat(str.slice(1));
}

function game(playerChoice, computerChoice) {
    let roundWinner = playRound(playerChoice, computerChoice);
    if (roundWinner === 'computer') {
        computerScoreBtn.textContent = ++computerScore;
        gameStatus.textContent = `You lose! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(playerChoice)}`;
    } else if (roundWinner === 'player') {
        playerScoreBtn.textContent = ++playerScore;
        gameStatus.textContent = `You win! ${capitalizeFirstLetter(playerChoice)} beats ${capitalizeFirstLetter(computerChoice)}`;
    } else {
        gameStatus.textContent = `It's a draw!`;
    }
}

function cleanGameData() {
    for (let screen of screens) {
        screen.classList.remove('up');
    }
    playerChoice = '';
    computerChoice = '';
    playerScore = 0;
    computerScore = 0;
    playerScoreBtn.textContent = playerScore;
    computerScoreBtn.textContent = computerScore;
    gameStatus.textContent = 'Pick an option';
    computerChoiseBtn.classList = 'game__option';
}

startBtn.addEventListener('click', event => {
    event.preventDefault();
    screens[0].classList.add('up');
});

playerChoices.addEventListener('click', event => {
    if (event.target.classList.contains('game__option')) {
        gameStatus.textContent = '';
        playerChoice = event.target.getAttribute('data-value');

        computerChoice = getComputerChoice();
        computerChoiseBtn.classList = `game__option ${computerChoice}`;

        game(playerChoice, computerChoice);

        if (playerScore >= 5 || computerScore >= 5) {
            screens[1].classList.add('up');
            winner.textContent = getWinner(playerScore, computerScore);
        }
    }
});

startAgainBtn.addEventListener('click', event => {
    event.preventDefault();
    cleanGameData();
    screens[0].classList.add('up');
});