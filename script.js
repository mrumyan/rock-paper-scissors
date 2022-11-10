const options = ['rock', 'paper', 'scissors'];

function getPlayerChoice() {
    return prompt('Rock, paper or scissors?', options[0]);
}

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

function getWinner(computerScore, playerScore) {
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