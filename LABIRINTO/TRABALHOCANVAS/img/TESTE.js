
document.addEventListener("keydown", function (evento){
  teclas[evento.keyCode] = true;
  console.log(teclas);
});

document.addEventListener("keyup", function (evento){
  delete teclas[evento.keyCode];
  console.log(teclas);
});

function movePlayers() {
  //w - 87
  if (87 in teclas && esquerda.y > 0)
    esquerda.y -= esquerda.speed;
  //s - 83
  if (83 in teclas && esquerda.y + esquerda.altura < canvas.height)
    esquerda.y += esquerda.speed;
  //a
  if (65 in teclas && esquerda.y + esquerda.altura < canvas.height)
    esquerda.y += esquerda.speed;
  //d
  if (68 in teclas && esquerda.y + esquerda.altura < canvas.height)
    esquerda.y += esquerda.speed;

  //sobe - 38
  if (38 in teclas && direita.y > 0)
    direita.y -= direita.speed;
  //desce
  if (40 in teclas && direita.y + direita.altura < canvas.height)
    direita.y += direita.speed;
  //esquerda
  if (37 in teclas && esquerda.y + esquerda.altura < canvas.height)
    esquerda.y += esquerda.speed;
  //direita
  if (39 in teclas && esquerda.y + esquerda.altura < canvas.height)
    esquerda.y += esquerda.speed;



  function desenhar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayers();

    requestAnimationFrame(desenhar);
  }

  function main(){
    desenhar();
  }
}
