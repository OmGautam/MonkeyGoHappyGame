var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground;
var bananaGroup, obstacleGroup;
var jungle,backgroundImage;

function preload(){
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  backgroundImage = loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(900,400);
  
  score = 0;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(400,350,900,10);
  ground.visible = false;
  
  jungle = createSprite(450,200);
  jungle.addImage(backgroundImage);  
  jungle.velocityX = -4;
  jungle.x = jungle.width/2;
  
  monkey.depth = jungle.depth;
  monkey.depth = monkey.depth + 1;
  
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background("white");
  
  textSize(18);
  text("Score: "+ score, 500,50);
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  if (jungle.x < 0){
    jungle.x = jungle.width/2;
  }
  
  if(bananaGroup.isTouching(monkey)){
    score = score + 2;
    bananaGroup.destroyEach();
  }
  
  switch(score){
    case 10: monkey.scale = 0.22;
        break;
    case 20: monkey.scale = 0.24;
        break;
    case 30: monkey.scale = 0.26;
        break;
    case 40: monkey.scale = 0.28;
        break;
    default: break;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.2;
    obstacleGroup.destroyEach();
  }
  
  food();
  spawnObstacles();
  
  drawSprites();
}

function food(){
  if(frameCount % 80 === 0){
    var banana = createSprite(450,300,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -2;
    banana.setLifetimeEach = 450;
    banana.scale = 0.1;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(900,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.setLifetimeEach = 150;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
  }
}




