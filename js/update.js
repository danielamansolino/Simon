
// Constants
const COLORS = ['purple', 'pink', 'turquoise', 'yellow'];
const GAME_LENGTH = 10;

// State variables
let gameSequence = [];
let playerSequence = [];
let score = 0;

// Cached elements
const messageEl = document.querySelector('h1');
const startBtn = document.querySelector('#startButton');
const scoreEl = document.querySelector('#score');

// Event listeners
const allButtons = document.querySelectorAll('.button');
allButtons.forEach(button => {
    button.addEventListener('click', handleColorClick);
});
startBtn.addEventListener('click', init);

// Functions

// Initialize the game
function init() {
    score = 0;
    playerSequence = [];
    gameSequence = [];
    render();
}

// Render function
function render() {
    startGame();
    showInstructions();
}

// Activate a button
function activateButton(color, delay) {
    const colorEl = document.querySelector(`[data-color='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);
    setTimeout(() => {
        colorEl.classList.add('activated');
        sound.play();
        setTimeout(() => {
            colorEl.classList.remove('activated');
        }, 500);
    }, delay);
}

// Generate a random color for the game sequence
function getRandomColor() {
    let randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    if (gameSequence[gameSequence.length - 1] === randomColor) {
        randomColor = getRandomColor(); // Ensure no consecutive duplicates
    }
    return randomColor;
}

// Play the game sequence
function playGameSequence() {
    gameSequence.push(getRandomColor());
    gameSequence.forEach((color, index) => {
        activateButton(color, (index + 1) * 1000);
    });
}

// Handle color click
function handleColorClick(event) {
    const pickedColor = event.target.dataset.color;
    playerSequence.push(pickedColor);
    const sound = document.querySelector(`[data-sound='${pickedColor}']`);
    sound.play();
    if (playerSequence.toString() === gameSequence.toString()) {
        score++;
        scoreEl.textContent = `Score: ${score}`;
        playerSequence = [];
        setTimeout(() => {
            if (score < GAME_LENGTH) {
                playGameSequence();
            } else {
                endGame(true);
            }
        }, 500 + 1000);
    } else if (!arraysMatch(gameSequence.slice(0, playerSequence.length), playerSequence)) {
        endGame(false);
    }
}

// Check if arrays match
function arraysMatch(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

// End the game
function endGame(won) {
    messageEl.textContent = won ? 'You win, yay!' : 'Game Over!';
    score = 0;
    scoreEl.textContent = `Score: ${score}`;
    gameSequence = [];
    playerSequence = [];
}

// Start the game
function startGame() {
    playGameSequence();
}

// Show instructions
function showInstructions() {
    const instructionBtn = document.getElementById('showInst');
    const instructionsText = document.getElementById('hidden');
    instructionBtn.addEventListener('click', () => {
        instructionsText.style.display = 'block';
    });
}
