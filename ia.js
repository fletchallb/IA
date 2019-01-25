var canvas = document.getElementById("myCanvas"),
ctx = canvas.getContext("2d");

//paddle event listener
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler,false);

//starting postion of the robber
var x = Math.floor(Math.random()*(canvas.height-100));
var y = 50;
var xSpeed = 0.5;
var robberWidth = 50;
var xRandom = Math.floor(Math.random()*(canvas.width-75));
var xRandom2 = Math.floor(Math.random()*(canvas.width-75));
var xRandom3 = Math.floor(Math.random()*(canvas.width-75));
var xRandom4 = Math.floor(Math.random()*(canvas.width-75));
var xRandom5 = Math.floor(Math.random()*(canvas.width-75));
var xRandom6 = Math.floor(Math.random()*(canvas.width-75));

var xPaddle = canvas.width/2;
var yPaddle = canvas.height - 15;
var paddleWidth = 95;
var paddleHeight = 15;
var paddleSpeed = 1;
var leftPressed = false;
var rightPressed = false;
var score = 0;

var firstnumber = Math.floor(Math.random()*99+1);   
var exponent = Math.floor(Math.random()*9+2);
var answers = [];
answers[0] = (firstnumber*exponent)+"x^"+(exponent-1);
answers[1] = (firstnumber*exponent*2)+"x^"+(exponent+1);
answers[2] = (firstnumber-exponent)+"x^"+(exponent-1);
answers[3] = (exponent)+"x^"+(firstnumber);

var randomAnswer1 = Math.floor(Math.random()*4);
var randomAnswer2 = Math.floor(Math.random()*4);
while(randomAnswer2 == randomAnswer1)
{
    randomAnswer2 =  Math.floor(Math.random()*4);
}
var randomAnswer3 = Math.floor(Math.random()*4);
while(randomAnswer3 == randomAnswer2 || randomAnswer3 == randomAnswer1)
{
    randomAnswer3 =  Math.floor(Math.random()*4);
}
var randomAnswer4 = Math.floor(Math.random()*4);
while(randomAnswer4 == randomAnswer3 || randomAnswer4 == randomAnswer2 || randomAnswer4 == randomAnswer1)
{
    randomAnswer4 =  Math.floor(Math.random()*4);
}

var bombs = [];
var numberofbombs = 10;
var drop = true;
for(var c = 0; c<numberofbombs; c++)
{
    bombs[c] = {x: x+25, y: 75, speed: 0};
}
var aGuess = false;
var bGuess = false;
var cGuess = false;
var dGuess = false;
var response;

var turns = 0;
var newscore = 0;

var enter = false;
var interval;
interval = setInterval(menuScreen,1);
menuScreen();
play();
askQuestion();
gameOver();
function menuScreen()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "65px Arial";
    ctx.fillText("KABOOM!", 100, 125);
    ctx.font = "20px Times New Roman";
    ctx.fillText("Press Enter to play", 20, canvas.height-35);
    if(enter==true)
    {
        clearInterval(interval);
        interval = setInterval(play,1);
    }
}
function play()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBombs();
    drawBackground();
    drawRobber();
    drawPaddle();
    printScore();
    checkScore();
    x = x+xSpeed;
    checkBorder();
    for(var i = 0; i < bombs.length; i++)
    {
        bombs[i].y = bombs[i].y + bombs[i].speed;
    }
    if(drop == true)
    {
        bombs[0].speed = 1;
        for(var c = 1; c<bombs.length; c++)
        {
            if(bombs[c-1].y==canvas.height/4)
            {
                bombs[c].speed = 1;
                bombs[c].x = x;
            }
    
        }
    }
    if(leftPressed==true)
    {
        xPaddle-=paddleSpeed;
    }
    if(rightPressed==true)
    {
        xPaddle+=paddleSpeed;
    }
}
function drawBombs()
{
    for(var c = 0; c<bombs.length; c++)
    {
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.arc(bombs[c].x,bombs[c].y,10,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
    
}
function drawBackground()
{
    //making the blue background
    ctx.fillStyle = "blue";
    ctx.fillRect(0,0,700,100);
}
function drawRobber()
{
    ctx.fillStyle = "tan";
    ctx.fillRect(x, y, robberWidth, robberWidth);
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, robberWidth, 12);
    ctx.fillStyle = "black";
    ctx.fillRect(x,y+20, robberWidth, 30)
    ctx.fillStyle = "white";
    ctx.fillRect(x, y+30, robberWidth, 10);
    ctx.fillRect(x+10,y+3,10,6);
    ctx.fillRect((x+robberWidth)-20,y+3,10,6);

}
function drawPaddle()
{
    ctx.fillStyle = "black";
    ctx.fillRect(xPaddle, yPaddle, paddleWidth, paddleHeight);
}
function printScore()
{
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + (score+newscore), 20, 35);
    ctx.closePath();
}
function checkScore()
{  
    for(var c = 0; c<bombs.length; c++)
    {
        if(bombs[c].y==canvas.height)
        {
            if(bombs[c].x>=xPaddle && bombs[c].x<=xPaddle+paddleWidth)
            {
                if(turns==1)
                {
                    newscore++;
                    if(newscore%10==0)
                    {
                        for(var c = 0; c<numberofbombs; c++)
                        {
                            bombs[c] = {x: x+25, y: 75, speed: 0};
                        }
                    }
                    if(score==20 || score+newscore == 20)
                    {
                        xSpeed = 1;
                    }
                    if(score==70 || score+newscore==70)
                    {
                        xSpeed = 2;
                        paddleSpeed = 1.5;
                        paddleWidth = 135;
                    }
                }
                else
                {
                    score++;
                    if(score%10==0)
                    {
                        for(var c = 0; c<numberofbombs; c++)
                        {
                            bombs[c] = {x: x+25, y: 75, speed: 0};
                        }
                    }
                    if(score==20 || score+newscore == 20)
                    {
                        xSpeed = 1;
                    }
                    if(score==70 || score+newscore==70)
                    {
                        xSpeed = 2;
                        paddleSpeed = 1.5;
                        paddleWidth = 135;
                    }
                }    
            }
            else
            {
                drop = false;
                for(var i = 0; i < bombs.length; i++)
                {
                    bombs[i].y = 75;
                    bombs[i].x = x+25;
                    bombs[i].speed = 0;
                }
                if(turns==0)
                {
                    clearInterval(interval);
                    interval = setInterval(askQuestion,1);
                }
                if(turns==1)
                {
                    clearInterval(interval);
                    interval = setInterval(gameOver,1);
                }
                
            }
        }
        
    }
}
function checkBorder()
{
    if(x+xSpeed>canvas.width-robberWidth||x+xSpeed<0)
    {
        xSpeed=-1*xSpeed;
    }
    if(x+xSpeed==xRandom || x+xSpeed == xRandom2 || x+xSpeed == xRandom3 || x+xSpeed == xRandom4 || 
        x+xSpeed == xRandom5 || x+xSpeed == xRandom6 || x+xSpeed==xRandom+1 || 
        x+xSpeed == xRandom2+1 || x+xSpeed == xRandom3+1 || x+xSpeed == xRandom4+1 || x+xSpeed == xRandom5+1 || 
        x+xSpeed == xRandom6+1) 
    {
        xSpeed=-1*xSpeed;
        xRandom = Math.floor(Math.random()*625);
        xRandom2 = Math.floor(Math.random()*625);
        xRandom3 = Math.floor(Math.random()*625);
        xRandom4 = Math.floor(Math.random()*625);
        xRandom5 = Math.floor(Math.random()*625);
        xRandom6 = Math.floor(Math.random()*625);   
    }
    if(xPaddle<0)
    {
        xPaddle = 0;
    }
    if(xPaddle+paddleWidth>canvas.width)
    {
        xPaddle = canvas.width-paddleWidth;
    }
}
function askQuestion()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "lightgreen";
    ctx.font = "20px Times New Roman";
    ctx.fillText("Answer this question correctly to earn an extra life:", 20, 35);
    ctx.fillStyle = "white";
    ctx.fillText("Press A,B,C, or D on the keyboard to select an answer", 20, canvas.height-35);
    generateQuestionAndAnswers();
    if(aGuess == true)
    {
        if(answers[randomAnswer1] == answers[0])
        {
            response = true;
        }
        else
        {
            response = false;
        }
    }
    if(bGuess == true)
    {
        if(answers[randomAnswer2] == answers[0])
        {
            response = true;
        }
        else
        {
            response = false;
        }
    }
    if(cGuess == true)
    {
        if(answers[randomAnswer3] == answers[0])
        {
            response = true;
        }
        else
        {
            response = false;
        }
    }
    if(dGuess == true)
    {
        if(answers[randomAnswer4] == answers[0])
        {
            response = true;
        }
        else
        {
            response = false;
        }
    }
    if(response == true)
    {
        turns++;
        clearInterval(interval);
        interval = setInterval(play,1);
        drop = true;
    }
    if(response == false)
    {
        clearInterval(interval);
        interval = setInterval(gameOver,1);
    }
    ctx.closePath();
}
function generateQuestionAndAnswers()
{
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "34px Times New Roman";
    ctx.fillText("What is the derivative of " + firstnumber + "x^" + exponent+"?", 20, 125);
    ctx.font = "24px Times New Roman";
    ctx.fillText("A] " + answers[randomAnswer1], 20, 175);
    ctx.fillText("B] " + answers[randomAnswer2], 20, 225);
    ctx.fillText("C] " + answers[randomAnswer3], 20, 275);
    ctx.fillText("D] " + answers[randomAnswer4], 20, 325);
    ctx.closePath();
}
function gameOver()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "50px Arial";
    ctx.fillText("GAME OVER", 100, 200);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + (score+newscore), 200, 250);
}
function keyDownHandler(e) 
{
    if(e.keyCode==39)
    {
        rightPressed = true;
    }
    else if(e.keyCode==37)
    {
        leftPressed = true;
    }
    else if(e.keyCode==65)
    {
        aGuess = true;
    }
    else if(e.keyCode==66)
    {
        bGuess = true;
    }
    else if(e.keyCode==67)
    {
        cGuess = true;
    }
    else if(e.keyCode==68)
    {
        dGuess = true;
    }
    else if(e.keyCode==13)
    {
        enter = true;
    }
}
function keyUpHandler(e)   
{
    if(e.keyCode==39)
    {
        rightPressed = false;
    }
    else if(e.keyCode==37)
    {
        leftPressed = false;
    }
    else if(e.keyCode==65)
    {
        aGuess = false;
    }
    else if(e.keyCode==66)
    {
        bGuess = false;
    }
    else if(e.keyCode==67)
    {
        cGuess = false;
    }
    else if(e.keyCode==68)
    {
        dGuess = false;
    }
    else if(e.keyCode==13)
    {
        enter = false;
    }
}