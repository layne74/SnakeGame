/*
Description: Simple snake game
Author: Layne Hutchings
Date: 06/01/2023
Incomplete: true
*/

let gridSize = {
    xStart: "a",
    xEnd: "g",
    yStart: "1",
    xEnd: "8",
};

let snake = ["d3", "c3", "b3", "a3", "e3"];
let foodLastLocations = [];
let direction = "ArrowDown";
let foodItemSet = false;
let score = 0;

let tickRate = 0.2; // Seconds

function tick() {
    // let headLocation = document.getElementsByClassName("snakeHead")[0].id;
    move();
    makeFood()
    console.log(foodLastLocations);
    // console.log(score);
}

// Controls movement and user input for snake
function move() {
    snake.forEach(location => {
        document.getElementById(`${location}`).classList.remove("snakeHead")
    });
    // Update snake body by shifting values to the left
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = snake[i - 1];
    }

    let y = snake[0].split("")[0];
    let x = snake[0].split("")[1];
    // RIGHT
    if (direction == "ArrowRight") {
        if (x > 7) {
            snake[0] = y + 1;
        } else {
            snake[0] = y + (parseInt(x) + 1);
        }
        
    } // DOWN
    else if (direction == "ArrowDown") {
        if (y > "g") {
            snake[0] = "a" + x;
        } else {
            snake[0] = String.fromCharCode(y.charCodeAt(0) + 1) + x;
        }
    } // LEFT 
    else if (direction == "ArrowLeft") {
        if (x < 2) {
            snake[0] = y + 8;
        } else {
            snake[0] = y + (parseInt(x) - 1);
        }
    } // UP
    else if (direction == "ArrowUp") {
        if (y < "b") {
            snake[0] = "h" + x;
        } else {
            snake[0] = String.fromCharCode(y.charCodeAt(0) - 1) + x;
        }
    }
    
    let tail = snake[snake.length - 1];

    if (foodLastLocations.length > 0) {
        if (tail == foodLastLocations[0]) {
            snake.push(foodLastLocations[0]);
            foodLastLocations.shift();
        }
        
    } else {
        
    }

    // Drawing the new head and removing the tail
    // document.getElementById(`${tail}`).classList.remove("snakeHead");
    // document.getElementById(`${snake[0]}`).classList.add("snakeHead");

    snake.forEach(location => {
        document.getElementById(`${location}`).classList.add("snakeHead")
    });
}

// Listens for key presses
document.addEventListener("keydown", (event) => {
    const keyName = event.key;

    // Check if a arrow key was pressed
    if (keyName == "ArrowRight" || keyName == "ArrowLeft" || keyName == "ArrowUp" || keyName == "ArrowDown") {
        // Stops the key being set if it is opposite of what is currently set
        if (keyName == "ArrowRight" && direction != "ArrowLeft") {
            direction = keyName;
        } else if (keyName == "ArrowLeft" && direction != "ArrowRight") {
            direction = keyName;
        } else if (keyName == "ArrowUp" && direction != "ArrowDown") {
            direction = keyName;
        } else if (keyName == "ArrowDown" && direction != "ArrowUp") {
            direction = keyName;
        }
    }
});

// Function to randomize a grid position and apply a food class
function makeFood() {
    // Returns a random integer from 1 to 10:
    let xPos = Math.floor(Math.random() * gridSize.xEnd) + 1;

    // Returns a random integer from 1 to 10:
    let yPos = String.fromCharCode(Math.floor(Math.random() * gridSize.xEnd) + 97);

    let gridPos = yPos + xPos;

    if (!foodItemSet) {
        document.getElementById(`${gridPos}`).classList.add("food");
        foodItemSet = true
    }

    if (document.querySelector(`.food`).classList.contains("snakeHead")) {
        let foodLoc = document.querySelector(`.food`);
        foodLoc.classList.remove("food");
        foodItemSet = false;
        foodLastLocations.push(foodLoc.id);
        score++;
        
    }

    
}


// Interval for tickrate
setInterval(() => {
    tick();
}, tickRate * 1000);