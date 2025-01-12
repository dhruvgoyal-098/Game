
let randomNumber;
let attempts = 0;
let maxAttempts = 10;
let maxNumber = 100;

const difficultySelector = document.getElementById('difficulty');
const guessInput = document.getElementById('guess');
const submitGuessButton = document.getElementById('submit-guess');
const resetButton = document.getElementById('reset-game');
const messageDisplay = document.getElementById('message');
const guessHistory = document.getElementById('guess-history');
const attemptsDisplay = document.getElementById('attempts');
function initializeGame() {
  maxNumber = parseInt(difficultySelector.value);
  randomNumber = Math.floor(Math.random() * maxNumber) + 1;
  attempts = 0;
  maxAttempts = 10;
  guessInput.value = '';
  guessInput.disabled = false;
  guessHistory.innerHTML = '';
  messageDisplay.textContent = `Make your first guess! You have ${maxAttempts} attempts.`;
  attemptsDisplay.textContent = `0 / ${maxAttempts}`;
  submitGuessButton.disabled = false;
}

function handleGuess() {
  const userGuess = parseInt(guessInput.value);
  if (isNaN(userGuess) || userGuess < 1 || userGuess > maxNumber) {
    messageDisplay.textContent = `Please enter a number between 1 and ${maxNumber}.`;
    return;
  }

  attempts++;
  attemptsDisplay.textContent = `${attempts} / ${maxAttempts}`;

  if (userGuess === randomNumber) {
    messageDisplay.textContent = `Correct! The number was ${randomNumber}.`;
    playSound('correct');
    endGame(true);
    return;
  }

  if (attempts >= maxAttempts) {
    messageDisplay.textContent = `Game over! The number was ${randomNumber}.`;
    playSound('wrong');
    endGame(false);
    return;
  }

  if (userGuess > randomNumber) {
    messageDisplay.textContent = 'Too high!';
  } else {
    messageDisplay.textContent = 'Too low!';
  }
  playSound('wrong');

  const guessItem = document.createElement('li');
  guessItem.textContent = `You guessed: ${userGuess}`;
  guessHistory.appendChild(guessItem);
}

function playSound(type) {
  const sound = new Audio(type === 'correct' ? 'correct.wav' : 'wrong.wav');
  sound.play();
}

function endGame(isWin) {
  guessInput.disabled = true;
  submitGuessButton.disabled = true;
  if (!isWin) {
    playSound('wrong');
  }
}

submitGuessButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', initializeGame);
difficultySelector.addEventListener('change', initializeGame);

initializeGame();
