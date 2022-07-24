class Bird extends BaseClass {
  constructor(x,y){
    super(x,y,50,50);
    this.image = loadImage("sprites/bird.png");
    this.image2 = loadImage("sprites/smoke.png");
    this.trajectory = [];
  }

  display() {
    //this.body.position.x = mouseX;
    //this.body.position.y = mouseY;
    //console.log(this.body.speed);
   if(this.body.position.x >220 && this.body.speed>25){
    var position = [this.body.position.x,this.body.position.y]
    this.trajectory.push(position);
   }
    for(var i=0; i<this.trajectory.length; i++ ){
      image(this.image2,this.trajectory[i][0],this.trajectory[i][1]);
    }
    super.display();
  }
};
