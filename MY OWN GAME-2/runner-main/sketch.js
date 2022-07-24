var bearrunning=[];
var bearanimation=[];
var bears=[];
function preload(){
  for(var i=0;i<=5;i++){
    bearrunning[i] = loadImage("images/bear" + i + ".png"); //"images/bear2.png","images/bear3.png","images/bear4.png","images/bear5.png");
    bearanimation.push(bearrunning[i])
  }
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  for(var i=0;i<5;i++) { 
   bears[i]=new Bear(bearanimation,random(0.1,1.2),100,i*100);
  }
}

function draw(){
  background("white");
  for(let bear of bears){
  bear.display()
  bear.animate();
  }
}

