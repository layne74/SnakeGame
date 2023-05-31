/*
Description: Simple snake game
Author: Layne Hutchings
Date: 06/01/2023
Incomplete: true
*/

let snake = ["d3", "c3", "b3", "a3", "e3"];
let direction = "ArrowDown";

let tickRate = 0.2; // Seconds

function tick() {
    // let headLocation = document.getElementsByClassName("snakeHead")[0].id;
    move();
}

// Controls movement and user input for snake
function move() {

    let tail = snake[snake.length - 1];
    let y = snake[0].split("")[0];
    let x = snake[0].split("")[1];
    // RIGHT
    if (direction == "ArrowRight") {
        if (x > 4) {
            snake[0] = y + 1;
        } else {
            snake[0] = y + (parseInt(x) + 1);
        }
        
    } // DOWN
    else if (direction == "ArrowDown") {
        if (y > "d") {
            snake[0] = "a" + x;
        } else {
            snake[0] = String.fromCharCode(y.charCodeAt(0) + 1) + x;
        }
    } // LEFT 
    else if (direction == "ArrowLeft") {
        if (x < 2) {
            snake[0] = y + 5;
        } else {
            snake[0] = y + (parseInt(x) - 1);
        }
    } // UP
    else if (direction == "ArrowUp") {
        if (y < "b") {
            snake[0] = "e" + x;
        } else {
            snake[0] = String.fromCharCode(y.charCodeAt(0) - 1) + x;
        }
    }

    // Update snake body by shifting values to the left
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = snake[i - 1];
    }

    // Drawing the new head and removing the tail
    document.getElementById(`${tail}`).classList.remove("snakeHead");
    document.getElementById(`${snake[0]}`).classList.add("snakeHead");
}

// Listens for key presses
document.addEventListener("keydown", (event) => {
    const keyName = event.key;
    direction = keyName
    console.log(keyName);
});

// Interval for tickrate
setInterval(() => {
    tick();
}, tickRate * 1000);