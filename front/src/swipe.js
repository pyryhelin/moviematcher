import { first } from "lodash";
import { Point } from "./utils";
import { Draggable } from "./drag";

class SwipeComponent {
    constructor(arr, _app) {
        //main element to hold the swiper
        this.element = document.createElement("div");

        this.bgCardsContainer = document.createElement("div");
        this.bgCardsContainerDimensions = new Point(
            this.bgCardsContainer.offsetWidth,
            this.bgCardsContainer.offsetHeight
        );

        this.app = _app;
        this.appDimensions = new Point(this.app.offsetWidth, this.app.offsetHeight);

        let a = this.app.getBoundingClientRect();
        this.appPosition = new Point(a.left, a.top);

        //
        this.arr = [...arr];

        //buttons
        this.buttonContainer = document.createElement("div");
        this.btn1 = document.createElement("button");
        this.btn2 = document.createElement("button");

        //are there any elements ready on screen
        this.elementOnScreen = false;

        this.windowDimension = new Point(window.innerWidth, window.innerHeight);

        //how much of the card must be outside of the application space for it to be registered as swiped
        this.swipeThreshold = 0.05;

        //list of cards queued up
        this.itemsOffScreen = [];

        this.leftPressed = false;
        this.rightPressed = false;
        //list of cards on the screen;
        this.itemsOnScreen = 0;
        this.mainCard = null;
        this.backgroundCards = [];
    }

    createElement() {
        this.btn1.id = "btn1";
        this.btn2.id = "btn2";

        this.btn1.onclick = () => {
            this.clickNo();
        };

        this.btn2.onclick = () => {
            this.clickYes();
        };
        this.addItemOntoScreen();

        this.btn1.innerHTML = "no";
        this.btn2.innerHTML = "yes";

        this.buttonContainer.appendChild(this.btn1);
        this.buttonContainer.appendChild(this.btn2);
        this.buttonContainer.className = "buttonContainer";

        this.bgCardsContainer.className = "bg-card-container";
        this.bgCardsContainer.style.width = this.appDimensions.x + "px";
        this.bgCardsContainer.style.height = this.mainCard.cardDimensions.y + "px";

        this.element.appendChild(this.buttonContainer);
        this.element.appendChild(this.bgCardsContainer);

        return this.element;
    }

    resizeEvent() {
        this.appDimensions = new Point(this.app.offsetWidth, this.app.offsetHeight);
        this.windowDimension = new Point(window.innerWidth, window.innerHeight);

        this.bgCardsContainer.style.width = this.appDimensions.x + "px";
        this.bgCardsContainer.style.height = this.mainCard.cardDimensions.y + "px";

        this.bgCardsContainerDimensions = new Point(
            this.bgCardsContainer.offsetWidth,
            this.bgCardsContainer.offsetHeight
        );
        let a = this.app.getBoundingClientRect();
        this.appPosition = new Point(a.left, a.top);
        this.updateOnscreenItemPositions();
    }

    mouseUpEvent() {
        if (!this.checkCardPosition()) {
            this.returnCardToCenter();
        } else {
            setTimeout(e => {
                this.nextCard();
            }, 0);
        }
    }

    nextCard() {
        let _card = this.mainCard;
        this.itemsOnScreen -= 1;
        let a = setTimeout(() => {
            _card.dispose();
        }, 500);
        for (let i = 0; i < this.backgroundCards.length; i++) {
            const card = this.backgroundCards[i];
            if (i == 0) {
                this.backgroundCards.shift();
            }
            this.cardStyle(card, i);
        }
    }

    swipe(_card, dir) {
        let dirs = {
            left: -1,
            right: 1,
        };
        //console.log(dirs[dir]);
        let dirVec = new Point(dirs[dir], 0);
        _card.element.style.zIndex = "101";
        _card.moveCard(
            new Point(
                _card.cardPosition.x + dirVec.x * _card.cardDimensions.x * 2,
                _card.cardPosition.y + dirVec.y * _card.cardDimensions.y * 2
            ),
            0.2,
            "ease-out 0s"
        );
        setTimeout(e => {
            this.nextCard();
        }, 0);
    }

    keyDownEvent(e) {
        if (e.key == "ArrowLeft" && !this.leftPressed) {
            this.swipe(this.mainCard, "left");
            this.leftPressed = true;
        } else if (e.key == "ArrowRight" && !this.rightPressed) {
            this.swipe(this.mainCard, "right");
            this.rightPressed = true;
        }
    }

    keyUpEvent(e) {
        if (e.key == "ArrowLeft" && this.leftPressed) {
            this.leftPressed = false;
        } else if (e.key == "ArrowRight" && this.rightPressed) {
            this.rightPressed = false;
        }
    }

    activateEventListeners() {
        window.addEventListener("resize", e => {
            this.resizeEvent(e);
        });
        window.addEventListener("mouseup", e => {
            this.mouseUpEvent(e);
        });
        window.addEventListener("touchend", e => {
            this.mouseUpEvent(e);
        });
        window.addEventListener("keydown", e => {
            this.keyDownEvent(e);
        });
        window.addEventListener("keyup", e => {
            this.keyUpEvent(e);
        });
    }

    deactivateEventListeners() {
        window.removeEventListener("resize", e => {
            this.resizeEvent(e);
        });
        window.removeEventListener("mouseup", e => {
            this.mouseUpEvent(e);
        });
        window.removeEventListener("touchend", e => {
            this.mouseUpEvent(e);
        });
        window.removeEventListener("keydown", e => {
            this.keyDownEvent(e);
        });
        window.removeEventListener("keyup", e => {
            this.keyUpEvent(e);
        });
    }

    checkCardPosition() {
        let _card = this.mainCard;
        if (
            _card.cardPosition.x -
            _card.cardDimensions.x / 2 +
            this.swipeThreshold * _card.cardDimensions.x <=
            0
        ) {
            console.log("swipe left");
            this.moveCardOutScreen(_card);
            return true;
        } else if (
            _card.cardPosition.x +
            _card.cardDimensions.x / 2 -
            this.swipeThreshold * _card.cardDimensions.x >=
            this.appDimensions.x
        ) {
            console.log("swipe right");
            this.moveCardOutScreen(_card);
            return true;
        }
    }

    moveCardOutScreen(_card) {
        let posVec = new Point(
            _card.cardPosition.x - _card.startPos.x,
            _card.cardPosition.y - _card.startPos.y
        );

        let posVecLen = Math.sqrt(Math.pow(posVec.x, 2) + Math.pow(posVec.y, 2));

        let dirVec = new Point(posVec.x / posVecLen, posVec.y / posVecLen);
        console.log(
            new Point(
                dirVec.x * _card.cardDimensions.z,
                dirVec.y * _card.cardDimensions.z
            )
        );
        _card.moveCard(
            new Point(
                _card.cardPosition.x + dirVec.x * _card.cardDimensions.x * 2,
                _card.cardPosition.y + dirVec.y * _card.cardDimensions.y * 2
            ),
            0.1,
            "ease-out 0s"
        );
    }

    returnCardToCenter() {
        this.mainCard.moveCard(
            new Point(
                this.appDimensions.x / 2,
                this.appDimensions.y / 2 - this.appDimensions.y * 0.1
            ),
            0.25,
            "ease-out 75ms"
        );
        this.bgCardsContainer.style.transform = `translate(${0}px, ${
			this.mainCard.cardPosition.y - this.mainCard.cardDimensions.y/2
		}px)`;
    }

    clickNo() {
        console.log("no");
        //this.nextElement();
    }

    clickYes() {
        console.log("yes");
        //this.nextElement();
    }

    addItemOntoScreen() {
        //while (this.itemsOffScreen.length < 4) {
        if (this.itemsOnScreen == 0) {
            //card generator creates a card
            let _card = this.arr.shift();
            this.mainCard = _card;
            this.itemsOnScreen++;
            let left = this.appDimensions.x / 2;
            let top = this.appDimensions.y / 2 - this.appDimensions.y * 0.1;

            //console.log(left, top);
            this.element.appendChild(_card.element);
            this.returnCardToCenter();
            //_card.setCardPosition(new Point(left, top));

            _card.activateEventListeners();

            for (let i = 0; i < 3; i++) {
                _card = this.cardStyle(this.arr.shift(), i + 1);

                this.backgroundCards.push(_card);

                //console.log(left, top);
                this.bgCardsContainer.appendChild(_card.element);
                this.itemsOnScreen++;
            }

            //_card.setCardPosition(new Point(left, top));
            //_card.activateEventListeners();

            //_card.calculateCardPos();
            //card.hide();
        }

        //}
    }

    cardStyle(_card, id) {
        if (id == 0) {
            _card.element.id = "main-card";
            this.mainCard = _card;
            this.returnCardToCenter();
            _card.activateEventListeners();
            return _card;
        }
        _card.element.id = `bg-card-${id}`;
        return _card;
    }

    updateOnscreenItemPositions() {
        this.returnCardToCenter();
    }
}

export default SwipeComponent;