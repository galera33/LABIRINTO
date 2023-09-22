var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var WIDTH = canvas.width, HEIGHT = canvas.height;

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
var ESQ = 65, DIRE = 68, SB=87, DC=83;
var mvLeft = mvUp = mvRight = mvDown = false;
var mvESQ=mvDIRE=mvSB=mvDC=false;

var BLOCOT = 28;

var walls = [];

var PERSEU = {
  x: 29,
  y: 29,
  width: 15,
  height: 15,
  speed: 1,
  score:0
};
var MINOTAURO={
  x:960,
  y:830,
  width:15,
  height:15,
  speed:1,
  score:0
};

var poweup1={
  x:570,
  y:430,
  raio:5
}
var poweup2={
  x:260,
  y:320,
  raio:5
}
var poweup3={
  x:350,
  y:820,
  raio:5
}
var powerdw1={
  x:460,
  y:240,
  raio:5
}
var powerdw2= {
  x: 130,
  y: 770,
  raio: 5
}

var LABIRINTO = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,1,0,1,0,1,0,1,1,0,1,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,1,1,1,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0,1,0,0,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

];

//timer-------------------------------------------
var esperante = false;
var rodante = false;
var segundos = 240;
var contagem;
var resultado = false;
var Tinicio = 0;
function Timer() {
  var minutos = Math.round((segundos - 30) / 60);
  var segundosfaltantes = segundos % 60;


  if (segundosfaltantes < 10) {// 2:9 se torna 2:09 por exemplo
    segundosfaltantes = "0" + segundosfaltantes;
  }

  document.getElementById('tempo').innerHTML = minutos + ":" + segundosfaltantes;
  if (segundos === 0) {
    rodante = true;

    if (resultado) {
      clearInterval(contagem); // para o intervalo da contagem para evitar looping
      //...
    }
  } else {
    esperante = true;
    segundos = segundos-Tinicio;
  }
}
contagem = setInterval(Timer, 1000); // referencia da funcção
//----------------------------------------------------------------------------------------------


for(var LINHA in LABIRINTO){
  for(var COLUNA in LABIRINTO[LINHA]){
    var BLOCO = LABIRINTO[LINHA][COLUNA];
    if(BLOCO === 1){
      var wall = {
        x: BLOCOT*COLUNA,
        y: BLOCOT*LINHA,
        width: BLOCOT,
        height: BLOCOT
      };
      walls.push(wall);
    }
  }
}

window.addEventListener("keydown",keydownHandler,false);
window.addEventListener("keyup",keyupHandler,false);

function keydownHandler(e){
  var key = e.keyCode;
  switch(key) {
    case LEFT:
      mvLeft = true;
      break;
    case UP:
      mvUp = true;
      break;
    case RIGHT:
      mvRight = true;
      break;
    case DOWN:
      mvDown = true;
      break;
    case ESQ:
      mvESQ = true;
      break;
    case DIRE:
      mvDIRE = true;
      break;
    case SB:
      mvSB = true;
      break;
    case DC:
      mvDC = true;
      break;

  }
}
function keyupHandler(e){
  var key = e.keyCode;
  switch(key){
    case LEFT:
      mvLeft = false;
      break;
    case UP:
      mvUp = false;
      break;
    case RIGHT:
      mvRight = false;
      break;
    case DOWN:
      mvDown = false;
      break;
    case ESQ:
      mvESQ = false;
      break;
    case DIRE:
      mvDIRE = false;
      break;
    case SB:
      mvSB = false;
      break;
    case DC:
      mvDC = false;
      break;
  }
}

function atualizar() {
  if (!mvLeft && !mvRight && !mvUp && !mvDown) {
    document.getElementById('controlp1').src = "https://i.imgur.com/tAk8v1Z.png";
  }
  if (mvLeft && !mvRight) {
    PERSEU.x -= PERSEU.speed;
    document.getElementById('controlp1').src = "https://i.imgur.com/ozDnk6x.png";
  } else if (mvRight && !mvLeft) {
    PERSEU.x += PERSEU.speed;
    document.getElementById('controlp1').src = "https://i.imgur.com/g8986XH.png";
  }
  if (mvUp && !mvDown) {
    PERSEU.y -= PERSEU.speed;
    document.getElementById('controlp1').src = "https://i.imgur.com/mBe0qb7.png";
  } else if (mvDown && !mvUp) {
    PERSEU.y += PERSEU.speed;
    document.getElementById('controlp1').src = "https://i.imgur.com/FGYdVvn.png";
  }
  //controle player 2 -------------------
  if (!mvESQ && !mvDIRE && !mvSB && !mvDC) {
    document.getElementById('controlp2').src = "https://i.imgur.com/2KdT9mu.png";
  }
  if (mvESQ && !mvDIRE) {
    MINOTAURO.x -= MINOTAURO.speed;
    document.getElementById('controlp2').src = "https://i.imgur.com/ctk8JsM.png";
  } else if (mvDIRE && !mvESQ) {
    MINOTAURO.x += MINOTAURO.speed;
    document.getElementById('controlp2').src = "https://i.imgur.com/Pt3VrHM.png";
  }
  if (mvSB && !mvDC) {
    MINOTAURO.y -= MINOTAURO.speed;
    document.getElementById('controlp2').src = "https://i.imgur.com/bqquJEA.png";
  } else if (mvDC && !mvSB) {
    MINOTAURO.y += MINOTAURO.speed;
    document.getElementById('controlp2').src = "https://i.imgur.com/NSllIU7.png";
  }
  if(Math.hypot(
    MINOTAURO.x - PERSEU.x,
    MINOTAURO.y-PERSEU.y
  )< MINOTAURO.width){
    PERSEU.y=29;
    MINOTAURO.y=830;
    PERSEU.x=29;
    MINOTAURO.x=960;
    MINOTAURO.score +=1;
    MINOTAURO.speed=1
    PERSEU.speed=1
    poweup1.x=570;
    poweup1.y=430;
    poweup2.x=260;
    poweup2.y=320;
    poweup3.x=350;
    poweup3.y=820;
    powerdw1.x=460;
    powerdw1.y=240;
    powerdw2.x=130;
    powerdw2.y=770;
    segundos+= 240-segundos
  }
  if(segundos===0){
    PERSEU.y=29;
    MINOTAURO.y=830;
    PERSEU.x=29;
    MINOTAURO.x=960;
    PERSEU.score +=1;
    MINOTAURO.speed=1;
    PERSEU.speed=1;
    poweup1.x=570;
    poweup1.y=430;
    poweup2.x=260;
    poweup2.y=320;
    poweup3.x=350;
    poweup3.y=820;
    powerdw1.x=460;
    powerdw1.y=240;
    powerdw2.x=130;
    powerdw2.y=770;
    segundos +=180
  }
  if(Math.hypot(
    MINOTAURO.x - poweup1.x,
    MINOTAURO.y-poweup1.y
  )< MINOTAURO.width+poweup1.raio){
    MINOTAURO.speed +=0.25;
    poweup1.x=-5000;
    poweup1.y=-2000
  }
  if(Math.hypot(
    PERSEU.x - poweup1.x,
    PERSEU.y-poweup1.y
  )< PERSEU.width+poweup1.raio){
    PERSEU.speed +=0.25;
    poweup1.x=-5000;
    poweup1.y=-2000
  }
  if(Math.hypot(
    MINOTAURO.x - poweup2.x,
    MINOTAURO.y-poweup2.y
  )< MINOTAURO.width+poweup2.raio){
    MINOTAURO.speed +=0.25;
    poweup2.x=-5000;
    poweup2.y=-2000
  }
  if(Math.hypot(
    PERSEU.x - poweup2.x,
    PERSEU.y-poweup2.y
  )< PERSEU.width+poweup2.raio){
    PERSEU.speed +=0.25;
    poweup2.x=-5000;
    poweup2.y=-2000
  }
  if(Math.hypot(
    MINOTAURO.x - poweup3.x,
    MINOTAURO.y-poweup3.y
  )< MINOTAURO.width+poweup3.raio){
    MINOTAURO.speed +=0.25;
    poweup3.x=-5000;
    poweup3.y=-2000
  }
  if(Math.hypot(
    PERSEU.x - poweup3.x,
    PERSEU.y-poweup3.y
  )< PERSEU.width+poweup3.raio){
    PERSEU.speed +=0.25;
    poweup3.x=-5000;
    poweup3.y=-2000
  }
  if(Math.hypot(
    MINOTAURO.x - powerdw1.x,
    MINOTAURO.y-powerdw1.y
  )< MINOTAURO.width+powerdw1.raio){
    MINOTAURO.speed -=0.25;
    powerdw1.x=-5000;
    powerdw1.y=-2000
  }
  if(Math.hypot(
    PERSEU.x - powerdw1.x,
    PERSEU.y-powerdw1.y
  )< PERSEU.width+powerdw1.raio){
    PERSEU.speed -=0.25;
    powerdw1.x=-5000;
    powerdw1.y=-2000
  }
  if(Math.hypot(
    MINOTAURO.x - powerdw2.x,
    MINOTAURO.y-powerdw2.y
  )< MINOTAURO.width+powerdw2.raio){
    MINOTAURO.speed -=0.25;
    powerdw2.x=-5000;
    powerdw2.y=-2000
  }
  if(Math.hypot(
    PERSEU.x - powerdw2.x,
    PERSEU.y-powerdw2.y
  )< PERSEU.width+powerdw1.raio){
    PERSEU.speed -=0.25;
    powerdw2.x=-5000;
    powerdw2.y=-2000
  }



  for (var i in walls) {
    var wall = walls[i];
    colisor(PERSEU, wall);
  }
  for (var x in walls) {
    var parede = walls[x];
    colisor(MINOTAURO, parede);
  }
}
function fixar(){
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  ctx.save();
  for(var LINHA in LABIRINTO){
    for(var COLUNA in LABIRINTO[LINHA]){
      var BLOCO = LABIRINTO[LINHA][COLUNA];
      if(BLOCO === 1){
        var x = COLUNA*BLOCOT;
        var y = LINHA*BLOCOT;
        ctx.fillRect(x,y,BLOCOT,BLOCOT);
        ctx.fillStyle="#000000"
      }
    }
  }
  ctx.fillStyle = "blue";
  ctx.fillRect(PERSEU.x,PERSEU.y,PERSEU.width,PERSEU.height);
  ctx.restore();

  ctx.fillStyle = "red";
  ctx.fillRect(MINOTAURO.x,MINOTAURO.y,MINOTAURO.width,MINOTAURO.height);
  ctx.restore();

  ctx.fillStyle = "goldenrod";
  ctx.font = "20px Arial";
  ctx.fillText("MINOTAURO " + MINOTAURO.score, 200, 858);
  ctx.fillText("PERSEU " + PERSEU.score, 200, 20);

  ctx.beginPath();
  ctx.fillStyle="blueviolet"
  ctx.arc(poweup1.x,poweup1.y,poweup1.raio,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle="blueviolet"
  ctx.arc(poweup2.x,poweup2.y,poweup2.raio,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle="blueviolet"
  ctx.arc(poweup3.x,poweup3.y,poweup3.raio,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle="lawngreen"
  ctx.arc(powerdw1.x,powerdw1.y,powerdw1.raio,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle="lawngreen"
  ctx.arc(powerdw2.x,powerdw2.y,powerdw2.raio,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
}
function colisor(jogador,muro){
  var distX = (jogador.x + jogador.width/2) - (muro.x + muro.width/2);
  var distY = (jogador.y + jogador.height/2) - (muro.y + muro.height/2);

  var somaw = (jogador.width + muro.width)/2;
  var somah = (jogador.height + muro.height)/2;

  if(Math.abs(distX) < somaw && Math.abs(distY) < somah){
    var sobreporX = somaw - Math.abs(distX);
    var sobreporY = somah - Math.abs(distY);

    if(sobreporX > sobreporY){
      jogador.y = distY > 0 ? jogador.y + sobreporY : jogador.y - sobreporY;
    } else {
      jogador.x = distX > 0 ? jogador.x + sobreporX : jogador.x - sobreporX;
    }
  }
}

function loop(){
  Tinicio = 1;
  atualizar();
  fixar();
  requestAnimationFrame(loop,canvas);
}

