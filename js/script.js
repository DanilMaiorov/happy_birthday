const body = document.querySelector('body');
const header = document.querySelector('.header');

const cardImage = document.querySelector('.card__image');
const cardText = document.querySelector('.card__text');

const wrapper = document.querySelector('.card__wrapper');
wrapper.style.display = 'none';
    setTimeout(() => {
        wrapper.style.display = 'flex';
    }, 200);
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
const changePhoto = () => {
    getData().then(data => {
        state.photo = getRandomForArr(data.photo[state.gender]);
        renderDOM();
            setTimeout(() => {
                screenShot();
            }, 1);
    });
};

header.addEventListener('click', (e) => {
    if(e.target.classList.contains('header__button-change_male')) {
        changeToMen();
    }
    if(e.target.classList.contains('header__button-change_female')) {
        changeTowoman();
    }
    if(e.target.classList.contains('header__button-change_text')) {
        changeText();

    }
    if(e.target.classList.contains('header__button-change_image')) {
        changePhoto();
    }
});
getDataToCard();



//screenShot();

