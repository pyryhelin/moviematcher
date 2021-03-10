import CardComponent from "./card";
import CardGenerator from "./card";
import { Point } from "./utils";

class Draggable extends CardComponent {
    /**
     *  @param {defaultVisibility} defaultVisibility set the cards' visibility when creating the element.
     *  1: visible; 0: hidden
     */
    constructor(defaultVisibility, title) {
        super(defaultVisibility, title);

        this.elemToDragFrom = this.bgImage;
        //document.body.appendChild(this.element);
        this.dragElem = this.element;

        this.mouseDown = false;
        this.touchDown = false;
        this.dragging = false;
        this.mouseLastPos = new Point();
        this.windowDimensions = new Point(
            window.innerWidth,
            window.innerHeight
        );
        this.verticalLimit = 0.30;
        this.startPos = new Point();
        this.debugKey = false;
    }

    mouseDownEvent(e) {
        console.log(this);
        this.element.style.transition = "";
        this.mouseDown = true;
        this.mouseLastPos = new Point(e.clientX, e.clientY);
    }

    mouseUpEvent(e) {
        this.mouseDown = false;
        this.dragging = false;
    }

    touchStartEvent(e) {
        this.element.style.transition = "";
        this.touchDown = true;
        this.mouseLastPos = new Point(
            e.touches[0].clientX,
            e.touches[0].clientY
        );
    }

    mouseMoveEvent(e) {
        if (this.mouseDown) {
            //console.log(e);
            let mouseX = e.clientX;
            let mouseY = e.clientY;
            //clientX, clientY
            this.move(mouseX, mouseY);
        }
    }

    setCardPosition(point, relationTo = null) {
        if (relationTo != null) {
            let boundingBox = relationTo.getBoundingClientRect();

            let a = `translate(${
				boundingBox.left + point.x - this.cardDimensions.x / 2
			}px,${boundingBox.top + point.y - this.cardDimensions.y / 2}px)`;

            this.element.style.transform = a;
            this.cardPosition = point;
            return;
        }

        let a = `translate(${point.x - this.cardDimensions.x / 2}px,${
			point.y - this.cardDimensions.y / 2
		}px)`;
        //console.log(a)
        /*this.element.style.left = `${point.x - this.cardDimensions.x / 2}px`;
        this.element.style.top = `${point.y - this.cardDimensions.y / 2}px`;*/
        this.cardPosition = point;
        this.element.style.transform = a;
    }

    moveCard(point, time = 0, timingFunc = "") {
        console.log(point);
        this.element.style.transition = `transform ${time}s ${timingFunc}`;
        this.setCardPosition(point);
        //this.element.style.transition = "";
    }

    touchMoveEvent(e) {
        if (this.touchDown) {
            //console.log(e);
            let mouseX = e.touches[0].clientX;
            let mouseY = e.touches[0].clientY;
            //clientX, clientY
            this.move(mouseX, mouseY);
        }
    }

    activateEventListeners() {
        this.elemToDragFrom.addEventListener("mousedown", e => { this.mouseDownEvent(e) });

        this.elemToDragFrom.addEventListener("touchstart", e => { this.touchStartEvent(e) });

        document.addEventListener("mouseup", e => { this.mouseUpEvent(e) });

        document.addEventListener("touchend", e => { this.mouseUpEvent(e) });

        window.addEventListener("mousemove", e => { this.mouseMoveEvent(e) });

        window.addEventListener("touchmove", e => { this.touchMoveEvent(e) });

        window.addEventListener("resize", e => { this.resizeEvent(e) });
    }

    deactivateEventListeners() {


        this.elemToDragFrom.removeEventListener("mousedown", e => { this.mouseDownEvent(e) });

        this.elemToDragFrom.removeEventListener("touchstart", e => { this.touchStartEvent(e) });

        document.removeEventListener("mouseup", e => { this.mouseUpEvent(e) });

        document.removeEventListener("touchend", e => { this.mouseUpEvente(e) });

        window.removeEventListener("mousemove", e => { this.mouseMoveEvent(e) });

        window.removeEventListener("touchmove", e => { this.touchMoveEvent(e) });

        window.removeEventListener("resize", e => { this.resizeEvent(e) });
    }

    calculateCardPos(relativeTo = null) {
        let rect = this.element.getBoundingClientRect();
        if (relativeTo != null) {
            let relativeToRect = relativeTo.getBoundingClientRect();
            this.cardPosition = new Point(
                rect.left - relativeToRect.left + this.cardDimensions.x / 2,
                rect.top - relativeToRect.top + this.cardDimensions.y / 2
            );
        }

        return this.cardPosition;
    }

    move(mouseX, mouseY) {
        if (this.dragging) {
            //console.log("dragging");

            let top =
                this.cardPosition.y - (this.mouseLastPos.y - mouseY);

            let left =
                this.cardPosition.x - (this.mouseLastPos.x - mouseX);
            //console.log(this.cardPosition.x);
            /*this.dragElem.style.top = `${top}px`;
            this.dragElem.style.left = `${left}px`;
            */

            if (Math.abs(top) > (this.startPos.y * (this.verticalLimit + 1)) ||
                Math.abs(top) < (this.startPos.y * (1 - this.verticalLimit))) {
                top = this.cardPosition.y;
            }

            this.setCardPosition(new Point(left, top));
            //console.log(this.cardPosition);
            this.mouseLastPos = new Point(mouseX, mouseY);
        } else {
            //console.log("start dragging")
            this.dragging = true;
            this.mouseLastPos = new Point(mouseX, mouseY);
            this.startPos = this.cardPosition;
        }
    }

    dispose() {
        this.deactivateEventListeners();
        this.element.parentElement.removeChild(this.element);
    }
}

class DraggableGenerator extends CardGenerator {
    constructor() {
        super();

    }



}

export { Draggable, DraggableGenerator };