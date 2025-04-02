let userpaddle = document.getElementById("userpaddle");
let aipaddle = document.getElementById("aipaddle");
let ball = document.getElementById("ball");
let gamebox = document.getElementById("gamebox");
let zpressed = false;
let xpressed = false;


let userscore = document.getElementById("userscore");
let aiscore = document.getElementById("aiscore");
 

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key == 'z') {
        zpressed = true;
        
    }
    else if (e.key == 'x') {
        xpressed = true;
       
    }
}

function keyUpHandler(e) {
    if (e.key == 'z') {
        zpressed = false;
       
    }
    else if (e.key == 'x') {
        xpressed = false;
      
    }
}


//initial velocity to ball 
let Vx = -2;
let Vy = -3;
let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));

//dotted line k center se start krege
function reset() {
    ball.style.left = "50%";
    ball.style.top = "50%";
    Vx = -2;
    Vy = -3;
    V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));
}


function checkcollision(activepaddle) {
    let balltop = ball.offsetTop;
    let ballbottom = ball.offsetTop + ball.offsetHeight;
    let ballleft = ball.offsetLeft;
    let ballright = ball.offsetLeft + ball.offsetWidth;

    let paddletop = activepaddle.offsetTop;
    let paddlebottom = activepaddle.offsetTop + activepaddle.offsetHeight;
    let paddleleft = activepaddle.offsetLeft;
    let paddleright = activepaddle.offsetLeft + activepaddle.offsetWidth;

    
    if (
        ballbottom > paddletop && balltop < paddlebottom &&
        ballright > paddleleft &&
        ballleft < paddleright
    ) {
        return true;
    }

    else {
        return false;
    }
}


function gameloop() {
    if (ball.offsetLeft < 0) {
        aiscore.innerHTML = parseInt(aiscore.innerHTML) + 1;
           reset();
    }
    if (ball.offsetLeft > gamebox.offsetWidth - ball.offsetWidth) {
        userscore.innerHTML = parseInt(userscore.innerHTML) + 1;
        reset();
    }
    if (ball.offsetTop < 0) {
        Vy = -Vy;
    }
    if (ball.offsetTop > gamebox.offsetHeight - ball.offsetHeight) {
        Vy = -Vy;
    }

    let paddle = ball.offsetLeft < gamebox.offsetWidth / 2 ? userpaddle : aipaddle;

    let ballcenterY = ball.offsetTop + ball.offsetHeight / 2;
    let paddlecenterY = paddle.offsetTop + paddle.offsetHeight / 2;

    let angle = 0;

    if (checkcollision(paddle)) {
        if (paddle == userpaddle) {
            if (ballcenterY < paddlecenterY) {
                angle = -Math.PI / 4;
            }
            else if (ballcenterY > paddlecenterY) {
                angle = Math.PI / 4;
            }
            else {
                angle = 0;
            }
        }
        else if (paddle == aipaddle) {
            if (ballcenterY < paddlecenterY) {
                angle = -3 * Math.PI / 4;
            }
            else if (ballcenterY > paddlecenterY) {
                angle = 3 * Math.PI / 4;
            }
            else {
                angle = 0;
            }
        }
        V = V + 0.2;
        Vx = V * Math.cos(angle);
        Vy = V * Math.sin(angle);
    }

    let aidelay = 0.3;
    aipaddle.style.top =
        aipaddle.offsetTop + (ball.offsetTop - aipaddle.offsetTop - aipaddle.offsetHeight / 2) * aidelay + "px";



    ball.style.left = ball.offsetLeft + Vx + "px";
    ball.style.top = ball.offsetTop + Vy + "px";

    if (zpressed && userpaddle.offsetTop > 55) {
        userpaddle.style.top = userpaddle.offsetTop - 5 + "px";
    }
    if (xpressed && userpaddle.offsetTop < gamebox.offsetHeight
        - userpaddle.offsetHeight + 45
    ) {
        userpaddle.style.top = userpaddle.offsetTop + 5 + "px";
    }
    requestAnimationFrame(gameloop);
}
gameloop();