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
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function flipCard() {
    if (!gameActive || flippedCards.length >= 2 || this.classList.contains('flipped')) {
        return;
    }

    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        attempts++;
        attemptsDisplay.textContent = attempts;
        checkForMatch();
    }
}
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedCards.push(firstCard, secondCard);
        remainingPairs--;
        remainingDisplay.textContent = remainingPairs;
        showMessage("¡Has encontrado una pareja!");

        if (remainingPairs === 0) {
            showMessage('¡Felicidades! Has encontrado todas las parejas.');
            setTimeout(initGame, 2000);
        }
    } else {
        showMessage("Fallaste. Inténtalo de nuevo.");
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.classList.remove('flipped');
            secondCard.textContent = '';
        }, 1000);
    }

    flippedCards = [];
    if (attempts >= maxAttempts) {
        gameActive = false; 
        showMessage("¡Se han agotado los intentos! Fin del juego.");
    }
}


function showMessage(message) {
    messageDisplay.textContent = message;
    setTimeout(() => {
        messageDisplay.textContent = '';
    }, 1000);
}


setDifficultyButton.addEventListener('click', () => {
    const difficulty = difficultySelect.value;

    if (difficulty === 'easy') {
        rows = 3; cols = 4;
        maxAttempts = 16; 
    } else if (difficulty === 'medium') {
        rows = 4; cols = 4;
        maxAttempts = 16; 
    } else if (difficulty === 'hard') {
        rows = 2; cols = 6;
        maxAttempts = 10; 
    } else if (difficulty === 'custom') {
        rows = parseInt(rowsInput.value);
        cols = parseInt(colsInput.value);
        if ((rows * cols) % 2 !== 0) {
            alert("El número total de casillas debe ser par.");
            return;
        }
        if (rows < 1 || cols < 1) {
            alert("Por favor, introduce valores válidos para filas y columnas.");
            return;
        }
        maxAttempts = 11; 
    }

   
    initGame();
});


window.onload = initGame;