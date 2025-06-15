const cursor = document.querySelector('.js-cursor')

function movecursor(nextletter, last){
    if(!last){
        cursor.style.left = nextletter.offsetLeft + 'px';
        cursor.style.top = nextletter.offsetTop + 6 + 'px';
    }else{
        const offsetRight = (nextletter.offsetLeft + nextletter.offsetWidth);
        cursor.style.left = offsetRight + 'px';
        //cursor.style.left = offsetTop + 6 + 'px';
    }
}

function animateCursor(toggle){
    if(toggle){
        cursor.classList.add('cursor-animate');
    }else{
        cursor.classList.remove('cursor-animate');
    }
}