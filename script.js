let startTime = 0;
let elapsedTime = 0;
let paused = true;
let lapNumber = 1;
let timerId;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (paused) {
        startTime = Date.now() - elapsedTime;
        timerId = setInterval(updateDisplay, 1000);
        paused = false;
    }
}

function pause() {
    if (!paused) {
        clearInterval(timerId);
        elapsedTime = Date.now() - startTime;
        paused = true;
    }
}

function reset() {
    clearInterval(timerId);
    startTime = 0;
    elapsedTime = 0;
    paused = true;
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
    lapNumber = 1;
}

function lap() {
    if (!paused) {
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('li');
        lapElement.classList.add('lap');
        lapElement.textContent = `Lap ${lapNumber}: ${lapTime}`;
        lapsList.appendChild(lapElement);
        lapNumber++;
    }
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const time = formatTime(elapsedTime);
    display.textContent = time;
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
    return (number < 10 ? '0' : '') + number;
}
