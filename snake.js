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

// Variables used in the game logic
let snake = ["d3"];
let direction = "";
let lastDirection = "";
let foodItemSet = false;
let score = 0;
let highScore = 0;
let foodArr = [
    "apple-icon-old.png",
    "cherry-icon-old.png",
    "grapes-icon-old.png"
];

// change the speed of the game
let tickRate = 0.23; // Seconds

// Checks/sets the high score
setHighScore()

function tick() {
    move();
    makeFood();
    checkGameStatus();
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
            document.getElementById(`${tail}`).classList.remove("tail", "snake", "snakeHead_up", "snakeHead_down", "snakeHead_left", "snakeHead_right");
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

        // Adds the tail class to the last item it there is more than 1 point
        if (score >= 1) {
            document.getElementById(`${snake[0]}`).classList.add("tail");
        }

        // Drawing the new head
        document.getElementById(`${snake[snake.length - 1]}`).classList.add("snake", `${snakeHeadOrientation(direction)}`);

        // For if the game has just started
        if (score > 0) {
            // Removes the head from the second block
            document.getElementById(`${snake[snake.length - 2]}`).classList.remove("snakeHead_up", "snakeHead_down", "snakeHead_left", "snakeHead_right");
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
    let gridPos;
    if (!foodItemSet) {
        while (true) {
            // Returns a random integer from 0 to 8:
            let xPos = Math.floor(Math.random() * gridSize.xEnd) + 1;

            // Returns a random string from a to g:
            let yPos = String.fromCharCode(Math.floor(Math.random() * gridSize.xEnd) + 97);
            gridPos = yPos + xPos;

            if (!snake.includes(gridPos)) {
                break;
            }
        }

        // Finds the position on the grid and adds the food class
        // and changes food state to true
        document.getElementById(`${gridPos}`).classList.add("food");
        document.getElementById(`${gridPos}`).style.backgroundImage = randomFoodImage(); /////// TESTING

        foodItemSet = true;
    }

    // If the food block has the "snakeHead" class, the class is removed, 
    // food state set to false, the score is updated and refreshed on screen
    if (document.querySelector(`.food`).classList.contains("snake")) {
        let foodLoc = document.querySelector(`.food`);
        foodLoc.classList.remove("food");
        foodLoc.style.removeProperty('background-image');
        foodItemSet = false;
        score++;
        updateScore();
    }
}

// Change the score value on screen
function updateScore() {
    document.getElementById("score").innerHTML = formatScore(score);
    setHighScore();
}

// Based on the headed direction, a class name is returned
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

// Alerts the user of their demise, resets the game
function death() {
    alert("Oh no, You died!");
    resetGame();
}

// Alerts the user of their demise, resets the game
function win() {
    alert("Oh yes, You won!");
    resetGame();
}

// Selects the entire grid, removes all snake related classes
function resetGame() {
    let wholeGrid = document.querySelectorAll('.grid-location');
    wholeGrid.forEach(element => {
        element.classList.remove(
            "snake",
            "snakeHead_up",
            "snakeHead_down",
            "snakeHead_left",
            "snakeHead_right",
            "food",
            "tail"
        );
        element.style.removeProperty('background-image');
    });

    snake = ["d3"];
    direction = "";
    lastDirection = "";
    foodItemSet = false;
    score = "000";
    updateScore();

    // Sets default position for the snake.
    document.getElementById('d3').classList.add("snake", "snakeHead_up");
}

// Sets the high score. Stored in local storage.
function setHighScore() {
    let storedHighScore = localStorage.getItem("snakeHighScore");

    // If there is a "highscore" in storage, set it in the game
    if (storedHighScore) {
        highScore = storedHighScore;
    }

    // if the current score is higher than the high score, update it in the game and in storage
    if (parseInt(score) > parseInt(highScore)) {
        highScore = score;
        localStorage.setItem("snakeHighScore", formatScore(highScore));
    }

    // Display the highscore
    document.getElementById("high-score").innerHTML = formatScore(highScore);
}

// Resets the high score
function resetHighScore() {
    localStorage.setItem("snakeHighScore", "000");
    document.getElementById("high-score").innerHTML = "000";
}

// Takes in int, adds padding 000, returns string
function formatScore(num) {
    let scoreIn = num.toString()
    let formattedScore = ('000' + scoreIn).substring(scoreIn.length);
    return formattedScore;
}

// Picks a random index in the array of image names, returns a string url(/path/to/file)
function randomFoodImage() {
    let idx = Math.floor(Math.random() * foodArr.length - 1) + 1;
    return `url(./images/food/${foodArr[idx]})`;
}

// Function that checks for death of for win
function checkGameStatus() {
    // Slices snake array excluding head, looks for head in it.
    if ((snake.slice(0, snake.length - 2)).includes(snake[snake.length - 1])) {
        death();
    }
    // 64 points is the max a player can get
    if (score == 64) {
        win();
    }
}