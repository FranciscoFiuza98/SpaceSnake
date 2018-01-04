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

//CONSTRUTOR SNAKE
function snake(x, y, tamanho, vX, vY) {
    this.x = x;
    this.y = y;
    this.tamanho = tamanho;
    this.vX = vX;
    this.vY = vY;

    //DESENHO SNAKE
    this.draw = function () {
        ctx.fillStyle = "orange";

        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.tamanho, this.tamanho);
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
        }
        if (this.x < 0) {
            this.x = 0;
            direcao[0] = false;
            morto = true;
        }
        if (this.y + this.tamanho > canvas.height) {
            this.y = canvas.height - this.tamanho;
            direcao[3] = false;
            morto = true;
        }
        if (this.y < 0) {
            this.y = 0;
            direcao[1] = false;
            morto = true;
        }
    }
}

//CONSTRUTOR PAPINHA
function papinha(x, y) {
    this.x = x;
    this.y = y;

    //DESENHAR PAPINHA
    this.draw = function () {

        ctx.fillStyle = "yellow";

        ctx.beginPath();
        ctx.fillRect(this.x, this.y, tamanho, tamanho);
        ctx.fill();
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
        ctx.fillStyle = "orange";

        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.tamanho, this.tamanho);
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
    }
}

//VERIFICA SE A SNAKE BATEU NA CAUDA
function suicidio(xCauda, yCauda, xSnake, ySnake) {

    if (xSnake == xCauda && ySnake == yCauda) {
        morto = true;
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
    }
    else {
        posicaoPapinha();
    }
}

//REINICIA A POSICAO DA SNAKE QUANDO MORRE
function morreu() {
    if (morto == true) {
        snake.x = canvas.width / 2;
        snake.y = canvas.height / 2;
        snake.tamanho = tamanho;
        snake.vX = 0;
        snake.vY = 0;
        morto = false;
        caudaArray.length = 0;


        //CRIA UMA NOVA POSICAO PARA A PAPINHA
        posicaoPapinha();

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

    if (cont >= 2) cont = 0;
}

//CHAMA A FUNCAO DE ANIMACAO 10 FRAMES POR SEGUNDO
var timer = window.setInterval(animar, 1000 / 20);
animar();