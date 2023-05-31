let snake = ["c3"];
let headLocation = "c3";
let direction = "r";

let tickRate = 1000;

function tick() {
    // headLocation = document.getElementsByClassName("snakeHead")[0].id;

    if (direction == "r") {
        let x = headLocation.split("")[0];
        let y = headLocation.split("")[1];

        if (y > 4) {
            headLocation = x + 1;
        } else {
            headLocation = x + (parseInt(y) + 1 );
        }
    }

    console.log(headLocation);

    document.getElementById(`${headLocation}`).classList.add("snakeHead");

    
}



setInterval(() => {
    tick();
}, tickRate);