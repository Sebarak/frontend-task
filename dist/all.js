const button=document.querySelector(".main_content_button"),close=document.querySelector(".modal_close"),overlay=document.querySelector(".overlay"),modal=document.querySelector(".modal"),contentCounter=document.querySelector(".modal_paragraph_counter");let counter=0;const showModal=(e,o,t)=>{e.addEventListener("click",e=>{e.preventDefault(),null!==o&&o.classList.add("show"),null!==t&&t.classList.add("show"),window.scrollTo(0,0),document.body.style.overflow="hidden",counter++,contentCounter.textContent=counter+" times"})},closeModal=(e,o,t)=>{e.addEventListener("click",e=>{e.preventDefault(),null!==o&&o.classList.remove("show"),null!==t&&t.classList.remove("show"),document.body.style.overflow="auto"})};showModal(button,modal,overlay),closeModal(close,modal,overlay);