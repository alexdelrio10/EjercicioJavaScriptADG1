const board = document.getElementById('board');
const attemptsDisplay = document.getElementById('attempts');
const remainingDisplay = document.getElementById('remaining');
const difficultySelect = document.getElementById('difficulty');
const setDifficultyButton = document.getElementById('setDifficulty');
const messageDisplay = document.getElementById('message');
const customInputs = document.getElementById('customInputs');
const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('cols');

let attempts = 0;
let remainingPairs = 6;
let maxAttempts = 16; 
let flippedCards = [];
let matchedCards = [];
let cardValues = [];
let rows = 3;
let cols = 4;
let gameActive = true; 


difficultySelect.addEventListener('change', () => {
    if (difficultySelect.value === 'custom') {
        customInputs.style.display = 'block';
    } else {
        customInputs.style.display = 'none';
    }
});


function initGame() {
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    remainingPairs = (rows * cols) / 2;
    remainingDisplay.textContent = remainingPairs;
    messageDisplay.textContent = '';
    board.innerHTML = '';
    gameActive = true; 

    
    cardValues = Array.from({ length: remainingPairs }, (_, i) => i + 1).flatMap(num => [num, num]);
    shuffle(cardValues);

    
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });

   
    board.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
}
