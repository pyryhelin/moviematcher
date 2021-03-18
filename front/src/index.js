import SwipeComponent from "./swipe.js";
import { Draggable } from "./drag.js";
import { Point } from "./utils.js";

//add service worker for caching
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(registration => {
                console.log("SW registered: ", registration);
            })
            .catch(registrationError => {
                console.log("SW registration failed: ", registrationError);
            });
    });
}


//wait for window to load  
window.onload = () => {
    //make point class accessible for debugging reasons
    window.Point = Point;

    //make body accessible in the dev console for debugging 
    const body = document.querySelector("body");
    window.body = body;




    //placeholder cards for testing
    let arr = [];
    window.arr = arr;
    for (let i = 0; i < 10; i++) {
        arr.push(new Draggable(1, i));
        //document.body.appendChild(arr[i].element);
    }

    //create the application div to hold everything
    const app = document.createElement("div");
    app.className = "app";
    document.body.appendChild(app);

    //create instance of the swiper component and append it to the app
    const swiper = new SwipeComponent(arr, app);
    app.appendChild(swiper.createElement());
    //activate listeners for swipe detetection and card placement:
    swiper.activateEventListeners();

    //make swiper accessible for debugging:
    window.swiper = swiper;
};



// debugging
let printed1 = false;
let printed2 = false;
let updated = false;
let updated1 = false;
let debugLog = "";
let debugLog1 = "";
window.addEventListener("mousedown", e => {
    if (printed1) {
        debugLog += `mouseDown: x:${e.clientX}, y:${e.clientY}`;
        debugLog += `<br>mouseDownInApp: x:${
			e.clientX - Math.floor(swiper.appPosition.x)
		}, y:${e.clientY - Math.floor(swiper.appPosition.y)}`;
        printed1 = false;
        updated = true;
    }
});

window.addEventListener("mousemove", e => {
    if (printed2) {
        debugLog1 += `<br>mousePos: x:${e.clientX}, y:${e.clientY}`;
        debugLog1 += `<br>mousePosInApp: x:${
			e.clientX - Math.floor(swiper.appPosition.x)
		}, y:${e.clientY - Math.floor(swiper.appPosition.y)}`;
        printed2 = false;
        updated1 = true;
    }
});

const bugger = setInterval(() => {
    if (updated) {
        document.getElementById("debug").innerHTML = debugLog;
        updated = false;
    }
    if (updated1) {
        document.getElementById("debug1").innerHTML = debugLog1;
        updated1 = false;
    }
    debugLog = "";
    debugLog1 = "";

    printed1 = true;
    printed2 = true;
}, 50);