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
let direction = "";
let lastDirection = "";
let foodItemSet = false;
let score = 0;

// change the speed of the game
let tickRate = 0.2; // Seconds

function tick() {

    move();
    makeFood();

}

// Controls movement and user input for snake
function move() {
    // Checks if a direction has been set
    if (direction != "") {

        // x and y co-ordinate and the tail position (stored before changed)
        let y = snake[snake.length - 1].split("")[0];
        let x = snake[snake.length - 1].split("")[1];
        let tail = snake[0];

        // maintains the snakes length
        if (snake.length > score) {
            //removes the tail from snake array
            snake.shift();
            // removes classes from the "tail"
            document.getElementById(`${tail}`).classList.remove("snake", "snakeHead_up", "snakeHead_down", "snakeHead_left", "snakeHead_right", "snakeHead_neutral");
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

        // Drawing the new head
        document.getElementById(`${snake[snake.length - 1]}`).classList.add("snake", `${snakeHeadOrientation(direction)}`);

        // For if the game has just started
        if (score > 0) {
            // Removes the head from the second block
            document.getElementById(`${snake[snake.length - 2]}`).classList.remove("snakeHead_up", "snakeHead_down", "snakeHead_left", "snakeHead_right", "snakeHead_neutral");
        }

        // Slices snake array excluding head, looks for head in it.
        if ((snake.slice(0, snake.length - 2)).includes(snake[snake.length - 1])) {
            death();
        }

        // Update the previous direction
        lastDirection = direction;

    }
}

// Listens for key presses
document.addEventListener("keydown", (event) => {
    const keyName = event.key;

    // Check if a arrow key was pressed
    if (keyName == "ArrowRight" || keyName == "ArrowLeft" || keyName == "ArrowUp" || keyName == "ArrowDown") {
        // Stops the key being set if it is opposite of what is currently set
        if (keyName == "ArrowRight" && lastDirection != "ArrowLeft") {
            direction = keyName;
        } else if (keyName == "ArrowLeft" && lastDirection != "ArrowRight") {
            direction = keyName;
        } else if (keyName == "ArrowUp" && lastDirection != "ArrowDown") {
            direction = keyName;
        } else if (keyName == "ArrowDown" && lastDirection != "ArrowUp") {
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
    direction = "";
    foodItemSet = false;
    score = 0;
    clearGrid();
    updateScore();
}

// Selects the entire grid, removes all snake related classes
function clearGrid() {
    let wholeGrid = document.querySelectorAll('.grid-location');
    wholeGrid.forEach(element => {
        element.classList.remove(
            "snake",
            "snakeHead_up",
            "snakeHead_down",
            "snakeHead_left",
            "snakeHead_right",
            "snakeHead_neutral",
            "food"
        )
        // Sets default position for the snake.
        document.getElementById('d3').classList.add("snake", "snakeHead_neutral");
    });
}

function setHighScore() {
    // TODO
}
