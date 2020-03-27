//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;




var alien = createSprite(200,390,20,50);
alien.setAnimation("alien2");
 var restart = createSprite(200,195,40,20);
 restart.visible = false;
 var gameOver = createSprite(200,50,10,10);
gameOver.visible = false;


alien.setCollider("rectangle",0,0,alien.width,alien.height);



alien.scale = 0.5;
alien.x = 50;


var ground = createSprite(200,390,40,1);
ground.setAnimation("ground1");
ground.scale = 0.9;

ground.x = ground.width /2;


var invisibleGround = createSprite(200,395,4000,5);
invisibleGround.visible = false;


var ObstaclesGroup = createGroup();
var CloudsGroup = createGroup();




var count = 0;
var time = 1;

        ("Georgia");
textSize(18);
textStyle = BOLD;

function draw() {
  
  background("blue");
 
  text("Score: "+ count, 250, 100);
  console.log(gameState);
  
  alien.depth = ground.depth+1;
  
  if(gameState === PLAY){
    
    ground.velocityX = -(6+3*count/100);
   
    time = time+0.0000000000000000000000000000001;
   count =Math.round(count+time);
    

    if (count>0 && count%100 === 0){
     ground.velocityX=ground.velocityX+10;
     playSound("sound://category_notifications/game_notification_83.mp3");
    }   
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    gameOver.visible =false;
  restart.visible = false;
  
  
  ObstaclesGroup.collide(invisibleGround);
    
     
    if(keyDown("space") && alien.y >= 348){
     alien.velocityY = -14 ;
     
    }
    console.log(alien.y);
  
    
    alien.velocityY = alien.velocityY + 0.8;
    
    
    spawnClouds();
  
    
    spawnObstacles();
    
    
    if(ObstaclesGroup.isTouching(alien)){
      gameState = END;
      playSound("die.mp3");
    
    }
    
  }

  
  else if(gameState === END) {
    count = 0;
    
    ground.velocityX = 0;
    alien.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    text(" CLICK DOWN TO RESTART",100,150);
    gameOver.visible = true;
    restart.visible = true;
    
    
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
    
   alien.setAnimation("alien3");
    
   
   gameOver.setAnimation("GameOver_1");
    
  
  restart.tint = "red";
  if(mousePressedOver(restart)){
    gameState = PLAY;
    CloudsGroup.destroyEach();
  ObstaclesGroup.destroyEach();
  alien.setAnimation("alien2");
  
  }
   
   
    
  }
  
  
  alien.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -(6+count/10);
    var rand = randomNumber(1,2);
    obstacle.setAnimation("cactus_"+rand);
    
           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
   
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
 
  if (World.frameCount % 120 === 0) {
    var cloud = createSprite(400,320,40,100);
    
    cloud.setAnimation("cloud");
    cloud.scale = 0.3;
    cloud.y = randomNumber(180,220);
    

    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    
    cloud.lifetime = 134;
    
    
    cloud.depth = alien.depth;
    alien.depth = alien.depth + 1;
    
    
    CloudsGroup.add(cloud);
  }
  
}

