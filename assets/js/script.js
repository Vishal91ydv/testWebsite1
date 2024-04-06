'use strict';



/**
 * add Event on elements
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header & back top btn show when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 80) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);


let confettiAmount = 100,
    confettiColors = [
        '#7d32f5',
        '#f6e434',
        '#63fdf1',
        '#e672da',
        '#295dfe',
        '#6e57ff'
    ],
    random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    createConfetti = to => {
        let elem = document.createElement('i'),
            set = Math.random() < 0.5 ? -1 : 1;
        elem.style.setProperty('--x', random(-360, 360) + 'px');
        elem.style.setProperty('--y', random(-200, 200) + 'px');
        elem.style.setProperty('--r', random(0, 360) + 'deg');
        elem.style.setProperty('--s', random(.6, 1));
        elem.style.setProperty('--b', confettiColors[random(0, 5)]);
        to.appendChild(elem);
    };

document.querySelectorAll('.button').forEach(button => {

    let complete = false,
        timeline = gsap.timeline({
            paused: true,
            ease: 'none',
            onComplete() {
                complete = true;
                button.classList.add('complete');
                for(let i = 0; i < confettiAmount; i++) {
                    createConfetti(button);
                }
                setTimeout(() => {
                    button.classList.add('confetti');
                    setTimeout(() => button.querySelectorAll('i').forEach(i => i.remove()), 600);
                }, 300);
                // Reset
                setTimeout(() => {
                    button.classList.remove('complete', 'confetti');
                    complete = false;
                }, 2000);
            }
        }),
        up = 0;

    timeline.to(button, {
        keyframes: [{
            '--weight-y': -6,
            '--arm-rotate-s-x': 90,
            duration: .3
        }, {
            '--weight-y': -10,
            '--arm-rotate-s-x': 45,
            '--arm-rotate-s': 130,
            duration: .2
        }, {
            '--weight-y': -12,
            '--arm-rotate-s': 130,
            '--arm-rotate-s-x': 0,
            duration: .1
        }, {
            '--weight-y': -20,
            '--person-y': -4,
            '--arm-rotate': 100,
            '--arm-rotate-s': 90,
            '--leg-y': 0,
            '--leg-rotate': 20,
            '--leg-rotate-s': -20,
            duration: .2
        }, {
            '--weight-y': -25,
            '--arm-rotate': 150,
            '--arm-rotate-s': 30,
            duration: .2
        }]
    });

    button.addEventListener('click', e => {

        up = 1;

        const rippleDiv = document.createElement('div');

        rippleDiv.className = 'ripple';

        const boundingClientRect = button.getBoundingClientRect();

        button.style.setProperty('--ripple-x', e.clientX - boundingClientRect.left);
        button.style.setProperty('--ripple-y', e.clientY - boundingClientRect.top);

        button.querySelector('.inner').appendChild(rippleDiv);

        setTimeout(() => rippleDiv.remove(), 500);

    });

    setInterval(() => {

        up = up > 0 ? up - .1 : 0;

        let progress = timeline.progress(),
            direction = up > 0 ? 1 : -1.5;

        if(!complete) {
            timeline.progress(progress + .01 * direction);
        }

    }, 1000 / 60);

});
