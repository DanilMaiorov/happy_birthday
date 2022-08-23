const body = document.querySelector('body');
const header = document.querySelector('.header');

const changeToMen = () => {
    body.classList.add('men');
    body.classList.remove('woman');
};
const changeTowoman = () => {
    body.classList.add('woman');
    body.classList.remove('men');
};

header.addEventListener('click', (e) => {
    if(e.target.classList.contains('header__button-change_male')) {
        if(body.classList.contains('woman')) {
            changeToMen();
        }
    }
    if(e.target.classList.contains('header__button-change_female')) {
        if(body.classList.contains('men')) {
            changeTowoman();
        }
    }
});
