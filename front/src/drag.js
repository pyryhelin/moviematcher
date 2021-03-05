this.element.addEventListener("mousedown", e => { this.mouseDown = true }, false);

this.element.addEventListener("mouseup", e => { this.mouseDown = false }, false);

this.element.addEventListener("mousemove", e => {
    if (this.mouseDown) {
        console.log(e)
    }
}, false);