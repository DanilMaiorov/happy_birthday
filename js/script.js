const body = document.querySelector('body');
const header = document.querySelector('.header');
const cardImage = document.querySelector('.card__image');
const cardText = document.querySelector('.card__text');
const prevTextCard = document.querySelector('.header__button-change_text-prev');
const prevImgCard = document.querySelector('.header__button-change_image-prev');
const wrapper = document.querySelector('.card__wrapper');
const cardContainer = document.querySelector('.card__container');



const state = {
    gender: body.classList.contains('woman') ? 'woman' : 'men',
};
const changeToMen = () => {
    if(state.gender !== 'men') {
        body.classList.add('men');
        body.classList.remove('woman');
        state.gender = 'men';
        getDataToCard();
    }
};
const changeTowoman = () => {
    if(state.gender !== 'woman') {
        body.classList.add('woman');
        body.classList.remove('men');
        state.gender = 'woman';
        getDataToCard();
    }
};
const screenShot = () => {
    html2canvas(wrapper).then(canvas => {
        canvas.style.position = 'absolute';
        canvas.style.zIndex = '10';
        canvas.style.maxWidth = '840px';
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
        canvas.style.objectFit = 'cover';
        cardContainer.append(canvas);
    });
};
const getRandomForArr = (arr) => {
    const randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber];
};
const renderDOM = () => {
    if(state.photo.includes('black')) {
        cardText.style.color = '#FFF';
    } else {
        cardText.style.color = '';
    }
    cardImage.src = `./img/${state.photo}`;
    cardText.innerHTML = state.text.replaceAll('\n', '<br>');
    
};
const getData = () => {
    return fetch('./db/db.json').then(response =>  response.json());
    
};
const getDataToCard = () => {
    getData().then(data => {
        state.text = getRandomForArr(data.text[state.gender]);
        state.photo = getRandomForArr(data.photo[state.gender]);
        renderDOM();
            setTimeout(() => {
                screenShot();
            }, 1);
    });
};
const changeText = () => {
    getData().then(data => {
        state.text = getRandomForArr(data.text[state.gender]);
        renderDOM();
            setTimeout(() => {
                screenShot();
            }, 1);
    });
};
const changePrevText = (arr) => {
    arr.forEach(item => {
        state.text = item.text;
        cardText.innerHTML = state.text.replaceAll('\n', '<br>');
        renderDOM();
                setTimeout(() => {
            screenShot();
        }, 1);
    });
};
const changePrevImage = (arr) => {
    arr.forEach(item => {
        console.log(item);
        state.photo = item.photo;
        cardImage.src = `./img/${state.photo}`;
        console.log(state.photo);
        renderDOM();
                setTimeout(() => {
            screenShot();
        }, 1);
    });
};
const changePhoto = () => {
    getData().then(data => {
        state.photo = getRandomForArr(data.photo[state.gender]);
        renderDOM();
            setTimeout(() => {
                screenShot();
            }, 1);
    });
};
class Obj {
    constructor(gender, text, photo) {
        this.gender = gender;
        this.text = text;
        this.photo = photo;
    }
}
let arrCardPrev = [state];
let arrImgPrev = [state];

const prevCard = () => {
    let newCard = new Obj(state.gender, state.text, state.photo);
    arrCardPrev.push(newCard);
    return arrCardPrev;
};
const prevImg = () => {
    let newImg = new Obj(state.gender, state.text, state.photo);
    arrImgPrev.push(newImg);
    return arrImgPrev;
};

let countText = 0;
let countImg = 0;

header.addEventListener('click', (e) => {
    if(e.target.classList.contains('header__button-change_male')) {
        changeToMen();
    }
    if(e.target.classList.contains('header__button-change_female')) {
        changeTowoman();
    }
    if(e.target.classList.contains('header__button-change_text')) {
        changeText();
        prevCard();
        countText = 1;
    }
    if(e.target.classList.contains('header__button-change_image')) {
        changePhoto();
        prevImg();
        countImg = 1;
    }
    if(e.target == prevTextCard) {
        if(arrCardPrev.length >= 2) {
            changePrevText(arrCardPrev.slice(-1));
            countText = 0;
        }
    }
    if(e.target == prevImgCard) {
        if(arrImgPrev.length >= 2) {
            changePrevImage(arrImgPrev.slice(-1));
            countImg = 0;
        }
    }
    if(countText === 1) {
        prevTextCard.style.display = 'inline';
    } else {
        prevTextCard.style.display = '';
    }
    if(countImg === 1) {
        prevImgCard.style.display = 'inline';
    } else {
        prevImgCard.style.display = '';
    }
});

getDataToCard();