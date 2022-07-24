class Bear {
    constructor(speed,x,y){
        //super(x,y,width,height);
        this.animation=animation;
        this.length=animation.length;
        this.speed=speed;
        this.index=0;
        this.x=x;
        this.y=y;
        console.log(this.speed)
       
    }
    display(){   
        
        let index=floor(this.index%this.length);
        image(this.animation[index],this.x,this.y);    
        
    }

    animate(){
        this.index+=this.speed;
        this.x+=this.speed;
    }
}