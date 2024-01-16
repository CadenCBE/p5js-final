let canvas = {
    width:600,
    height: 400
};

//game
let ballCount = 1;
let gameStarted = 0;
let offScreen = 10000;
let ball1 = new ball
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
let win = false;
let timer0 = 5;
let timer1 = 5;

//-----------------------------------------------------------------

//menus
let m2Button = {
    x: (canvas.width / 2)-30,
    y: (canvas.height/2)-15,
    width:60,
    height: 30,
    enabled: true
};
let menu2 = false;
let buCond = {
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
    y:350,
    width: 300,
    height: 60
};




function setup(){
    createCanvas(canvas.width, canvas.height);
    frameRate(30);

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

    //MENUS

    if(m2Button.enabled == true){
        fill(255,255,255);
        rect(m2Button.x,m2Button.y, m2Button.width,m2Button.height);
    }

//Menu Buttons

    //options
    if(menu2 == true){
        stroke(255,255,255);
        fill(0,0,0)
        rect(buCond.b1.x, buCond.b1.y, buCond.width, buCond.height);
        rect(buCond.b2.x, buCond.b2.y, buCond.width, buCond.height);
        if(vars.multiplayer == false){
            stroke(255,255,255);
        }else if(vars.multiplayer == true){
            stroke(50,50,50);
        }
        rect(buCond.b4.x, buCond.b4.y, buCond.width, buCond.height);
        rect(buCond.b3.x, buCond.b3.y, buCond.width, buCond.height);
    
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
            text('x', buCond.b1.x + 13, buCond.b1.y + 38);
            vars.mouseControl = false;
        }
    //Points to Win
        noStroke()
        fill(255,255,255);
        textSize(40);
        text(vars.pts, buCond.b2.x + 14.5, buCond.b2.y + 40);
    //Difficulty
        if(vars.multiplayer == false){
            textSize(40);
            text(vars.difficulty, buCond.b3.x + 14.5, buCond.b3.y + 39);
        }
    //MouseControls
        if(vars.mouseControl == true){
            textSize(50);
            text('x', buCond.b4.x + 13, buCond.b4.y + 38);
        }

//Outside Text

    //options
        noStroke();
        textSize(24)
        textFont("century gothic");

        fill(255,255,255);
        text('2 Player Mode', buCond.b1.x + 100, buCond.b1.y + 30);
        text('Points to Win', buCond.b2.x + 100, buCond.b2.y + 30);
        
        if(vars.multiplayer == false){
            fill(255,255,255);
        }else if(vars.multiplayer == true){
            fill(50,50,50);
        }
        text('Difficulty', buCond.b3.x + 100, buCond.b3.y + 30);
        text('Mouse Controls', buCond.b4.x + 100, buCond.b4.y + 30);

    //start button
        textSize(40);
        textAlign(CENTER);
        fill(20,20,20)
        text('Start', startButton.x, startButton.y + 10);

        textAlign(LEFT);
    }


    //-----------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------


    //GAME
    if(gameStarted == 1){

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
                    p2.y -= 2
                }
                if(vars.difficulty == 2){
                    p2.y -= 4
                }
                if(vars.difficulty == 3){
                    p2.y -=8
                }
            }
            if(p2.y < ball1.y){
                if(vars.difficulty == 1){
                    p2.y += 2
                }
                if(vars.difficulty == 2){
                    p2.y += 4
                }
                if(vars.difficulty == 3){
                    p2.y +=8
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
        if(win == false){
            line(canvas.width/2, 0, canvas.width/2, canvas.height);
        }
    }
    //BALL TIMER
    if(frameCount % 30 == 0 && timer0 > 0 && gameStarted == true && win == false){
        timer0 --;
    }
    
    if(timer0 > 0 && gameStarted == true && win == false){
        text(timer0,  canvas.width / 2 - 50, canvas.height / 2);
        text(timer0,  canvas.width / 2 + 50, canvas.height / 2);
    }
    if(timer0 == 0 && gameStarted == true && win == false){
        ball1.flash = false;
        ball1.active = true;
        ball1.ySpeed = 6;
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

    
    if(win == true){
        fill(255,255,255);
        textSize(50)
        
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
    menu2 = false;
    m2Button.enabled = true;
    vars.multiplayer = false;
    vars.pts = 4;
    vars.difficulty = 2;
    vars.mouseControl = false;
    ballCount = 1;
    gameStarted = 0;
    p1.points = 0;
    p2.points = 0;

    win = false;
    timer1 = 5;
    }
    
}





function mousePressed(){
//console.log(mouseY);

//console.log(p1.y - mouseY);

//Main Menu Button
    if(mouseX < m2Button.x+m2Button.width && mouseX > m2Button.x && mouseY < m2Button.y+m2Button.height && mouseY > m2Button.y && m2Button.enabled == true){
        ball1 = new ball(canvas.width/2,canvas.height/2,30,6,6,1, false, 0);
        console.log("Menu 2 initiated");
        m2Button.enabled = false;
        menu2 = true;
        inpX = 100
        inpY = 250
    }

//Menu 2 Buttons
    if(menu2==true){
    //Multiplayer
        if(mouseX < buCond.b1.x+buCond.width && mouseX > buCond.b1.x && mouseY < buCond.b1.y+buCond.height && mouseY >buCond.b1.y){
            if(vars.multiplayer == true){vars.multiplayer = false;}else if(vars.multiplayer == false){vars.multiplayer = true;};
            console.log("2 player mode = " + vars.multiplayer);
        }

    //Points to Win
        if(mouseX < buCond.b2.x+buCond.width && mouseX > buCond.b2.x && mouseY < buCond.b2.y+buCond.height && mouseY >buCond.b2.y){
            if(vars.pts !== 9){
                vars.pts += 1;
            }else if(vars.pts == 9){
                vars.pts = 1;
            }
        }

    //Difficulty
        if(mouseX < buCond.b3.x+buCond.width && mouseX > buCond.b3.x && mouseY < buCond.b3.y+buCond.height && mouseY >buCond.b3.y){
            if(vars.difficulty !== 3){
                vars.difficulty += 1;
            }else if(vars.difficulty == 3){
               vars.difficulty = 1;
            }
        }

    //MouseControls
        if(mouseX < buCond.b4.x+buCond.width && mouseX > buCond.b4.x && mouseY < buCond.b4.y+buCond.height && mouseY >buCond.b4.y){
            if(vars.multiplayer == false){
                if(vars.mouseControl == true){vars.mouseControl = false;}else if(vars.mouseControl == false){vars.mouseControl = true;};
            }
        }

    //Game Start
        if(mouseX < startButton.x+startButton.width/2 && mouseX > startButton.x-startButton.width/2 && mouseY < startButton.y+startButton.height/2 && mouseY >startButton.y-startButton.height/2){
            gameStarted = true;
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
        menu2 = false;
        m2Button.enabled = true;
        vars.multiplayer = false;
        vars.pts = 4;
        vars.difficulty = 2;
        vars.mouseControl = false;
        ballInPlay = false
        ballCount = 1;

        gameStarted = 0;
        p1.points = 0;
        p2.points = 0;

        timer0 = 5;
        timet1 = 5;
    }

    if(gameStarted == true){
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
        }
        ball1.Yspeed = 6
        console.log(ballCount);
        if(ballCount < 2){
            ball1.xSpeed = 6
        }
        if(ballCount > 2){
            ball1.xSpeed = -6
        }
        ballCount++
        if(ballCount == 4){
            ballCount = 0;
        }
        
        
        console.log(ballCount);
        p2.y = canvas.height / 2
        
        ball1.x = canvas.width/2
        ball1.y = canvas.height/2
        ball1.flash = false;
        ball1.active = false;

        timer0 = 5;
        
        if(side == 0){
            p2.points += 1;
        }else if(side == 1){
            p1.points += 1;
        }
    if(p1.points == vars.pts){
        winGame();
        console.log("p1 wins!");
        win = true;
    }
    if(p2.points == vars.pts){
        winGame();
        console.log("p2 wins!");
        win = true;
    }
}

function winGame(){
    ballInPlay = false
    ball1.active = false
}
//0 = left, 1 = right































//https://d2l.cbe.ab.ca/d2l/lms/survey/user/surveys_list.d2l?ou=1153585