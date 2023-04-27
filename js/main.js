/*----- constants -----*/
// This is a constant for the game board
const COLORS = ['purple','pink', 'turquoise', 'yellow'];

/*----- state variables -----*/

let gameSequence = [];
let playerSequence = [];
// let playerProgress =[];
// let start = false;
let score = 0;
let winner = 0;

/*----- cached elements  -----*/

const messageEl = document.querySelector('h1');
// const boardEls = [...document.querySelectorAll('.board > div')];
const boardEls = document.querySelector('.board');
const soundEls = document.querySelector('.audios');
const startBtn = document.querySelector('#startButton');
console.log('this is startBtn', startBtn)
const scoreEl = document.querySelector('#score');

// console.log('this is', boardEls)
/*----- event listeners -----*/
const allButtons = document.querySelectorAll('.button')
allButtons.forEach(button => {
    button.addEventListener('click', handleColorClick)
})
// document.document.querySelectorAll('.button').addEventListener('click', handleColorClick)
startBtn.addEventListener('click', init)

/*----- functions -----*/

// init ()

function init () {
    console.log('init has run')
    score = 0;
    winner = null
    playerSequence = [];
    render()
}

function render () {
    console.log('render has run')
    getWinner()
    startGame()
    renderScore()
    showInstructions()   
}

//const allButtons = document.querySelectorAll('.button')
// allButtons.forEach(button => {
//     button.addEventListener('click', handleColorClick)


// Activate the hover effects and the sounds on the board for the sequences
function activateButton(color) {
    // console.log('activateButton run')
    // const colorEls= document.querySelector(`[data-color='${color}']`);
    // const colorEls = document.querySelectorAll('.button')
    // console.log('this is buttonEls',buttonEls)
    // const sound = document.querySelector(`[data-sound='${color}']`);
    // const sound = document.querySelectorAll('.audios')
    // console.log('this is sound',sound)
    // // // const sound2 = document.querySelector(dataset.sound=`${color}`)
    // // // console.log('this is sound2',sound2)
    // // // const sound =[...document.querySelectorAll(`[data-sound='${color}']`)]
    // // // console.log('this is sound',sound)
    // setTimeout(() => {   
    //     colorEls.classList.add('activated');
    //     sound.play();
    // setTimeout(() => {
    //     colorEls.classList.remove('activated');
    // }, 500);
    // });
}


// Generate colors to the gameSequence array 
function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
    
  }
// Define a function to play the gameSequence
// I need a delay
function playGameSequence() {
    gameSequence.push(getRandomColor());
    gameSequence.forEach((color,index) => {
        console.log('playGame sequence has run')
        activateButton(color,(index + 1) * 500);
    });
   
    console.log ('this is gameSequence',gameSequence )
    // setTimeout(() => {
    //   }, 500 + 1000);
    }

// Plays the next game sequence
// function nextSequence() {
//     const gameNextSeq = [...gameSequence];
//     gameNextSeq.push(getRandomColor());
//     // playGameSequence(gameNextSeq);
//     gameSequence = [...gameNextSeq];
//     console.log('this is gameNextSeq',gameNextSeq)
// }
  
// Responsable for the user interaction 
function handleColorClick(event) {
    const pickedColor = event.target.dataset.color;
    console.log('this is the playerBtn', pickedColor)
    playerSequence.push(pickedColor);
    console.log('this is the playerSequence', playerSequence)
    // const sound = document.querySelector(`[data-sound='${event}']`);
    // sound.play();
    // if(playerSequence === gameSequence) {
    if(playerSequence.toString() === gameSequence.toString()) {
    // if(gameSequence.length === playerSequence.length) {
        score += 1;
        playerSequence = [];
        renderScore();
        setTimeout(() => {
            playGameSequence();
          }, 1000);
          return;
    // do a forEach loop to compare the arrays      
    // } else if (playerSequence.toString() !== gameSequence.toString()) {
    //     messageEl.innerHTML = 'Game Over!';
    //     startBtn.innerHTML = 'Play Again';
    //     winner = -1;
    //     score = 0;
    }
  }

function arraysMatch(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  } 
// function sequenceMatch( ) {
//     if (gameSequence.length !== playerSequence.length) {
//       return false;
//     }
//     for (var i = 0; i < gameSequence.length; i++) {
//       if (gameSequence[i] !== playerSequence[i]) {
//         return false;
//       }
//     }
//     return true;
//   }


// Define winner or game over.
function getWinner() {
    if (score === 5) {
        messageEl.innerHTML = 'You win, yay!';
        startBtn.innerHTML = 'Play Again';
        winner = 1;
     // } else if (score > 0 && playerSequence !== playGameSequence) {
    // } else if (playerSequence !== playGameSequence) {    
    // } else if (arraysMatch(gameSequence,playerSequence)) {
    } else if (playerSequence.toString() !== gameSequence.toString()) {
        messageEl.innerHTML = 'Game Over!';
        startBtn.innerHTML = 'Play Again';
        winner = -1;
        score = 0;
    } 
}



// Render star button to 'Quit'  
function startGame() {
    startBtn.innerHTML = `Quit`;
    playGameSequence()
}

function renderScore() {
    scoreEl.textContent = `Score: ${score}`;
}

function showInstructions() {
    //display the instructions in the DOM
    const instructionBtn = document.getElementById('showInst');
    const instructionsText = document.getElementById('hidden')

    instructionBtn.addEventListener('click', () => {
        instructionsText.style.display = 'block';

    }
    );
}