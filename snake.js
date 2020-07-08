
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Loading images
let ground = new Image();
ground.src = "img/ground.png";

// Creating unit
let box = 32;

// create snake array and initialize body
let snake = [];
snake[0] = {x: 9*box, y: 10*box};

// create food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// create score var
let score = 0;

// control the snake 
let d;
document.addEventListener("keydown", direction);

function direction(event) {
    switch(event.keyCode) {
        case 37: 
            if(d!="RIGHT") d="LEFT";
            break;
        case 38:
            if(d!="DOWN") d="UP";
            break;
        case 39:
            if(d!="LEFT") d="RIGHT";
            break;
        case 40:
            if(d!="UP") d="DOWN";
            break;
    }
}

// check collision
function collision(head, array) {
    for(let i =0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y)
            return true;
    }
    return false;
}
// draw game on canvas
function draw() {
    ctx.drawImage(ground, 0, 0);
    // draw snake
    for(let i=0; i<snake.length; i++){
        ctx.fillStyle = /*( i==0 )?"green" :*/ "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle="black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    // draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);


    // old head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    }
    else {
        // remove tail
        snake.pop();
    }

    //add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    // game over conditions
    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    // draw score
    ctx.fillStyle = "white";
    ctx.font="45px Changa One";
    ctx.fillText(score, 2*box, 1.6*box);
}
let game = setInterval(draw, 75);
