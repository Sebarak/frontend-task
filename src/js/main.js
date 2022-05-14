const button = document.querySelector('.main_content_button');
const close = document.querySelector('.modal_close');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const contentCounter = document.querySelector('.modal_paragraph_counter');
const counterReset = document.querySelector('.modal_reset');
let  counter;

if (localStorage.getItem('counter') === null) counter = 0
else counter = localStorage.getItem('counter');


const clearCounter = () => {
    setTimeout(() => {
        counterReset.classList.add('show');
        // ...
    }, 500);
}

const showModal = (b,m,o) =>{
    b.addEventListener('click', event => {
        event.preventDefault();

        if (m !== null) m.classList.add('show');
        if (o !== null) o.classList.add('show');

        counter++;

        window.scrollTo(0,0);
        document.body.style.overflow = 'hidden';
        contentCounter.textContent = `${counter} times`;
        localStorage.setItem('counter', counter);

        if (counter >= 5) clearCounter();
    })
}

const closeModal = (b,m,o) => {
    b.addEventListener('click', event => {
        event.preventDefault();

        if (b === counterReset) {
            localStorage.removeItem('counter');
            counter = 0;
            counterReset.classList.remove('show');
        }

        if (m !== null) m.classList.remove('show');
        if (o !== null) o.classList.remove('show');
        document.body.style.overflow = 'auto';
    })
}


showModal(button,modal,overlay);

closeModal(close,modal,overlay);

closeModal(overlay,modal,overlay);

closeModal(counterReset, modal, overlay);