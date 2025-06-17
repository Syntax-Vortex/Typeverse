export let timeStats = {
    maxTime: 30,
    timeRemaining: 30,
    timeRunning: false
}

export let wordStats = {
    typedWords: 0,
    correctWords: 0,
    correctLetters: 0,
    incorrectLetters: 0,
    extraLetters: 0
}

export let gameStats = {
    currentMode: 'timed',
    currentSetting: '25'
}

export function countdown(){
    timeStats.timeRemaining--;
}

export function countup(){
    timeStats.timeRemaining++;
}