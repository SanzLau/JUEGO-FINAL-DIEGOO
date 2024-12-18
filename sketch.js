// Variables generales
var PLAY=1;
var END=0;
var gameState = PLAY;
var Limon,Limon_Salto,Limon_Chocar,Limon_Caminar;
var Suelo,gSuelo,Sueloinvisible;
var Fondo;
var Obstaculo2,Obstaculo3;
var Sol, Luna, Nubes, Sol1;
var Estrella1,Estrella;
var Obstaculo;
var Muerte, Recolectar, Saltar;
var score=0;
var Grupo_Obstaculo;
var Grupo_Cielo;
var Grupo_Premio;
var Perder1, Perder;
var Reinicio1, Reinicio;


function preload(){
    Limon_Caminar = loadAnimation("perso.png");
    Limon_Salto = loadAnimation("Salto.png");
    Limon_Chocar = loadAnimation("Chocar.png");
   

    gSuelo = loadImage("Suuelo.png");

    Fondo = loadImage("Fondo.png");

    Obstaculo2 = loadImage("Obstaculo_2.png");
    Obstaculo3 = loadImage("Obstaculo_3.png");

    Sol = loadImage("Sol.png");
    Luna = loadImage("Luna.png");
    Nubes = loadImage("Nubesitas.png");

    Estrella1 = loadImage("Estrella.png");

    Muerte = loadSound("Sonido Choque.mp3");
    Saltar = loadSound("Sonido Salto.mp3");
    Recolectar = loadSound("Sonido Estrella.mp3");
  
    Perder = loadImage("Perder.webp");

    Reinicio = loadImage("Boton_reinicio.png");




}

function setup(){

  createCanvas(800, 400);
  
    Suelo = createSprite(400, 385, 800, 10);
    Suelo.addImage(gSuelo);
    Suelo.scale = 0.1;
  
    Sueloinvisible = createSprite(400, 385, 800, 10); // Cambiado de 390 a 385
Sueloinvisible.visible = false;
  
    Limon = createSprite(45, 250, 11, 21);
    Limon.addAnimation("caminar", Limon_Caminar);
    Limon.addAnimation("salto", Limon_Salto);
    Limon.addAnimation("choque", Limon_Chocar);
    Limon.scale = 0.2;
    Limon.debug=true;
   
  
  
    Perder1 = createSprite(400, 200, 100, 100);
    Perder1.addImage(Perder);
    Perder1.scale = 0.6;
    Perder1.visible = false;
  
    Reinicio1 = createSprite(400, 312, 100, 100);
    Reinicio1.addImage(Reinicio);
    Reinicio1.scale = 0.1;
    Reinicio1.visible = false;
  
    Grupo_Obstaculo = createGroup();
    Grupo_Cielo = createGroup();
    Grupo_Premio = createGroup();

}

function draw(){

background(Fondo);
drawSprites();

Suelo.velocityX=-3;

if (Suelo.x < 200){
  Suelo.x = Suelo.x + 290;
}

fill("white"); 
textSize(17);
text("Score: " + score, 725, 15);

if(gameState == PLAY){

  
  if (keyDown("w") && Limon.y >= 350) {
      Limon.velocityY = -10;
      Limon.changeAnimation("salto");
      Saltar.play();
  }  

if(Limon.isTouching(Grupo_Premio,Ganados)){
  score = score+2;
  Recolectar.play();
}


if (Grupo_Obstaculo.isTouching(Limon)) {
  gameState = END;
}

Premio();
Obstaculos();
Cielo();


}
 else if(gameState == END){
   Suelo.velocityX=0;
   Perder1.visible = true;
   Reinicio1.visible = true;
   Limon.changeAnimation("choque");;

   Grupo_Obstaculo.setLifetimeEach(-1);
   Grupo_Cielo.setLifetimeEach(-1);
   Grupo_Premio.setLifetimeEach(-1);

   Grupo_Obstaculo.setVelocityXEach(0);
   Grupo_Cielo.setVelocityXEach(0);
   Grupo_Premio.setVelocityXEach(0);

   if(mousePressedOver(Reinicio1)){
    Reiniciar();
   }

 }
  
//Gravedad
Limon.velocityY += 0.4;
Limon.collide(Sueloinvisible);

 
 

}

function Obstaculos(){
  if(frameCount % 80 == 0){
    Obstaculo = createSprite(600,350,10,40);
    Obstaculo.velocityX= -3;
    Obstaculo.scale=0.2;

   var uno = Math.round(random(1,2));

    switch(uno){
      case 1: Obstaculo.addImage(Obstaculo2);
      break;
      case 2: Obstaculo.addImage(Obstaculo3);
      break;
      default: break;
    }
    Obstaculo.scale=0.5;
    Obstaculo.lifetime=230;

    Grupo_Obstaculo.add(Obstaculo);
}
}

function Cielo(){
  if(frameCount % 60 == 0 ){
  Sol1 = createSprite(550,30,20,20);
  Sol1.y = Math.round(random(15,70));
  Sol1.velocityX= -3;
  
  
   var uno = Math.round(random(1,3));
   
    switch(uno){
      case 1 : Sol1.addImage(Sol);
      break;
      case 2 : Sol1.addImage(Luna);
      break;
      case 3 : Sol1.addImage(Nubes);
      break;
      default: break;
     }
     Sol1.scale=0.2;
     Sol1.lifetime=230;

     Grupo_Cielo.add(Sol1);

   }
}

function Premio() {
  if (frameCount % 120 === 0) {
    let estrella = createSprite(600, 285, 20, 20);
    estrella.addImage(Estrella1);
    estrella.velocityX = -3;
    estrella.scale = 0.4;
    estrella.lifetime = 230;

    Grupo_Premio.add(estrella);
  }
}

function Ganados(sprite, premio) {
  premio.remove();
}

function Reiniciar() {
  gameState = PLAY;
  Perder1.visible = false;
  Reinicio1.visible = false;
  Grupo_Premio.destroyEach();
  Grupo_Obstaculo.destroyEach();
  Grupo_Cielo.destroyEach();
  score = 0;

}