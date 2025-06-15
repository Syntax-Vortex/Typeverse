export let timeStats = {
    maxTime: 30,
    timeRemaining: 30,
    timeRunning: false
}

export let wordStats = {
    correctWords: 0,
    correctLetters: 0,
    incorrectLetters: 0,
    extraLetters: 0
}

export function countdown(){
    timeStats.timeRemaining--;
}