var monkey , monkey_running
var banana ,bananaImg, obstacle, obstacleImg
var FoodGroup, obstacleGroup
var score
    
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImg = loadImage("banana.png");
  obstaceImg = loadImage("obstacle.png");
 
}
function setup() {
  
  
monkey=createSprite(80,315,20,20)
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1
    
ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  
  
 FoodGroup = new Group();
  obstaclesGroup = new Group();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
  BananaCount = 0
  survivalTime = 0
}


function draw() {
    background("white");
  
  stroke("white")
textSize(20)
fill("white");

stroke("black")
textSize(20)
fill("black")
survivalTime=Math.ceil(frameCount/frameRate())
text("Survival Time:"+ survivalTime,50,50);
  
  stroke("white")
textSize(20)
fill("white");

stroke("black")
textSize(20)
fill("black")
  text("Banana Count:"+ BananaCount,200,50);

  if(keyDown("space")&& monkey.y >= 50) {
    monkey.velocityY = -5;
  }
  
    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      BananaCount = BananaCount +1 
    }
  
  
  monkey.velocityY = monkey.velocityY + 0.4
  
  if (ground.x < 0){
    ground.x = ground.width/2;
    
  }
  
  if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
     monkey.velocityY = 0;
       obstaclesGroup.setVelocityXEach(0);
       FoodGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      survivalTime = 0

    
    }
  
  
  monkey.collide(ground);
      
  spawnObstacles();
  food();
   
  drawSprites();
  
  
}
function food() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImg);
     banana.scale=0.1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImg);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = -200;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
