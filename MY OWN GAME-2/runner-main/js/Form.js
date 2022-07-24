class Form {

  constructor() {
   
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.info = createElement('h2');
   
    this.buttonm=createButton('Monkey');
    this.buttonf=createButton('fox');
    this.buttonb=createButton('bear');
  }

  hide(){
    this.greeting.hide();
    this.button.hide();
    this.title.hide();
    this.buttonf.hide();
    this.buttonb.hide();
    this.buttonm.hide();
    this.info.hide();
  }

  display(){
    this.title.html("Escape from the cave man");
    this.title.position(displayWidth/2-100, 0);

    this.info.position(displayWidth/2-50,150);
    this.info.html("Choose your animal");

    this.buttonb.position(700, 300);
    this.buttonf.position(800,300);
    this.buttonm.position(900,300);

    this.buttonb.mousePressed(()=>{
        active_animal="bear";
        this.greeting.html("You are intelligent, strong and fast. Eat honey to boost your power!")
        this.greeting.position(displayWidth/2-300, displayHeight/2-50);
      });

    this.button.position(displayWidth/2 + 30, displayHeight/2+50);
    this.button.mousePressed(()=>{
        if(active_animal!=null){
           gameState=play;
           this.hide();
           
        }
        else
           alert("pick an animal");
    });

  }
}
