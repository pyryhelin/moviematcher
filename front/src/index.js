import _ from "lodash";
import SwipeComponent from "./swipe.js"
import CardComponent from "./card.js"

const body = document.querySelector('body');
window.body = body;


//add service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
window.arr = arr;

//const Swiper = new SwipeComponent(arr);
//window.swiper = Swiper;


//document.body.appendChild(Swiper.createElement());

let card = new CardComponent();
window.card = card;

document.body.appendChild(card.createElement());