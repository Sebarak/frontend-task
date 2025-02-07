const button = document.querySelector('.main_content_button');
const close = document.querySelector('.modal_close');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const contentCounter = document.querySelector('.modal_paragraph_counter');
const counterReset = document.querySelector('.modal_reset');
const confetti = document.querySelector('.confetti');
let  counter;

if (localStorage.getItem('counter') === null) counter = 0
else counter = localStorage.getItem('counter');



//Falling confetti animation created by mathusummut

let maxParticleCount = 500; //set max confetti count
let particleSpeed = .1; //set the particle animation speed
let startConfetti; //call to start confetti animation
let stopConfetti; //call to stop adding confetti
let toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
let removeConfetti; //call to stop the confetti animation and remove all confetti immediately

(function() {
    startConfetti = startConfettiInner;
    stopConfetti = stopConfettiInner;
    toggleConfetti = toggleConfettiInner;
    removeConfetti = removeConfettiInner;
    let colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
    let streamingConfetti = false;
    let animationTimer = null;
    let particles = [];
    let waveAngle = 0;

    function resetParticle(particle, width, height) {
        particle.color = colors[(Math.random() * colors.length) | 0];
        particle.x = Math.random() * width;
        particle.y = Math.random() * height - height;
        particle.diameter = Math.random() * 10 + 5;
        particle.tilt = Math.random() * 10 - 10;
        particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        particle.tiltAngle = 0;
        return particle;
    }

    function startConfettiInner() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        window.requestAnimFrame = (function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    return window.setTimeout(callback, 16.6666667);
                };
        })();
        let canvas = document.getElementById("confetti-canvas");
        if (canvas === null) {
            canvas = document.createElement("canvas");
            canvas.setAttribute("id", "confetti-canvas");
            canvas.setAttribute("style", "display:block;z-index:2;pointer-events:none;");
            confetti.appendChild(canvas);
            canvas.width = width;
            canvas.height = height;
            window.addEventListener("resize", function() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }, true);
        }
        let context = canvas.getContext("2d");
        while (particles.length < maxParticleCount)
            particles.push(resetParticle({}, width, height));
        streamingConfetti = true;
        if (animationTimer === null) {
            (function runAnimation() {
                context.clearRect(0, 0, window.innerWidth, window.innerHeight);
                if (particles.length === 0)
                    animationTimer = null;
                else {
                    updateParticles();
                    drawParticles(context);
                    animationTimer = requestAnimFrame(runAnimation);
                }
            })();
        }
    }

    function stopConfettiInner() {
        streamingConfetti = false;
    }

    function removeConfettiInner() {
        stopConfetti();
        particles = [];
    }

    function toggleConfettiInner() {
        if (streamingConfetti)
            stopConfettiInner();
        else
            startConfettiInner();
    }

    function drawParticles(context) {
        let particle;
        let x;
        for (let i = 0; i < particles.length; i++) {
            particle = particles[i];
            context.beginPath();
            context.lineWidth = particle.diameter;
            context.strokeStyle = particle.color;
            x = particle.x + particle.tilt;
            context.moveTo(x + particle.diameter / 2, particle.y);
            context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
            context.stroke();
        }
    }

    function updateParticles() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let particle;
        waveAngle += 0.01;
        for (let i = 0; i < particles.length; i++) {
            particle = particles[i];
            if (!streamingConfetti && particle.y < -15)
                particle.y = height + 100;
            else {
                particle.tiltAngle += particle.tiltAngleIncrement;
                particle.x += Math.sin(waveAngle);
                particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
                particle.tilt = Math.sin(particle.tiltAngle) * 15;
            }
            if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
                if (streamingConfetti && particles.length <= maxParticleCount)
                    resetParticle(particle, width, height);
                else {
                    particles.splice(i, 1);
                    i--;
                }
            }
        }
    }
})();


const clearCounter = () => {
        counterReset.classList.add('show');
        confetti.style.display = 'block';
        startConfetti();
}

const showModal = (b,m,o) =>{
    b.addEventListener('click', event => {
        event.preventDefault();
        b.disabled = true;

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
        button.disabled = false;

        if (b === counterReset) {
            localStorage.removeItem('counter');
            counter = 0;
            counterReset.classList.remove('show');
            stopConfetti();
        }

        if (m !== null) m.classList.remove('show');
        if (o !== null) o.classList.remove('show');
        document.body.style.overflow = 'auto';
    })
}

if (localStorage.getItem('counter') >= 5) {
    clearCounter();
}



showModal(button,modal,overlay);

closeModal(close,modal,overlay);

closeModal(overlay,modal,overlay);

closeModal(counterReset, modal, overlay);