var play=1;
var end=0;
var win =0;
var gameState = play;

var policeman,policeman_running,policemanImage;
var thief,thief_running;
var bground,bgroundImage,invisibleGround;
var postbox,postboxImage,postboxGroup;
var manhole,manholeImage,manholeGroup;
var gameover,gameoverImage;
var win,winImage;
var score = 0;


function preload(){
  policeman_running = loadAnimation("Police1.png","Police2.png","Police3.png","Police4.png","Police5.png");
  policemanImage = loadAnimation("Police4.png");
  thief_running = loadAnimation("Thief1.png","Thief2.png","Thief3.png","Thief4.png","Thief5.png");
  thiefImage = loadAnimation("Thief4.png");
  bgroundImage = loadImage("bgDay1.png");
  manholeImage = loadImage("manhole.png");
  postboxImage = loadImage("postbox.png");
  gameoverImage = loadImage("gameover.png");
  winImage = loadImage("youwin.png");
  
}

function setup(){
  createCanvas(600,500);
  
  bground = createSprite(300,300,1200,500);
//  bground.addImage(bgroundImage);
  bground.scale = 1.5
  
  invisibleGround = createSprite(300,330,600,5);
  invisibleGround.shapeColor = "red";
  invisibleGround.visible = false;
  
  policeman = createSprite(100,310,50,50);
  policeman.addAnimation("running",policeman_running);
  policeman.addAnimation("rest",policemanImage);
  policeman.scale = 0.3;
  
  thief = createSprite(290,310,50,50);
  thief.addAnimation("running",thief_running);
  thief.addAnimation("rest",thiefImage);
  thief.scale = 0.3;
  
  gameover = createSprite(300,100,50,50);
  gameover.addImage(gameoverImage);
  gameover.visible = false;
  
  win = createSprite(300,100,50,50);
  win.addImage(winImage);
  win.visible = false;
  
  manholeGroup = new Group();
  postboxGroup = new Group();
}
  
  
  
  

function draw(){
  background("white");
  
  
  
  
  spawnObstacles();
   
  
  
  if(gameState===play){
    bground.velocityX = -(5+0.5*score/100);
  
  if (bground.x <= 20){
      bground.x = bground.width/2;
    }
  
  if(keyDown("space")&&policeman.y>290){
    policeman.velocityY = -(10+0.1*score/100);
  }
  if(policeman.y<290){
    policeman.changeAnimation("rest",policemanImage);
  }
  else{
   policeman.changeAnimation("running",policeman_running);
  }


    score = score + Math.round(frameRate()/60.012);
    
    if(postboxGroup.isTouching(thief)){
      thief.velocityY = -(10+0.2*score/100);
    }
    
    if(manholeGroup.isTouching(thief)){
      thief.velocityY = thief.velocityY-(1.6+0.08*score/100);
    }
    
    if(postboxGroup.isTouching(policeman)){
      gameState = end;
      policeman.changeAnimation("rest",policemanImage);
    }
    
    if(manholeGroup.isTouching(policeman)){
      gameState = end;
      policeman.lifetime=0;
      
    }
    
    if(policeman.isTouching(thief)){
      gameState = win;
    }

  thief.velocityX = thief.velocityX - 0.00001;
  }
  
      if(thief.y<290){
    thief.changeAnimation("rest",thiefImage);
  }
  else{
   thief.changeAnimation("running",thief_running);
  }
  
  policeman.velocityY = policeman.velocityY + 0.5+0.02*score/100;
    
  thief.velocityY = thief.velocityY + 0.5+0.02*score/100;
  
  
  policeman.collide(invisibleGround);
  
  thief.collide(invisibleGround);
  
  if(gameState===end){
    score = 0;
    
    manholeGroup.setLifetimeEach(-1);
    manholeGroup.setVelocityXEach(0);
    
    postboxGroup.setLifetimeEach(-1);
    postboxGroup.setVelocityXEach(0);
    
    gameover.visible = true;

    thief.velocityX = thief.velocityX+0.2;
    
    
    bground.velocityX = 0;
    
  }
  if(gameState===win){
    score = 0;
    
    manholeGroup.setLifetimeEach(-1);
    manholeGroup.setVelocityXEach(0);
    
    postboxGroup.setLifetimeEach(-1);
    postboxGroup.setVelocityXEach(0);
    
    win.visible = true;

    thief.velocityX = 0;
    policeman.velocityX = 0;
    
    bground.velocityX = 0;
    thief.changeAnimation("rest",thiefImage);
    policeman.changeAnimation("rest",policemanImage);
  }
  
  thief.debug =false;
  thief.setCollider("rectangle",100,0,350,240);
  
  drawSprites();
  
  textSize(25);
  stroke("black");
  fill("black");
  text("Score:"+score,420,50);
}

function spawnObstacles(){
    if (frameCount % 250===0){
      var rand=Math.round(random(1,2))
      switch(rand){
        case 1:
            postbox = createSprite(random(700,750),300,50,50);
            postbox.addImage(postboxImage);
            postbox.velocityX = -(5+0.5*score/100);

            postbox.scale = 0.2;
            postbox.depth = policeman.depth;
            policeman.depth = policeman.depth+1;
            postbox.depth = thief.depth;
            thief.depth = thief.depth+1;

            postbox.lifetime = 150;


            postboxGroup.add(postbox);
          break;
        case 2: 
              manhole= createSprite(random(700,750),325,50,50);
              manhole.addImage(manholeImage);
              manhole.velocityX = -(5+0.5*score/100);

              manhole.scale = 0.2;
              manhole.depth = policeman.depth;
              policeman.depth = policeman.depth+1;
              manhole.depth = thief.depth;
              thief.depth = thief.depth+1;

              manhole.lifetime = 150;

              manholeGroup.add(manhole);
      }
    }
  }
async function timeZone(){
    
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/kolkata");
    var r_json = await response.json();
    var date_time = await r_json.datetime;
    var hr = await date_time.slice(11,13);

    if(hr> 8 && hr<20){
        bgroundImg = loadImage("bgNight1.png");
    }
    else{
        bgroundImg = loadImage("bgDay1.png")
    }
    
  bground.addImage(bgroundImage);
    console.log(hr);

}   

