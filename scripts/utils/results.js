export function wpm(correctLetters, time){
    return Math.round((correctLetters/5) * (60/time));
}

export function accuracy(correctLetters, incorrectLetters, extraLetters){
    return Math.round((correctLetters/(incorrectLetters+correctLetters+extraLetters)) * 100);
}