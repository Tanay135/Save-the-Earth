let ground;
let lander;
var ufo,ufo_img;
var bg_img;
var ufoGroup;
var astronaut,astronaut_img;
var missile_img,missile;
var missileFlag;
var missileGroup, alienLaserGroup;
var score;
var lives;
var highScore = 0;
var alienLaser,alienLaser_img;
var gameOver,gameOver_Image;
var restart,restart_image;
var astronaut_victory,astronaut_victory_image;
var gameState;

function preload()
{
  ufo_img = loadImage("UFO.png");
  bg_img = loadImage("bg.png");
  astronaut_img = loadImage("astronaut.png"); 
  missile_img = loadImage("missile.png");
  alienLaser_img = loadImage("alien_laser.png");
  gameOver_Image = loadImage("game-over-image2.png");
  restart_image = loadImage("restart-image.png");
  astronaut_victory_image = loadImage("astronaut-victory.png");
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  missileFlag = 0; 
  missileGroup = new Group();
  alienLaserGroup =  new Group();
  ufoGroup = new Group();
  for(var i = 0; i<10; i++){
    ufo = createSprite(60+i*97,50,30,30);
    ufo.addImage(ufo_img);
    ufo.scale = 0.1;
    ufoGroup.add(ufo);
    }
   
    score = 0;
    lives = 10;
    
    
    astronaut = createSprite(400,500,30,30);
    astronaut.addImage(astronaut_img);
    astronaut.scale = 0.075;
   

    gameOver = createSprite(500,300,30,30);
    gameOver.addImage(gameOver_Image);
    gameOver.visible = false;
    gameOver.scale = 0.5;
   

    restart = createSprite(500,500,30,30);
    restart.addImage(restart_image);
    restart.visible = false;
    restart.scale = 0.075;
    
   
    gameState = "play";

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  textSize(20);
  text("High Score: "+ highScore,800,100);
  text("Score: "+ score,845,150);
  text("Lives: "+ lives,50,100);
  pop();
  
  if(gameState === "play"){
    if(keyDown(RIGHT_ARROW)){
      astronaut.x = astronaut.x + 5;
     }
   
     if(keyDown(LEFT_ARROW)){
       astronaut.x = astronaut.x - 5;
      }
     
     if(keyDown("space") && missileFlag === 0){
       createMissile();
     }

    for (var i=0;i<missileGroup.size();i++){
        if(missileGroup.get(i).position.y === 50){
          missileFlag = 0;
        }
    }
    for (var i=0 ; i < ufoGroup.size(); i++){
      if(frameCount%100 === 0){
        alienLaser = createSprite(ufoGroup.get(i).position.x,ufoGroup.get(i).position.y,20,20);
        alienLaser.addImage(alienLaser_img);
        alienLaser.scale = 0.3;   
        alienLaser.velocityY = 5;
        alienLaser.setCollider("rectangle", 0, 0, 5, 5);
        alienLaserGroup.add(alienLaser);

      }

      if(ufoGroup.get(i).isTouching(missileGroup)){
        ufoGroup.get(i).destroy();
        score +=  5;
      }
    }
    for (var i=0; i < alienLaserGroup.size(); i++ ){
     if(alienLaserGroup.get(i).isTouching(astronaut)){
      alienLaserGroup.get(i).destroy();
      lives -= 1;
     }
    }

    console.log( ufoGroup.size());
    // Game Over condition
    // How will it know when the game is over ?
    if(lives === 0){
      if(highScore < score){
        highScore = score;
      }
      gameState = "over";
    }

    if(ufoGroup.size() === 0){
      gameState = "won";
    }
    
  }else if(gameState === "over"){
    gameOver.visible = true;
    restart.visible = true;
    astronaut.visible = false;
  }else if(gameState === "won"){
    image(bg_img,0,0);
    push();
    fill(255);
    textSize(40);
    text("Yippeee ! You have saved the planet !", 150, 150);
    pop();
    astronaut.y = 400;
    astronaut.addImage(astronaut_victory_image);
    astronaut.scale = 1;

    restart.visible = true;
    if(mousePressedOver(restart)){
      location.reload();
    }
  }
if(mousePressedOver(restart)){
  gameState = "play";
  lives = 3;
  score = 0;
  gameOver.visible = false;
  restart.visible = false;
  astronaut.visible = true;
}
  drawSprites();
}

function createMissile(){
  missile=createSprite(400,450,30,30);
    missile.depth = astronaut.depth;
    astronaut.depth+=1;
    missile.addImage(missile_img);
    missile.scale = 0.1;
    missile.x = astronaut.x;
    missile.velocityY = -5;
    missileFlag = 1;
    missileGroup.add(missile);


}
