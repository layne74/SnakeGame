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

let snake = ["d3"];
let foodLastLocations = [];
let direction = "";
let foodItemSet = false;
let score = 1;

// change the speed of the game
let tickRate = 0.2; // Seconds

function tick() {

    move();
    makeFood();

}

// Controls movement and user input for snake
function move() {

    console.log(snake);

    let y = snake[snake.length - 1].split("")[0];
    let x = snake[snake.length - 1].split("")[1];
    let tail = snake[0];

    // maintains the snakes length
    if (snake.length > score) {
        snake.shift();
        // removes the "tail"
        document.getElementById(`${tail}`).classList.remove("snake");
        console.log("hit");
    }

    // RIGHT
    if (direction == "ArrowRight") {
        if (x > 7) {
            snake.push(y + 1);
        } else {
            snake.push(y + (parseInt(x) + 1));
        }

    } // DOWN
    else if (direction == "ArrowDown") {
        if (y > "g") {
            snake.push("a" + x);
        } else {
            snake.push(String.fromCharCode(y.charCodeAt(0) + 1) + x);
        }
    } // LEFT 
    else if (direction == "ArrowLeft") {
        if (x < 2) {
            snake.push(y + 8);
        } else {
            snake.push(y + (parseInt(x) - 1));
        }
    } // UP
    else if (direction == "ArrowUp") {
        if (y < "b") {
            snake.push("h" + x);
        } else {
            snake.push(String.fromCharCode(y.charCodeAt(0) - 1) + x);
        }
    }
    

    if (direction != "") {

        // Drawing the new head and removing the tail
        document.getElementById(`${snake[snake.length - 1]}`).classList.add("snake", `${snakeHeadOrientation(direction)}`);

        // Removes the head from the second block
        document.getElementById(`${snake[snake.length - 2]}`).classList.remove("snakeHead_up", "snakeHead_down", "snakeHead_left", "snakeHead_right", "snakeHead_neutral");
        

        // Slices snake array excluding head, looks for head in it.
        if ((snake.slice(0, snake.length - 2)).includes(snake[snake.length - 1])) {
            death();
        }

    }
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

    if (!foodItemSet) {
        // Returns a random integer from 1 to 10:
        let xPos = Math.floor(Math.random() * gridSize.xEnd) + 1;

        // Returns a random integer from 1 to 10:
        let yPos = String.fromCharCode(Math.floor(Math.random() * gridSize.xEnd) + 97);
        let gridPos = yPos + xPos;

        // Finds the position on the grid and adds the food class
        // and changes food state to true
        document.getElementById(`${gridPos}`).classList.add("food");
        foodItemSet = true;
    }

    // If the food block has the "snakeHead" class, the class is removed, 
    // food state set to false, the score is updated and refreshed on screen
    if (document.querySelector(`.food`).classList.contains("snake")) {
        let foodLoc = document.querySelector(`.food`);
        foodLoc.classList.remove("food");
        foodItemSet = false;
        score++;
        updateScore();
    }

}

// Change the score value on screen
function updateScore() {
    document.getElementById("score").innerHTML = score;
}

function snakeHeadOrientation(orientation) {

    if (orientation == "ArrowUp") {
        return "snakeHead_up"
    } else if (orientation == "ArrowDown") {
        return "snakeHead_down"
    } else if (orientation == "ArrowLeft") {
        return "snakeHead_left"
    } else if (orientation == "ArrowRight") {
        return "snakeHead_right"
    }
}


// Interval for tickrate
let ticker = setInterval(() => {
    tick();
}, tickRate * 1000);

function death() {
    alert("Oh no, You died!");
    snake = ["d3"];
    foodLastLocations = [];
    direction = "";
    foodItemSet = false;
    score = 1;
}

function clearGrid() {

}

