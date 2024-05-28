const studyClockElement = document.getElementById("clock-study");
const breakClockElement = document.getElementById("clock-break");
const longBreakClockElement = document.getElementById("clock-longBreak");
const studyStartButton = document.getElementById("startClock1");
const studyPauseButton = document.getElementById("pauseClock1");
const studyResetButton = document.getElementById("resetClock1");
const breakStartButton = document.getElementById("startClock2");
const breakPauseButton = document.getElementById("pauseClock2");
const breakResetButton = document.getElementById("resetClock2");
const longBreakStartButton = document.getElementById("startClock3");
const longBreakPauseButton = document.getElementById("pauseClock3");
const longBreakResetButton = document.getElementById("resetClock3");

let studyTimeDuration = 25 * 60; 
let breakTimeDuration = 5 * 60;
let longBreakDuration = 15 * 60;
let alarmeTimeout;

let studyInterval;
let breakInterval;
let longBreakInterval;
let alarm;


function formatTime(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateClocks() {
    studyClockElement.textContent = formatTime(studyTimeDuration);
    breakClockElement.textContent = formatTime(breakTimeDuration);
    longBreakClockElement.textContent = formatTime(longBreakDuration)
}

function startStudyClock() {
    if (studyTimeDuration === 0) {
        playAlarm();
        return;
    }

    studyInterval = setTimeout(function() {
        studyTimeDuration--;
        updateClocks();
        startStudyClock(); 
    }, 1000);
}

function startBreakClock() {
    if (breakTimeDuration === 0) {
        playAlarm();
        return;
    }

    breakInterval = setTimeout(function() {
        breakTimeDuration--;
        updateClocks();
        startBreakClock(); 
    }, 1000);
}

function startLongBreakClock() {
    if (longBreakDuration === 0) {
        playAlarm();
        return;
    }

    longBreakInterval = setTimeout(function() {
        longBreakDuration--;
        updateClocks();
        startLongBreakClock(); 
    }, 1000);
}


function playAlarm() {
   alarm = new Audio('/alarm.mp3');
   alarm.play();
}

function stopAlarm() {
    alarm.pause();
}

studyStartButton.addEventListener('click', startStudyClock);
breakStartButton.addEventListener('click', startBreakClock);
longBreakStartButton.addEventListener('click', startLongBreakClock);
studyPauseButton.addEventListener('click', () =>  { clearInterval(studyInterval); stopAlarm()});
breakPauseButton.addEventListener('click', () => { clearInterval(breakInterval); stopAlarm()});
longBreakPauseButton.addEventListener('click', () => { clearInterval(longBreakInterval); stopAlarm()});
studyResetButton.addEventListener('click', () => {
    clearInterval(studyInterval);
    studyTimeDuration = 25 * 60;
    updateClocks();
});
breakResetButton.addEventListener('click', () => {
    clearInterval(breakInterval);
    breakTimeDuration = 5 * 60;
    updateClocks();
});
longBreakResetButton.addEventListener('click', () => {
     clearInterval(longBreakInterval);
     longBreakDuration = 15 * 60;
     updateClocks();
});

updateClocks();