var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var WIDTH = canvas.width, HEIGHT = canvas.height;

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
var ESQ = 65, DIRE = 68, SB=87, DC=83;
var mvLeft = mvUp = mvRight = mvDown = false;
var mvESQ=mvDIRE=mvSB=mvDC=false;

var BLOCOT = 29;

var walls = [];

var PERSEU = {
  x: 145,
  y: 29,
  width: 15,
  height: 15,
  speed: 1,
  score:0
  };
var MINOTAURO={
  x:350,
  y:500,
  width:15,
  height:15,
  speed:1,
  score:0
  };

var LABIRINTO = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1],
  [1,0,1,0,1,1,1,1,1,1,0,1,1,0,0,0,1],
  [1,0,1,0,1,0,0,0,0,1,0,0,1,0,1,0,1],
  [1,0,1,0,0,0,1,1,0,1,1,0,1,0,1,0,1],
  [1,0,0,0,1,1,1,0,0,0,1,0,1,1,1,0,1],
  [1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,0,0,0,0,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];

//timer-------------------------------------------
var esperante = false;
var rodante = false;
var segundos = 120;
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
    if(!mvLeft && !mvRight && !mvUp && !mvDown){
      document.getElementById('controlp1').src="https://i.imgur.com/tAk8v1Z.png";
    }
    if (mvLeft && !mvRight) {
      PERSEU.x -= PERSEU.speed;       document.getElementById('controlp1').src="https://i.imgur.com/ozDnk6x.png";
    } else if (mvRight && !mvLeft) {
      PERSEU.x += PERSEU.speed;           document.getElementById('controlp1').src="https://i.imgur.com/g8986XH.png";
    }
    if (mvUp && !mvDown) {
      PERSEU.y -= PERSEU.speed;  document.getElementById('controlp1').src="https://i.imgur.com/mBe0qb7.png";
    } else if (mvDown && !mvUp) {
      PERSEU.y += PERSEU.speed; document.getElementById('controlp1').src="https://i.imgur.com/FGYdVvn.png";
    }
    //controle player 2 -------------------
    if(!mvESQ && !mvDIRE && !mvSB && !mvDC){
      document.getElementById('controlp2').src="https://i.imgur.com/2KdT9mu.png";
    }
    if (mvESQ && !mvDIRE) {
      MINOTAURO.x -= MINOTAURO.speed;
      document.getElementById('controlp2').src="https://i.imgur.com/ctk8JsM.png";
    } else if (mvDIRE && !mvESQ) {
      MINOTAURO.x += MINOTAURO.speed;
      document.getElementById('controlp2').src="https://i.imgur.com/Pt3VrHM.png";
    }
    if (mvSB && !mvDC) {
      MINOTAURO.y -= MINOTAURO.speed;
      document.getElementById('controlp2').src="https://i.imgur.com/bqquJEA.png";
    } else if (mvDC && !mvSB) {
      MINOTAURO.y += MINOTAURO.speed;
      document.getElementById('controlp2').src="https://i.imgur.com/NSllIU7.png";

    }
    if(Math.hypot(
      MINOTAURO.x - PERSEU.x,
      MINOTAURO.y-PERSEU.y
    )< MINOTAURO.width){
      PERSEU.y=29;
      MINOTAURO.y=500;
      PERSEU.x=145;
      MINOTAURO.x=350;
      MINOTAURO.score +=1;
      MINOTAURO.speed=1
      PERSEU.speed=1
      segundos+= 120-segundos
    }
    if(segundos===0){
      PERSEU.y=29;
      MINOTAURO.y=500;
      PERSEU.x=145;
      MINOTAURO.x=350;
      PERSEU.score +=1;
      MINOTAURO.speed=1;
      PERSEU.speed=1;
      segundos +=120
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
    ctx.fillText("MINOTAURO " + MINOTAURO.score, 200, 540);
    ctx.fillText("PERSEU " + PERSEU.score, 200, 20);

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

