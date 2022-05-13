const button = document.querySelector('.main_content_button');
const close = document.querySelector('.modal_close');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const contentCounter = document.querySelector('.modal_paragraph_counter');
let counter = 0;


const showModal = (b,m,o) =>{
    b.addEventListener('click', event => {
        event.preventDefault();

        if (m !== null) m.classList.add('show');
        if (o !== null) o.classList.add('show');
        window.scrollTo(0,0);
        document.body.style.overflow = 'hidden';
        counter++;
        contentCounter.textContent = `${counter} times`;
    })
}

const closeModal = (b,m,o) => {
    b.addEventListener('click', event => {
        event.preventDefault();

        if (m !== null) m.classList.remove('show');
        if (o !== null) o.classList.remove('show');
        document.body.style.overflow = 'auto';
    })
}


showModal(button,modal,overlay);

closeModal(close,modal,overlay);