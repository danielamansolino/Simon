/*----- constants -----*/

// This is a constant for the game board
const COLORS = ['purple','pink', 'turquoise', 'yellow'];
const mistakeSound = ['https://freesound.org/data/previews/42/42106_70164-lq.mp3']

/*----- state variables -----*/

let gameSequence = [];
let playerSequence = [];
let score = 0;
let winner = 0;

/*----- cached elements  -----*/

const messageEl = document.querySelector('h1');
const boardEls = document.querySelector('.board');
const soundEls = document.querySelector('.audios');
const startBtn = document.querySelector('#startButton');
const scoreEl = document.querySelector('#score');

/*----- event listeners -----*/

const allButtons = document.querySelectorAll('.button')
allButtons.forEach(button => {
    button.addEventListener('click', handleColorClick)
})
startBtn.addEventListener('click', init) 
playAgain.addEventListener('click', function() {
    window.location.reload();    
})

/*----- functions -----*/

function init () {
    score = 0;
    winner = null
    playerSequence = [];
    render()     
}

function render () {
    console.log('render has run')
    startGame()
    showInstructions() 
}

// Activate the hover effects and sounds on the buttons for the gameSequences
function activateButton(color,delay) {
    const colorEls= document.querySelector(`[data-color='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);
    setTimeout(() => {   
        colorEls.classList.add('activated');
        sound.play();
    setTimeout(() => {
        colorEls.classList.remove('activated');
    }, 500);
    },delay);
}

// Generates a randon color for the 
function getRandomColor() {
    let randomColor =  COLORS[Math.floor(Math.random() * COLORS.length)];
    if (gameSequence[gameSequence.length -1] === randomColor) {
        randomColor = getRandomColor();
    }
    return randomColor;
}

// Define a function to play the gameSequence
function playGameSequence() {
    gameSequence.push(getRandomColor());
    gameSequence.forEach((color,index) => {
        console.log('playGame sequence has run')
        activateButton(color,(index + 1) * 500);
    });
    console.log ('this is gameSequence',gameSequence )
}
 
// Responsable for the user interaction 
function handleColorClick(event) {
    const pickedColor = event.target.dataset.color;
    console.log('this is the playerBtn', pickedColor)
    playerSequence.push(pickedColor);
    console.log('this is the playerSequence', playerSequence)
    const sound = document.querySelector(`[data-sound='${pickedColor}']`);
    sound.play();
    // if(playerSequence === gameSequence) {
    if(playerSequence.toString() === gameSequence.toString()) {
    // if(arraysMatch(gameSequence,playerSequence)) {
        score += 1;
        scoreEl.textContent = `Score: ${score}`;
        playerSequence = [];
        setTimeout(() => {
            playGameSequence();
          }, 500 + 1000);
         return;
        } 
   getWinner()
    // else mistake audio
}

// Compare 2 arrays length and the items inside
function arraysMatch(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      } else {
        return true;
      }
    }
  } 

// Define winner or game over.
function getWinner() {
    if (gameSequence.length === 3) {
        messageEl.innerHTML = 'You win, yay!';
        winner = 1; 
    } else if (arraysMatch(gameSequence,playerSequence)) {
        messageEl.innerHTML = 'Game Over!';
        winner = -1;
        score = 0;
        scoreEl.textContent = `Score: ${score}`
    } 
}

// Start the playGameSequence 
function startGame() {
    playGameSequence()
}

// Display the instructions in the DOM
function showInstructions() { 
    const instructionBtn = document.getElementById('showInst');
    const instructionsText = document.getElementById('hidden');
    instructionBtn.addEventListener('click', () => {
        instructionsText.style.display = 'block';
    }
    );
}
