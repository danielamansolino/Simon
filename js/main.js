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
const boardEls = document.querySelectorAll('.button');
const soundEls = document.querySelectorAll('.sound');
const startBtn = document.querySelector('button');
const scoreEl = document.getElementById('#score');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleColorClick)
// document.document.querySelectorAll('.button').addEventListener('click', handleColorClick)
startBtn.addEventListener('click', init)

/*----- functions -----*/

init ()

function init () {
    board= ['purple','pink', 'turquoise', 'yellow']
    winner = score === 5
    // render()
}

function render () {
    playGameSequence()
}
// Generate a random color for the game sequence

function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }
// console.log (' this is getRamdomColor', getRandomColor())
// Define a function to add a new color to the game sequence
function addColor() {
    const newColor = getRandomColor();
    gameSequence.push(newColor);
  }
getRandomColor()  
addColor()
console.log(gameSequence)

// Define a function to play the game sequence

// function playGameSequence() {
// // for (let i = 0; i < gameSequence.length; i++) {
//     // turn on the corresponding button light for the color
//     const color = gameSequence[i];

//     boardEls.classList.add('on')
//     setTimeout(() => {
//       boardEls.classList.remove('on');
//       boardEls.classList.add('off');  
//    setTimeout(() => {
//         boardEls.classList.remove("off");
//       }, 500);
//     }, 500 * i);
//   }
// // }

function playGameSequence() {
    nextSequence.forEach((color, index) => {
        setTimeout(() => {
          activateTile(color);
        }, (index + 1) * 600);
      }); 
}

function activateButton(color) {
    boardEls.classList.add('activated');
    soundEls.play();
  
    setTimeout(() => {
      soundEls.classList.remove('activated');
    }, 500);
  }

  function nextRound() {
    level += 1;
  
    const nextSequence = [...gameSequence];
    nextSequence.push(addColor());
    playGameSequence(nextSequence);
  
    gameSequence = [...nextSequence];
    score * 600 + 1000;
  }

  function handleColorClick(event) {
    const playerClick = playerSequence.push(newColor) - 1;
    soundEls.play();
  
    const remainingTaps = gameSequence.length - playerSequence.length;
  
    if (playerSequence.length === sequence.length) {
      playerSequence = [];
      setTimeout(() => {
        nextRound();
      }, 1000);
      return;
    }
  }



// function handleColorClick (event) {
//     const clickedColor = event.target.getAttribute('data-color');
//     if (clickedColor === playGameSequence)


// }

// const showTextButton = document.getElementById('showInst');
// const hiddenText = document.getElementById('hidden');

// // showTextButton.addEventListener('click', function() {
// //   hiddenText.style.display = 'hidden';
// // });