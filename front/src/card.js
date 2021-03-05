class CardComponent {

    /*
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

    constructor() {
        this.element = document.createElement("div");
        this.mouseDown = false;
    }

    createElement() {
        this.element.className = "cardContainer";
        console.log(this.element)
            //this.element.addEventListener("touchstart", this.handleStart, false);



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
        title.className = "card-title"
        title.textContent = "title";
        infobox.appendChild(title);


        let backgroundImage = document.createElement("img");
        backgroundImage.src = "https://m.media-amazon.com/images/M/MV5BNGZiMzBkZjMtNjE3Mi00MWNlLWIyYjItYTk3MjY0Yjg5ODZkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_.jpg";
        backgroundImage.className = "bg-img";

        //this.element.appendChild(card);
        this.element.appendChild(backgroundImage);
        this.element.appendChild(infobox);
        return this.element
    }



}


export default CardComponent