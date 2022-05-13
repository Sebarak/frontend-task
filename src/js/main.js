const button = document.querySelector('.main_content_button');
const close = document.querySelector('.modal_close');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const contentCounter = document.querySelector('.modal_paragraph_counter');
let counter = 0;


const showModal = (b,m,o) =>{
    b.addEventListener('click', event => {
        event.preventDefault();

        m.classList.add('show');
        o.classList.add('show');
        counter++;
        contentCounter.textContent = `${counter} times`;
    })
}

const closeModal = (b,m,o) => {
    b.addEventListener('click', event => {
        event.preventDefault();

        m.classList.remove('show');
        o.classList.remove('show');
    })
}


showModal(button,modal,overlay);

closeModal(close,modal,overlay);