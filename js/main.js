/*----- constants -----*/
// This is a constant for the game board
const COLORS = ['purple','pink', 'turquoise', 'yellow'];

/*----- state variables -----*/

let gameSequence = [];
let playerSequence = [];
let playerProgress =[];
let start = false;
let score = 0;
let winner = [];

/*----- cached elements  -----*/

const messageEl = document.querySelector('h1');
// const boardEls = [...document.querySelectorAll('.board > div')];
const boardEls = document.querySelector('.board');
const soundEls = document.querySelector('.audios');
const startBtn = document.querySelector('button');
const scoreEl = document.querySelector('#score');

// console.log('this is', boardEls)
/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleColorClick)
// document.document.querySelectorAll('.button').addEventListener('click', handleColorClick)
startBtn.addEventListener('click', init)

/*----- functions -----*/

init ()

function init () {
    
    score = 0;
    winner = null
    render()
}

function render () {
    activateButton()
    getRandomColor()
    playGameSequence()
    handleColorClick()
    renderScore()
    getWinner()
    startGame()
    renderScore()   
}

  function activateButton(color) {
    const buttonEls = document.querySelector(`[data-button='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);
    setTimeout(() => {
    buttonEls.classList.add('activated');
    sound.play();
    }, 500);
    buttonEls.classList.remove('activated');
}


// Define a function to play the game sequence
function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }


function playGameSequence() {
    // const nextSequence = [gameSequence, getRandomColor()];
    // gameSequence.push(getRandomColor);
    gameSequence.forEach((color,index) => {
        activateButton(color,(index + 1) * 500);
    });
    playerSequence = [];
    // setTimeout(() => {
    //   }, 500 + 1000);
    }
  

function handleColorClick(color) {
    playerSequence.push(color);
    const sound = document.querySelector(`[data-sound='${color}']`);
    sound.play();
    if(playerSequence === gameSequence) {
        gameSequence.push(getRandomColor);
        score += 1;
        renderScore();
        setTimeout(() => {
            playGameSequence();
          }, 1000);
          return;
    }
  }

function getWinner() {
    //check for winner
    //winner = score === 5;
    winner = gameSequence === 5;
    //winner message 
    if (winner) {
        messageEl.innerHTML = 'You win, yay!';
    } else if (playerSequence !== gameSequence) {
        messageEl.innerHTML = 'Game Over!';    
    }

}
 
function startGame() {
    startBtn.innerHTML = `Quit`;
    playGameSequence()
}
function renderScore() {
    scoreEl.textContent = `Score: ${score}`;
}