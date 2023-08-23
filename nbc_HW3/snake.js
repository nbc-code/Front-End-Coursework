const left = 37;
const right = 39;
const up = 38;
const down = 40;

var x = 700;
var y = 350;
var dx = 0;
var dy = 0;

var direction = right;

var isEaten = false;
var fruitScore = 3;
var snakeArr = [];
var isPaused;
var firstFruit = true;
var id;

function snake()
{
    var s = document.getElementById("snakeCanvas");
    var context = s.getContext("2d");
    fruit();

        id = setInterval(function run() {
            if (isPaused) {
                var score = getScore();
                moveSnake(context, s);
                if (eatFruit()) {
                    isEaten = true;
                    fruitScore++;
                    document.getElementById("score").appendChild(score);
                }
                if (isPaused) {

                }
            }
        },300);
}

function changeDir(input)
{
    switch (input)
    {
        case "left":
            if(direction != right)
                direction = left;
            break;
        case "right":
            if(direction != left)
                direction = right;
            break;
        case "up":
            if(direction != down)
                direction = up;
            break;
        case "down":
            if(direction != up)
                direction = down;
            break;
    }
}
function getScore()
{
    var userScore = document.getElementById("score");
    userScore.innerHTML = "Score: " + (fruitScore - 3);
    return userScore;
}

function pause()
{
    var stop = document.getElementById("startBtn");

    if(!isPaused)
    {
        stop.value = "Stop";
        isPaused = true;
        snake();
    }
    else
    {
       stop.value = "Start";
       isPaused = false;
       clearInterval(id);
    }
}

function fruit()
{
    var f = document.getElementById("fruitCanvas");
    var fruitContext = f.getContext("2d");

    if(firstFruit)
    {
        placeFruit(fruitContext);
        firstFruit = false;
    }

        id2 = setInterval(function onTick()
        {
            if(isPaused)
            {
                if (isEaten) {
                    fruitContext.clearRect(0, 0, f.width, f.height);
                    placeFruit(fruitContext);
                    isEaten = false;
                }
            }
        }, 250);
}

function drawSnake(context, s)
{
    context.clearRect(0, 0, s.width, s.height);
    context.beginPath();

    context.fillStyle = "white";

    x += dx;
    y += dy;
    dx = 0;
    dy = 0;

    for(let i=0; i < snakeArr.length; i++)
    {
        context.rect(snakeArr[i].x, snakeArr[i].y, 50, 50);
    }

    context.rect(x, y, 50, 50);

    context.fill();
    context.closePath();
}

function moveSnake(context, s)
{
    for(let i=0; i < snakeArr.length - 1; i++)
    {
        snakeArr[i] = snakeArr[i+1];
    }

    snakeArr[fruitScore - 2] = {x: x, y: y};

    direction = snakeDir();

    if(direction == left)
    {
        dx -= 50;
    }
    else if(direction == right)
    {
        dx += 50;

    }
    else if(direction == up)
    {
       dy -= 50;
    }
    else if(direction == down)
    {
        dy += 50;
    }

    drawSnake(context, s);

    if(gameOver())
    {
        clearInterval(id);
        clearInterval(id2);
        location.reload();
    }

}

function snakeDir()
{
    document.onkeydown = function (event)
    {
        event = event || window.event;
        var charCode = event.keyCode || event.which;

        if(charCode == left && direction != right)
        {
            event.preventDefault();
            direction = left;
        }
        else if(charCode == right && direction != left)
        {
            event.preventDefault();
            direction = right;
        }
        else if(charCode == up && direction != down)
        {
            event.preventDefault();
            direction = up;
        }
        else if(charCode == down && direction != up)
        {
            event.preventDefault();
            direction = down;
        }
        else
            {
                event.returnValue = null;
            }
    }

    return direction;
}
function gameOver()
{
    if(x > 1450 || x < 0 || y > 700 || y < 0)
    {
        alert("Game over!");
        return true;
    }

    for(let i=0; i < snakeArr.length; i++)
    {
        if(x == snakeArr[i].x && y == snakeArr[i].y)
        {
            alert("Game over!");
            return true;
        }
    }

    return false;
}

function placeFruit(fruitContext)
{
    fruitX = Math.floor(Math.random() * 30) * 50;
    fruitY = Math.floor(Math.random() * 15) * 50;

    fruitContext.beginPath();
    fruitContext.fillStyle = "red";
    fruitContext.rect(fruitX, fruitY, 50, 50);
    fruitContext.fill();
    fruitContext.closePath();
}

function eatFruit()
{
    if(x == fruitX && y == fruitY)
    {
        return true;

    }
    return false;
}