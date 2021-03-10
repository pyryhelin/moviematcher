import { title } from "process";
import { Point } from "./utils";

class CardComponent {
    /*

     cardHeight = 0.7
     cardWidth = 0.4
    card:
        *rounded corners
        *dropshadow

        infobox:
            *rounded corners
            *little transparensy
            *dropshdow(?)
            title
            year,age rating, running time
            rating
            genres
        infobox(expanded):
            description(?)
            netflix country availability(?)
            link to trailer(?)
            link to open on netflix(?)

        background image:
            triggers for next and previous images
    */

    /**
     *  @param {defaultVisibility} defaultVisibility set the cards' visibility when creating the element.
     *  1: visible; 0: hidden
     */
    constructor(defaultVisibility, title = "title") {
        this.element = document.createElement("div");

        if (defaultVisibility == 0) {
            this.hide();
        }
        this.cardHeight = 65;
        this.cardWidth = 35;
        this.bgImage = null;
        this.title = title;
        this.cardPosition = new Point();
        this.visualViewportHeight = window.visualViewport.height;
        //console.log(this.visualViewportHeight);
        this.cardDimensions = new Point(
            (this.cardWidth / 100) * this.visualViewportHeight,
            (this.cardHeight / 100) * this.visualViewportHeight,
            Math.sqrt(
                Math.pow((this.cardWidth / 100) * this.visualViewportHeight, 2) +
                Math.pow((this.cardHeight / 100) * this.visualViewportHeight, 2)
            )
        );

        this.createElement();
        //this.calculateCardPos();
        //console.log(this.cardDimensions.x);
    }

    resizeEvent() {
        this.visualViewportHeight = window.visualViewport.height;

        this.cardDimensions = new Point(
            (this.cardWidth / 100) * this.visualViewportHeight,
            (this.cardHeight / 100) * this.visualViewportHeight
        );

        this.element.style.width = `${
			(this.cardWidth / 100) * this.visualViewportHeight
		}px`;
        this.element.style.height = `${
			(this.cardHeight / 100) * this.visualViewportHeight
		}px`;
    }

    activateEventListeners() {
        window.addEventListener("resize", e => { this.resizeEvent(e) });
    }

    deactivateEventListeners() {
        window.removeEventListener("resize", e => { this.resizeEvent(e) });
    }

    createElement() {
        this.element.className = "cardContainer";
        //console.log(this.element);
        this.element.style.width = `${
			(this.cardWidth / 100) * this.visualViewportHeight
		}px`;
        this.element.style.height = `${
			(this.cardHeight / 100) * this.visualViewportHeight
		}px`;

        /*
        let cardShadow = document.createElement("div");
        cardShadow.className = "cardShadow"

        let card = document.createElement("div");
        card.className = "card"
        */

        //infobox
        let infobox = document.createElement("div");
        infobox.className = "infobox";

        let title = document.createElement("h1");
        title.className = "card-title";
        title.textContent = this.title;
        infobox.appendChild(title);

        var backgroundImage = document.createElement("img");
        backgroundImage.src =
            "https://m.media-amazon.com/images/M/MV5BNGZiMzBkZjMtNjE3Mi00MWNlLWIyYjItYTk3MjY0Yjg5ODZkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_.jpg";
        //backgroundImage.src = "https://via.placeholder.com/150"
        backgroundImage.className = "bg-img noselect";
        backgroundImage.setAttribute("draggable", "false");
        this.bgImage = backgroundImage;

        //this.element.appendChild(card);
        this.element.appendChild(backgroundImage);
        this.element.appendChild(infobox);
        return this.element;
    }



    hide() {
        this.element.style.visibility = "hidden";
    }

    show() {
        this.element.style.visibility = "visible";
    }

    updateTitle(titleText) {
        this.title = titleText;
    }
}

class CardGenerator {
    constructor() {


    }

}

export default CardComponent;
export { CardGenerator };