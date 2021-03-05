class SwipeComponent {

    constructor(arr) {
        this.arr = [...arr]
        this.element = document.createElement("div");
        this.visualElementContainer = document.createElement("div");
        this.visualElement = document.createElement("h1");
        this.buttonContainer = document.createElement("div");
        this.btn1 = document.createElement("button");
        this.btn2 = document.createElement("button");
        this.counter = 0;
        this.self = this;
        this.nextArr = [...arr]
    }

    createElement() {

        this.visualElement.id = "visualElement";
        this.visualElement.textContent = this.arr.shift();
        this.visualElementContainer.appendChild(this.visualElement);



        this.btn1.id = "btn1";
        this.btn2.id = "btn2";

        this.btn1.onclick = () => {
            this.clickNo();
        }

        this.btn2.onclick = () => {
            this.clickYes();
        }

        this.btn1.innerHTML = "no";
        this.btn2.innerHTML = "yes";

        this.buttonContainer.appendChild(this.btn1);
        this.buttonContainer.appendChild(this.btn2);

        this.element.appendChild(this.visualElementContainer);
        this.element.appendChild(this.buttonContainer);

        return this.element
    }

    clickNo() {
        console.log("no");
        this.nextElement();
    }
    clickYes() {
        console.log("yes");
        this.nextElement();

    }
    nextElement() {

        this.visualElement.textContent = this.arr.shift()
        console.log(this.arr.length, this.arr)
        if (this.arr.length == 2) {
            this.arr = this.arr.concat(this.nextArr)
            this.nextArr = this.loadMoreData()
        }
    }

    loadMoreData() {
        console.log("fetching more data");
        //fetch next set of data from server and return it
        var a = Math.ceil(Math.random() * 10);
        return [a * 1, a * 2, a * 3, a * 4, a * 5, a * 6, a * 7, a * 8, a * 9, a * 10]
    };

}


export default SwipeComponent