import _ from "lodash";
import printMe from "./print.js";
import SwipeComponent from "./swipe.js"

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

function component() {
    const element = document.createElement("div");
    const btn = document.createElement("button");

    element.innerHTML = _.join(["Hello", "webpack"], " ");

    btn.innerHTML = "Click me and check the console!";
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}


const Swiper = new SwipeComponent(arr);
window.swiper = Swiper;


document.body.appendChild(Swiper.swipingElement());