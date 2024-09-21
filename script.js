let timerInterval;
let elapsedTime = 0;
let isRunning = false;
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");

// Format time to hh:mm:ss
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Update the display
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

// Start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        timerInterval = setInterval(() => {
            elapsedTime += 1000;
            updateDisplay();
        }, 1000);
        isRunning = true;

        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

// Pause the stopwatch
function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;

        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    isRunning = false;

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapsList.innerHTML = "";  // Clear laps
}

// Track lap times
function addLap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

// Event listeners
startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);
