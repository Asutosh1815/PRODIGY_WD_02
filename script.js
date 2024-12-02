let timerDisplay = document.querySelector('.timer');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let laps = document.getElementById('laps');

let timer = null;
let elapsedTime = 0;
let startTime = null;

// Format time into HH:MM:SS
function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  let minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  let seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Update timer display
function updateTimer() {
  const currentTime = Date.now();
  elapsedTime += currentTime - startTime;
  startTime = currentTime;
  timerDisplay.textContent = formatTime(elapsedTime);
}

// Start the stopwatch
startButton.addEventListener('click', () => {
  if (!timer) {
    startTime = Date.now();
    timer = setInterval(updateTimer, 1000);
  }
});

// Pause the stopwatch
pauseButton.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
});

// Reset the stopwatch
resetButton.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
  elapsedTime = 0;
  timerDisplay.textContent = "00:00:00";
  laps.innerHTML = '';
});

// Record a lap
lapButton.addEventListener('click', () => {
  if (elapsedTime) {
    const lapTime = document.createElement('li');
    lapTime.textContent = formatTime(elapsedTime);
    laps.appendChild(lapTime);
  }
});
