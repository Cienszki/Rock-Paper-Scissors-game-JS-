// assign elements to variables

var newGameBtn = document.getElementById('js-newGameButton');

var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');

var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');

var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');

var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');
var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');

// adding eventListeners

newGameBtn.addEventListener('click', newGame);

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

// players and scores

var player = {
    name: '',
    score: 0
};
var computer = {
    score: 0
};

//determining what to display

var gameState = 'notStarted';

function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case 'ended': 
            newGameBtn.innerText = 'Try again';
        case 'notStarted': 
            default:
                newGameElem.style.display = 'block';
                pickElem.style.display = 'none';
                resultsElem.style.display = 'none'; 

    }
}

// displaying initial state

setGameElements();

// starting new game

function newGame() {
    player.name = prompt("What's your name ?", 'Player 1');
    if (player.name) {
        player.score = 0;
        computer.score = 0;
        gameState = 'started';
        playerNameElem.innerHTML = player.name;
        setGamePoints();
        setGameElements();
    }
}

// picking choices

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

// checking round winner

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'none';
        playerResultElem.innerHTML = computerResultElem.innerHTML = 'Draw';
    }
    else if (
    (computerPick == 'rock' &&  playerPick == 'scissors') ||
    (computerPick == 'scissors' &&  playerPick == 'paper') ||
    (computerPick == 'paper' &&  playerPick == 'rock')) {
    
    winnerIs = 'computer';
    }
    if (winnerIs == 'player') {
        playerResultElem.innerHTML = 'You won!';
        playerResultElem.style.color = 'green';
        computerResultElem.innerHTML = 'Computer lost';
        computerResultElem.style.color = 'red';
        player.score++;
    }
    else if (winnerIs = 'computer') {
        computerResultElem.innerHTML = 'Computer Won!';
        computerResultElem.style.color = 'green';
        playerResultElem.innerHTML = 'You lost';
        playerResultElem.style.color = 'red';
        computer.score++;
    }    
    setGamePoints();
    checkGameWinner();
}

// showing points

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

// checking game winner

function checkGameWinner() {
    if (player.score >= 10 || computer.score >= 10) {
        if (player.score > computer.score) {
            alert('Congratulations, you won!');
        }
        else {
            alert('Computer won!');
        }
        gameState = 'ended';
        setGameElements();
    }
}

