var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var direcao = [leftKey = false, upKey = false, rightKey = false, downKey = false];
var comeu = false;
var xPapinha;
var yPapinha;
var morto = false;
var tamanho = 20;
var posicoesSnake = new Array();
var caudaArray = new Array();
var cont = 0;
var contFramesMorrido = 0;
var tempoMorrido = 0;
var pontos = 0;
//IMAGENS PLANETAS
var mercurio = new Image();
mercurio.src = 'rsz_mercurio.png';
var venus = new Image();
venus.src = 'rsz_venus.png';
var terra = new Image();
terra.src = 'rsz_terra.png';
var marte = new Image();
marte.src = 'rsz_marte.png';
var jupiter = new Image();
jupiter.src = 'rsz_jupiter.png';
var saturno = new Image();
saturno.src = 'rsz_saturno.png';
var urano = new Image();
urano.src = 'rsz_urano.png';
var neptuno = new Image();
neptuno.src = 'rsz_neptuno.png';

//TECLA ESC PARA VOLTAR AO MENU

document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        window.location = "../menu.html";
    }
};

//ARRAY DOS PLANETAS
var papinharandom = new Array();
papinharandom[0] = mercurio;
papinharandom[1] = venus;
papinharandom[2] = terra;
papinharandom[3] = marte;
papinharandom[4] = jupiter;
papinharandom[5] = saturno;
papinharandom[6] = urano;
papinharandom[7] = neptuno;

var numerorandom;



//CONSTRUTOR SNAKE
function snake(x, y, tamanho, vX, vY) {
    this.x = x;
    this.y = y;
    this.tamanho = tamanho;
    this.vX = vX;
    this.vY = vY;

    //DESENHO SNAKE
    this.draw = function () {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "darkgreen";
        ctx.fillRect(this.x, this.y, this.tamanho, this.tamanho);
        ctx.strokeRect(this.x, this.y, this.tamanho, this.tamanho);
        ctx.lineWidth = 2.0;
    }

    //ANIMACAO SNAKE
    this.update = function () {

        this.x += this.vX * tamanho;
        this.y += this.vY * tamanho;

        //VERIFICA SE A SNAKE BATEU NAS PAREDES
        if (this.x + this.tamanho > canvas.width) {
            this.x = canvas.width - this.tamanho;
            direcao[2] = false;
            morto = true;
            animarparticula();


        }
        if (this.x < 0) {
            this.x = 0;
            direcao[0] = false;
            morto = true;
            animarparticula();

        }
        if (this.y + this.tamanho > canvas.height) {
            this.y = canvas.height - this.tamanho;
            direcao[3] = false;
            morto = true;
            animarparticula();

        }
        if (this.y < 0) {
            this.y = 0;
            direcao[1] = false;
            morto = true;
            animarparticula();

        }
    }
}
//CONSTRUTOR PARTICULA

function particula(x, y, raio, vX, vY) {
    this.x = x;
    this.y = y;
    this.raio = raio;
    this.vX = vX;
    this.vY = vY;

    //DESENHO PARTICULA
    this.draw = function () {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI);
        ctx.fill();

    }
    //UPDATE PARTICULA
    this.update = function () {

        this.x += this.vX;
        this.y += this.vY;

    }
}
var explosao = new Array();
var xInicial = 0;
var yInicial = 0;
var raio = 2;


//ANIMCAO PARTICULA
function animarparticula() {
    ctx.fillStyle = "green";

    for (var i = 0; i < 100; i++) {

        var vX = Math.random() * 10 - 5;
        var vY = Math.random() * 8 - 4;

        var p = new particula(xSnake, ySnake, raio, vX, vY);

        explosao.push(p);
    }

    for (var i = 0; i < 100; i++) {

        explosao[i].draw();
        explosao[i].update();
    }

    window.requestAnimationFrame(animarparticula);
}

//CONSTRUTOR PAPINHA
function papinha(x, y) {
    this.x = x;
    this.y = y;

    //DESENHAR PAPINHA
    this.draw = function () {
        ctx.drawImage(papinharandom[numerorandom], xPapinha, yPapinha);
    }
}

//CONSTRUTOR CAUDA
function cauda(x, y, tamanho, vX, vY) {
    this.x = x;
    this.y = y;
    this.tamanho = tamanho;
    this.vX = vX;
    this.vY = vY;

    this.draw = function () {
        ctx.fillStyle = "green";
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.tamanho, this.tamanho);
        ctx.strokeRect(this.x, this.y, this.tamanho, this.tamanho);
    }
    
    this.update = function () {
        this.x += this.vX * tamanho;
        this.y += this.vY * tamanho;
    }

}
//VERIFICA SE COMEU A PAPINHA
function comer(xPapinha, yPapinha, xSnake, ySnake) {
    this.xPapinha = xPapinha;
    this.yPapinha = yPapinha;
    this.xSnake = xSnake;
    this.ySnake = ySnake;

    if (this.xSnake > this.xPapinha - tamanho && this.xSnake < this.xPapinha + 10 && this.ySnake == this.yPapinha) {
        comeu = true;
        pontos += 10;
        document.getElementById("pontos").innerHTML = pontos;
    }
}

//VERIFICA SE A SNAKE BATEU NA CAUDA
function suicidio(xCauda, yCauda, xSnake, ySnake) {

    if (xSnake == xCauda && ySnake == yCauda) {
        morto = true;
        animarparticula();
    }
}

//MUDA A POSICAO DA PAPINHA
function posicaoPapinha() {
    comeu = true;
    while (xPapinha % tamanho != 0 || comeu == true) {
        xPapinha = Math.floor(Math.random() * (canvas.width - tamanho) + tamanho);
        comeu = false;
    }

    comeu = true;

    while (yPapinha % tamanho != 0 || comeu == true) {
        yPapinha = Math.floor(Math.random() * (canvas.height - tamanho) + tamanho);
        comeu = false;
    }

    //VERIFICA SE A NOVA POSICAO DA PAPINHA NAO COINCIDE COM A POSICAO DA CAUDA
    var cont = 0;

    for (var i = 0; i < caudaArray.length; i++) {
        if (caudaArray[i].x == xPapinha && caudaArray[i].y == yPapinha) {
            cont++;
        }
    }

    //ATRIBUI AS NOVAS POSICOES À PAPINHA
    if (cont == 0) {
        papinha.x = xPapinha;
        papinha.y = yPapinha;
        numerorandom = Math.floor(Math.random() * papinharandom.length);
    }
    else {
        posicaoPapinha();
    }

}

//REINICIA A POSICAO DA SNAKE QUANDO MORRE
function morreu() {
    if (morto ==true){
    snake.tamanho = 0;
    snake.vX = 0;
    snake.vY = 0;
    caudaArray.length = 0;
    ctx.font = "60px consolas"
    ctx.fillStyle = "white";
    ctx.strokeStyle = "rgb(146, 23, 115)"
    ctx.textAlign = 'center';
    ctx.lineWidth = 2;
    ctx.strokeText("Game Over", 500, 250);
    ctx.fillText("Game Over", 500, 250);
    ctx.font = "30px consolas";
    ctx.fillText("Your Score: "+ pontos,490, 300);
    ctx.font = "18px consolas";
    ctx.fillText("If you want to restart press 'Enter' if you want to go back to the menu press 'Esc' ",500, 350);
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 13) {
            document.location.reload();
        }
        if (evt.keyCode == 27) {
            window.location = "../menu.html";
        }
    };
        }
    }

    //BOTOES
    function KeyDown(evt) {
        cont++;

        switch (evt.keyCode) {
            //SETA ESQUERDA
            case 37: {
                for (var i = 0; i < direcao.length; i++) {
                    if (direcao[2] == false) {
                        direcao[0] = true;
                    }
                    if (i != 0 && direcao[2] == false) {
                        direcao[i] = false;
                    }
                }
                break;
            }
            //SETA CIMA
            case 38: {
                for (var i = 0; i < direcao.length; i++) {
                    if (direcao[3] == false) {
                        direcao[1] = true;
                    }
                    if (i != 1 && direcao[3] == false) {
                        direcao[i] = false;
                    }
                }
                break;
            }
            //SETA DIREITA
            case 39: {
                for (var i = 0; i < direcao.length; i++) {
                    if (direcao[0] == false) {
                        direcao[2] = true;
                    }
                    if (i != 2 && direcao[0] == false) {
                        direcao[i] = false;
                    }
                }
                break;
            }
            //SETA BAIXO
            case 40: {
                for (var i = 0; i < direcao.length; i++) {
                    if (direcao[1] == false) {
                        direcao[3] = true;
                    }
                    if (i != 3 && direcao[1] == false) {
                        direcao[i] = false;
                    }
                }
                break;
            }
        }
    }

    window.addEventListener('keydown', KeyDown);

    //CRIA O OBJETO SNAKE
    snake = new snake(canvas.width / 2, canvas.height / 2, tamanho, 1, 0);
    //GERA UMA POSICA PARA A PAPINHA
    posicaoPapinha();
    //CRIA O OBJETO PAPINHA
    papinha = new papinha(xPapinha, yPapinha);


    //FUNCAO DE ANIMACAO
    function animar() {
        //LIMPA O CANVAS
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //MUDA A DIRECAO DA SNAKE
        if (cont == 1) {
            if (direcao[0]) {
                snake.vX = -1;
                snake.vY = 0;
                cont = 0;

            }
            else if (direcao[1]) {
                snake.vX = 0;
                snake.vY = -1;
                cont = 0;
            }
            else if (direcao[2]) {
                snake.vX = 1;
                snake.vY = 0;
                cont = 0;
            }
            else if (direcao[3]) {
                snake.vX = 0;
                snake.vY = 1;
                cont = 0;
            }
        }

        //DESENHA E ATUALIZA A SNAKE
        snake.draw();
        snake.update();

        //DESENHA A CAUDA
        for (var i = 0; i < caudaArray.length; i++) {
            caudaArray[i].draw();
            caudaArray[i].update();
        }
        //DESENHA A PAPINHA
        papinha.draw();

        //GUARDA A POSICAO ATUAL DA SNAKE
        var pos = { x: snake.x, y: snake.y };
        posicoesSnake.push(pos);

        //CRIA UMA NOVA POSICAO PARA A PAPINHA, SE A ANTERIOR FOR COMIDA
        if (comeu == true) {
            novaCauda = new cauda(0, 0, tamanho, snake.vX, snake.vY);
            caudaArray.push(novaCauda);
            posicaoPapinha();
            comeu = false;
        }

        //ATUALIZA A POSICAO DA CAUDA
        if (posicoesSnake.length > caudaArray.length) {
            for (var i = 0; i < caudaArray.length; i++) {
                caudaArray[i].x = posicoesSnake[posicoesSnake.length - (i + 2)].x;
                caudaArray[i].y = posicoesSnake[posicoesSnake.length - (i + 2)].y;
            }
        }

        //VERIFICA SE A SNAKE BATEU NA CAUDA
        for (var i = caudaArray.length - 1; i >= 0; i--) {
            suicidio(caudaArray[i].x, caudaArray[i].y, snake.x, snake.y);
        }

        //VERIFICA SE COMEU A PAPINHA
        comer(papinha.x, papinha.y, snake.x, snake.y);

        //VERIFICA SE MORREU
        morreu();
        if (cont>=2) cont =0;
    }

    //CHAMA A FUNCAO DE ANIMACAO 10 FRAMES POR SEGUNDO
    var timer = window.setInterval(animar, 1000 / 8);

    animar();