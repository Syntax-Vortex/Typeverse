import {weightedWords} from './data/weightedWords.js'

export let currentTestWords = [];

let currentMargin = 0;

export function randomWord() {
    const ind = Math.floor(Math.random() * weightedWords.length);
    return weightedWords[ind].toLowerCase();
}

export function formatWord(word) {
    return `<div class='word'><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

export function moveWordsUp(){
    document.querySelector('.js-words-container').style.marginTop = `${currentMargin - 45}px`
    currentMargin -= 45;
}

export function moveWordsDown(){
    document.querySelector('.js-words-container').style.marginTop = `${currentMargin + 45}px`
    currentMargin += 45;
}