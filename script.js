let canvas = {
    width:600,
    height: 400
};

//game
let ballCount = 1;
let gameStart = false;
let ball1 = new ball //(canvas.width/2,canvas.height/2,30,6,6,1, false, 0);
let ballInPlay = false;
let p1 ={
    x: 15,
    y: canvas.height/2,
    width: 10,
    height: 75,
    points: 0
};
let p2 ={
    x: canvas.width-15,
    y: canvas.height/2,
    width: 10,
    height: 75,
    points: 0
};
let gameOver = false;
let timer0 = 5; // ball timer
let timer1 = 5; // reset timer
let ai = {
    speed: {1:3,2:8,3:10}
}

//-----------------------------------------------------------------

//menus
    //main menu
let img1;
let menu1 = {
    x: (canvas.width / 2),
    y: (canvas.height/ 4 * 3),
    width: 60,
    height: 30,
    enabled: true
};
    //menu 2
let menu2 = false;
let btnC = {
    b1 : {x:100, y:25},
    b2 : {x:100, y:100},
    b3 : {x:100, y:175},
    b4 : {x:100, y:250},
    height:50,
    width:50
};
let vars = {
    multiplayer: false,
    pts: 4,
    difficulty: 2,
    mouseControl: false
};
let startButton = {
    x:canvas.width/2,
    y:canvas.height - 50,
    width: 300,
    height: 60
};
    //q menu
let menuQ = false;




function setup(){
    createCanvas(canvas.width, canvas.height);
    frameRate(30);
    img1 = loadImage('./images/PONG.png');
    //INPUT
    // let inpX = 50
    // let inpY = 50
    //let inp = createInput('');
    //inp.position(inpX, inpY)
    //inp.input(() => {
    //   background(200);
    //   let msg = inp.value();
    //   fill(255,255,255);
    //   text(msg, 5, 50);
    //});
}



function draw(){
    background(1,1,1)

    //Menu 1 (main menu);
    if(menu1.enabled == true){
        fill(255,255,255);
        rect(menu1.x - menu1.width / 2,menu1.y, menu1.width,menu1.height);
        //image
        imageMode(CENTER);
        noSmooth();
        image(img1, canvas.width/2, 175, 400, 200);
    }

    //Menu 2 
    if(menu2 == true){
        stroke(255,255,255);
        fill(0,0,0)
        rect(btnC.b1.x, btnC.b1.y, btnC.width, btnC.height);
        rect(btnC.b2.x, btnC.b2.y, btnC.width, btnC.height);
        if(vars.multiplayer == false){
            stroke(255,255,255);
        }else if(vars.multiplayer == true){
            stroke(50,50,50);
        }
        rect(btnC.b4.x, btnC.b4.y, btnC.width, btnC.height);
        rect(btnC.b3.x, btnC.b3.y, btnC.width, btnC.height);
    
    //Start Button
        stroke(255,255,255);
        strokeWeight(10)
        fill(200,200,200);
        rectMode(CENTER);
        rect(startButton.x, startButton.y, startButton.width, startButton.height, 10);
        
//Inside Text

    //Multiplayer
        rectMode(CORNER);
        strokeWeight(3)
        textFont("century gothic");
        if(vars.multiplayer == true){
            noStroke()
            fill(255,255,255);
            textSize(50);
            text('x', btnC.b1.x + 13, btnC.b1.y + 38);
            vars.mouseControl = false;
        }
    //Points to Win
        noStroke()
        fill(255,255,255);
        textSize(40);
        text(vars.pts, btnC.b2.x + 14.5, btnC.b2.y + 40);
    //Difficulty
        if(vars.multiplayer == false){
            textSize(40);
            text(vars.difficulty, btnC.b3.x + 14.5, btnC.b3.y + 39);
        }
    //MouseControls
        if(vars.mouseControl == true){
            textSize(50);
            text('x', btnC.b4.x + 13, btnC.b4.y + 38);
        }

//Outside Text

    //options
        noStroke();
        textSize(24)

        fill(255,255,255);
        text('2 Player Mode', btnC.b1.x + 100, btnC.b1.y + 30);
        text('Points to Win', btnC.b2.x + 100, btnC.b2.y + 30);
        
        if(vars.multiplayer == false){
            fill(255,255,255);
        }else if(vars.multiplayer == true){
            fill(50,50,50);
        }
        text('Difficulty', btnC.b3.x + 100, btnC.b3.y + 30);
        text('Mouse Controls', btnC.b4.x + 100, btnC.b4.y + 30);

    //start button
        textSize(40);
        textAlign(CENTER);
        fill(20,20,20)
        text('Start', startButton.x, startButton.y + 10);

        textAlign(LEFT);
    }

    //Menu ?
    if(menuQ == true){
        text('Controls', 0, 0);
    }


    //-----------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------


    //GAME
    if(gameStart == true){
        if(ballInPlay==true){
            ball1.draw();
            ball1.update();
        }
    //PLAYERS
        rectMode(CENTER);
        fill(255,255,255);
        stroke(255,255,255);
        rect(p1.x, p1.y, p1.width, p1.height);
        rect(p2.x, p2.y, p2.width, p2.height);
    //POINTS
        textSize(40);
        textAlign(CENTER);
        text(p1.points, canvas.width / 2 - 40, 50)
        text(p2.points, canvas.width / 2 + 40, 50)
//CONTROLS
    //MULTIPLAYER
        if(vars.multiplayer == true){
            //Player 1
            if(keyIsDown(87)){ // w
                p1.y -= 10
            }
            if(keyIsDown(83)){ // s
                p1.y += 10
            }
            //Player 2
            if(keyIsDown(UP_ARROW)){ // up arrow
                p2.y -= 10
            }
            if(keyIsDown(DOWN_ARROW)){ // down arrow
                p2.y += 10;
            }
        }
    //SINGLEPLAYER
        if(vars.multiplayer == false && vars.mouseControl == false){
            if(keyIsDown(UP_ARROW) && p1.y > 0 + p1.height/2){
                p1.y -= 5
            }
            if(keyIsDown(DOWN_ARROW) && p1.y < canvas.height - p1.height/2){
                p1.y += 5
            }
        }
    //SINGLEPLAYER "AI"
        if(vars.multiplayer == false && ball1.active == true && ball1.x > canvas.width / 2){
            if(p2.y > ball1.y){
                if(vars.difficulty == 1){
                    p2.y -= ai.speed[1];
                }
                if(vars.difficulty == 2){
                    p2.y -= ai.speed[2];
                }
                if(vars.difficulty == 3){
                    p2.y -= ai.speed[3];
                }
            }
            if(p2.y < ball1.y){
                if(vars.difficulty == 1){
                    p2.y += ai.speed[1];
                }
                if(vars.difficulty == 2){
                    p2.y += ai.speed[2];
                }
                if(vars.difficulty == 3){
                    p2.y += ai.speed[3];
                }
            }
        }
    //MOUSE MOVEMENT
        if(vars.mouseControl == true){
            p1.y = mouseY;
        }

        rectMode(CORNER);
    //Border lines
        stroke(255,255,255);
        fill(255,255,255)
        strokeWeight(2);
        line(0,1,canvas.width,1);
        line(0,canvas.height-1,canvas.width,canvas.height-1);
        if(gameOver == false){
            line(canvas.width/2, 0, canvas.width/2, canvas.height);
        }
    }
    //BALL TIMER
    if(frameCount % 30 == 0 && timer0 > 0 && gameStart == true && gameOver == false){
        timer0 --;
    }
    
    if(timer0 > 0 && gameStart == true && gameOver == false){
        text(timer0,  canvas.width / 2 - 50, canvas.height / 2 + 10);
        text(timer0,  canvas.width / 2 + 50, canvas.height / 2 + 10);
    }
    if(timer0 == 0 && gameStart == true && gameOver == false){
        startGame();
        if(ballCount == 1 || ballCount == 2){
            ball1.xSpeed = 6;
        };
        if(ballCount == 3 || ballCount == 4){
            ball1.xSpeed = -6;
        };
    }

//BALL COLLISION
    //ceiling collision
    if(ball1.x + (ball1.size / 2) > 600){
        Point(1);
        console.log("point 1");
    }
    if(ball1.x - (ball1.size /2) < 0){
        Point(0);
        console.log("point 0");
    }
    
    //player collision
    if(ball1.x - (ball1.size) < p1.x && ball1.y < p1.y + (p1.height/2) && ball1.y > p1.y - (p1.height/2)){
        ball1.xSpeed -= 0.5
        ball1.xSpeed *= -1
        ball1.ySpeed = (((p1.y - ball1.y) / 8) * -1);

    }
    if(ball1.x + (ball1.size) > p2.x && ball1.y < p2.y + (p2.height/2) && ball1.y > p2.y - (p2.height/2)){
        ball1.xSpeed += 0.5
        ball1.xSpeed *= -1
        ball1.ySpeed = (((p2.y - ball1.y) / 8) * -1);
    }
//Win condition
    if(gameOver == true){
        fill(255,255,255);
        textSize(50);
        
        if( frameCount % 30 == 0 && timer1 > 0){
            timer1 --;
        }

        text(timer1,  canvas.width / 2, canvas.height / 2 + 50);
    }
    if(p1.points == vars.pts){ 
        text(('Player 1 wins!'), canvas.width / 2, canvas.height / 2);
    }
    if(p2.points == vars.pts){
        text(('Player 2 wins!'), canvas.width / 2, canvas.height / 2);
    }

    if(timer1 == 0){
    fullReset();
    }
    
}





function mousePressed(){
//console.log(mouseY);

//console.log(p1.y - mouseY);

//Main Menu Button
    if(mouseX < menu1.x+menu1.width / 2&& mouseX > menu1.x-menu1.width / 2&& mouseY < menu1.y+menu1.height && mouseY > menu1.y && menu1.enabled == true){
        ball1 = new ball(canvas.width/2,canvas.height/2,20,6,6,1, false, 0);
        console.log("Menu 2 initiated");
        menu1.enabled = false;
        menu2 = true;
        inpX = 100;
        inpY = 250;
    }

//Menu 2 Buttons
    if(menu2==true){
    //Multiplayer
        if(mouseX < btnC.b1.x+btnC.width && mouseX > btnC.b1.x && mouseY < btnC.b1.y+btnC.height && mouseY >btnC.b1.y){
            if(vars.multiplayer == true){vars.multiplayer = false;}else if(vars.multiplayer == false){vars.multiplayer = true;};
            console.log("2 player mode = " + vars.multiplayer);
        }
    //Points to Win
        if(mouseX < btnC.b2.x+btnC.width && mouseX > btnC.b2.x && mouseY < btnC.b2.y+btnC.height && mouseY >btnC.b2.y){
            if(vars.pts !== 9){
                vars.pts += 1;
            }else if(vars.pts == 9){
                vars.pts = 1;
            }
        }
    //Difficulty
        if(mouseX < btnC.b3.x+btnC.width && mouseX > btnC.b3.x && mouseY < btnC.b3.y+btnC.height && mouseY >btnC.b3.y){
            if(vars.difficulty !== 3){
                vars.difficulty += 1;
            }else if(vars.difficulty == 3){
               vars.difficulty = 1;
            }
        }
    //MouseControls
        if(mouseX < btnC.b4.x+btnC.width && mouseX > btnC.b4.x && mouseY < btnC.b4.y+btnC.height && mouseY >btnC.b4.y){
            if(vars.multiplayer == false){
                if(vars.mouseControl == true){vars.mouseControl = false;}else if(vars.mouseControl == false){vars.mouseControl = true;};
            }
        }
    //Game Start
        if(mouseX < startButton.x+startButton.width/2 && mouseX > startButton.x-startButton.width/2 && mouseY < startButton.y+startButton.height/2 && mouseY >startButton.y-startButton.height/2){
            gameStart = true;
            menu2 = false;
            ballInPlay = true;
            ball1.active = 0;
            console.log("Game Started");
        }


        //-------------------------------------------------------------------------------------------------------

        //
    }
}

function keyPressed(){
    if(keyCode === 27){ // esc
        fullReset();
    }
    if(gameStart == true){
        if(keyCode === 70){ // f
            if(ball1.flash == false){
                ball1.flash = true
                console.log("flash true");
            }else if(ball1.flash == true){
                ball1.flash = false
                console.log("flash false");
            }
        }
    }
}

function Point(side){
    if(vars.mouseControl == false){
        p1.y = canvas.height / 2
    };
    p2.y = canvas.height / 2
    timer0 = 5;
    
    ball1.x = canvas.width/2
    ball1.y = canvas.height/2
    ball1.active = false;
    
    if(side == 0){
        p2.points += 1;
    }else if(side == 1){
        p1.points += 1;
    }
    console.log("ball count " + ballCount);
    ballCount++
    if(ballCount == 5){
        ballCount = 1;
    };

    if(p1.points == vars.pts){
        endGame();
        console.log("p1 wins!");
    }
    if(p2.points == vars.pts){
        endGame();
        console.log("p2 wins!");
    }
}

function endGame(){
    ballInPlay = false
    ball1.active = false
    ball1.xSpeed = 0;
    ball1.ySpeed = 0;
    ball1.flash = false;
    gameOver = true;
}
//0 = left, 1 = right

function startGame(){
//puts the ball in motion;
    //ball vars
    returnBall();
    ball1.active = true;
    ball1.flash = false;
    //game vars
    gameOver = false;
}

function returnBall(){
    ball1.x = canvas.width / 2;
    ball1.y = canvas.height / 2;
    ball1.ySpeed = 6
}

function fullReset(){
    //menu vars
    menu2 = false;
    menu1.enabled = true;
    vars.multiplayer = false;
    vars.pts = 4;
    vars.difficulty = 2;
    vars.mouseControl = false;
    ballInPlay = false
    ballCount = 1;
    timer0 = 5;
    timer1 = 5;

    //ball1 vars
    ball1.xSpeed = 6;
    ball1.ySpeed = 6;
    ball1.active = false;
    ball1.flash = false;

    //game vars
    gameStart = false;
    gameOver = false;
    p1.points = 0;
    p1.y = canvas.width / 2
    p2.points = 0;
    p2.y = canvas.width / 2

}










//to do
//q menu
//fix ball
//clean up code











//https://d2l.cbe.ab.ca/d2l/lms/survey/user/surveys_list.d2l?ou=1153585