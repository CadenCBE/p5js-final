let colour = [255,255,255];
class ball{
    constructor(x, y, size, xSpeed, Yspeed, active, colour, flash){
        this.x = x;
        this.y = y;
        this.size = size;
        this.xSpeed = xSpeed;
        this.ySpeed = Yspeed;
        this.active = active;
        this.colour = colour;
        this.flash = false;
        //, acceleration
        //this.acceleration = acceleration;
    }
    draw(){
        let a;
        if(this.flash == true){
            if(frameCount % 30 == 0){
                console.log("a second has passed");
                a=1;
            }
            if(frameCount % 15 == 0 && frameCount % 30 !== 0){
                console.log("a changed");
                a = 0;
            }
        }
        if(a == 1){
            colour = [255,255,255];
        }
        if(a==0){
            colour = [0,0,0];
        }

        fill(colour);
        stroke(colour);
        circle(this.x,this.y,this.size);

        //let randomNums = ['0.98', '1.02'];
        if(this.active == true){
            if(this.y + (this.size / 2) > 400 || this.y - (this.size / 2) < 0 ){
                this.ySpeed *= -1;
            //multiply the ySpeed by 0.98 or 1.02
            //removed because it didnt work very well and wasn't that good of an idea in the first place;
                //this.ySpeed *= random(randomNums);
                //console.log("Y " +this.ySpeed);
                if(this.ySpeed > 30){
                    this.ySpeed = 30
                }
                if(this.ySpeed < -30){
                    this.ySpeed = -30
                }
            }
        
        //if(this.ySpeed >= 8 && this.ySpeed > 0){
        //    this.ySpeed = 6;
        //    console.log("set yspeed to 6");
        //}
        //if(this.ySpeed <= 4 && this.ySpeed > 0){
        //    this.ySpeed = 6;
        //    console.log("set yspeed to 6");
        //}
            
        }
    }
    update(){
        // this.acceleration += 0.0005
        if(this.active == true){
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            //if(this.xSpeed > 0){
            //    this.xSpeed = this.xSpeed + this.acceleration
            //}else if(this.xSpeed < 0){
            //    this.xSpeed = this.xSpeed - this.acceleration
            //}
        }
    }    
}
