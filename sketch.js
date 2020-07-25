const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1500,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(750,height,1500,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new N(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new S(810, 220);
    pig4=new E(1310,320);
    pig5=new D(1310,240);
    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    box6=new Box(1200,320,70,70);
    box7=new Box(1420,320,70,70);
    box8=new Box(1200,240,70,70);
    box9=new Box(1420,240,70,70);
    log4 = new Log(750,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);
    log8 = new Log(1260,120,150, PI/7);
    log9 = new Log(1370,120,150, -PI/7);
    log6=new Log(1310,260,300,PI/2);
    log7=new Log(1310,180,300,PI/2);
    bird = new Bird(200,50);
    box10=new Box(1310,160,70,70);
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    pig4.display();
    pig5.display();
    box10.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();
    log9.display();
    log8.display();
    box3.display();
    box4.display();
    box6.display();
    box7.display();
    box8.display();
    box9.display();
    pig3.display();
    pig3.score();
    pig4.score();
    log3.display();
    pig5.score();
    
    box5.display();
    log4.display();
    log5.display();
    console.log(mouseX);
    bird.display();
    platform.display();
    log6.display();
    log7.display();
    slingshot.display();    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
   // }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32&&bird.body.speed<1){
       slingshot.attach(bird.body);
       Matter.Body.setPosition(bird.body,{x:200,y:50});
       bird.trajectory=[];
      
      
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}