baralho_copas = ["As-copas", "dois-copas", "tres-copas", "quatro-copas","cinco-copas","seis-copas", "sete-copas", "valete-copas", "dama-copas", "reis-copas"];
baralho_ouro = ["As-ouro", "dois-ouro", "tres-ouro", "quatro-ouro","cinco-ouro","seis-ouro", "sete-ouro","valete-ouro","dama-ouro","reis-ouro"];
baralho_espada = ["As-espada", "dois-espada", "tres-espada", "quatro-espada","cinco-espada","seis-espada", "sete-espada", "valete-espada", "dama-espada","reis-espada"];
baralho_paus = ["As-paus", "dois-paus", "tres-paus", "quatro-paus","cinco-paus","seis-paus", "sete-paus","valete-paus","dama-paus","reis-paus"];
baralho_inteiro_fixo = ["dois-copas", "tres-copas", "quatro-copas","cinco-copas","seis-copas","sete-copas","dama-copas","valete-copas","reis-copas","As-copas", "dois-ouro", "tres-ouro", "quatro-ouro","cinco-ouro","seis-ouro","sete-ouro","dama-ouro","valete-ouro","reis-ouro","As-ouro", "dois-espada", "tres-espada", "quatro-espada","cinco-espada","seis-espada","sete-espada","dama-espada","valete-espada","reis-espada","As-espada", "dois-paus", "tres-paus", "quatro-paus","cinco-paus","seis-paus","sete-paus","dama-paus","valete-paus","reis-paus","As-paus"];
baralho_inteiro = [];
//ouro, paus, copas, espada
//paus, copas, espada, ouro

//imagens no geral
var ctx;
var canvas;
var fundo;
var figura;
var verso;
var win;
var lost;
var initPlay;

var larguraSaida = 100;
var alturaSaida = 150;
var alturaSaidaImagens;

var ALTURACARTA, LARGURACARTA;
var X,Y; 

//declaração das variáveis globais

ALTURA = 600; LARGURA = 800;
var corte;
var nipe_corte;
var travaGlobal = 0;
var pontosPlayer;
var pontosComputer;
var quantJogadas;
var travaEncarteComputer = 0; //essa variavel vai impedir o encarte do computer depois da jogada do player // se 1 o computer encarta
const MANDANTE = 8;
const ENCARTE = 9;
const espacamento = 10;

function drawCarta(carta, buffer){
	this.posX = poxY = 0;
	this.nipe = nipeCarta(carta);
	this.indiceCarta = descobreindexCarta(carta, this.nipe);
	//encontra o nipe
	this.posY = this.nipe * ALTURACARTA;
	//encontra a carta certa
	this.posX = LARGURACARTA * this.indiceCarta;
	createPlayerStock(this.posX, this.posY, buffer);

}

function createPlayerStock(origemX, origemY, buffer){
	this.eixoY;
	this.eixoX;
	this.imagem = figura;
	this.srcX = origemX;
	this.srcY = origemY;
	this.larguraCarta = LARGURACARTA;
	this.alturaCarta = ALTURACARTA;
	
	if(buffer == 1 || buffer == 2 || buffer == 3){ //espaço reservado para as cartas do pc
		this.eixoY = ((ALTURA/2)- alturaSaida)/2;

		this.eixoX = ( ( LARGURA - ( (larguraSaida+espacamento)*3 ) )/2) +((larguraSaida+espacamento)*(buffer-1));
		this.imagem = verso;
		this.srcX = 0;
		this.srcY = 0;
		this.larguraCarta = this.imagem.width;
		this.alturaCarta = this.imagem.height;
	}
	
	else if(buffer == 4 || buffer == 5 || buffer == 6){ //espaço reservado para as cartas do jogador
		buffer -= 3;
		this.eixoY = (((ALTURA/2) - alturaSaida)/2) + (ALTURA/2);
		this.eixoX = ( ( LARGURA - ( (larguraSaida+espacamento)*3 ) )/2) +((larguraSaida+espacamento)*(buffer-1));
	}
	
	else if(buffer == 7){ //espaço reservado para o corte
		this.eixoY = (ALTURA/2)-(alturaSaida/2);
		this.eixoX = 30;
		drawCorte(origemX, origemY, eixoX, eixoY);
	}

	else if(buffer == 8){ //espaço reservado para a mesa, no mandante
		this.eixoY = (ALTURA/2) - (alturaSaida/2);
		this.eixoX = (LARGURA/2) - (larguraSaida + espacamento);
	}

	else if(buffer == 9){ //espaço reservado para a mesa, no encarte
		this.eixoY = (ALTURA/2) - (alturaSaida/2);
		this.eixoX = (LARGURA/2) + espacamento;
	}

	if (buffer != 7)ctx.drawImage(this.imagem, this.srcX, this.srcY, this.larguraCarta, this.alturaCarta, this.eixoX, this.eixoY, larguraSaida, alturaSaida);
}

function drawPlayersPoints(){
	const espacamento = 10;
	const quad = 40

	//draw computer
	this.eixoY = (((ALTURA/2)-alturaSaida)/2) + (alturaSaida/2) - (quad/2);
	this.eixoX = ( ( LARGURA - ( (larguraSaida+espacamento)*3 ) )/2) +((larguraSaida+espacamento)*(4-1));

	ctx.fillStyle = "#daa520";
	ctx.fillRect(eixoX, eixoY, quad, quad);
	ctx.font = "23px arial";
	ctx.fillStyle = "yellow";
	ctx.fillText(pontosComputer, eixoX, eixoY+30);

	this.eixoY = (((ALTURA/2)- alturaSaida)/2)+(ALTURA/2)+(alturaSaida/2)-(quad/2);
	this.eixoX = ( ( LARGURA - ( (larguraSaida+espacamento)*3 ) )/2) +((larguraSaida+espacamento)*(4-1));

	ctx.fillStyle = "#daa520";
	ctx.fillRect(eixoX, eixoY, quad, quad);
	ctx.font = "23px arial";
	ctx.fillStyle = "yellow";
	ctx.fillText(pontosPlayer, eixoX, eixoY+30);
}

function drawCorte(origemX, origemY, eixoX, eixoY){
	this.larguraCarta = LARGURACARTA;
	this.alturaCarta = ALTURACARTA;
	this.imagem = figura;
	this.srcX = origemX;
	this.srcY = origemY;
	ctx.save();
	let meioX = eixoX + (larguraSaida/2);
	let meioY = eixoY + (alturaSaida/2);
	ctx.translate(meioX, meioY);
	ctx.rotate(90*Math.PI/180);

	ctx.drawImage(this.imagem, this.srcX, this.srcY, this.larguraCarta, this.alturaCarta, -eixoX*1.5, -eixoY/2, larguraSaida, alturaSaida);
	ctx.restore();
}

function desenhaPilha(){
	if(baralho_inteiro.length > 0){
		var pX = 10;
		var pY = (ALTURA/2) - (alturaSaida/2);
		for(let i = 0; i < baralho_inteiro.length/2; i++){
		ctx.drawImage(verso, 0, 0, verso.width, verso.height, pX, pY, larguraSaida, alturaSaida);
		pY += 2;
		}
	}
}

function update(player, computer, bufferMesa){
	ctx.clearRect(0,0,ALTURA, LARGURA);
	ctx.drawImage(fundo, 0, 0, LARGURA, ALTURA);
	drawCarta(corte, 7);
	desenhaPilha();

	for(let i = 0; i < 3; i++){
		if(computer[i] != "")drawCarta(computer[i], i+1);
		drawCarta(player[i], i+4);
	}
	
	drawCarta(bufferMesa[0], 8);
	drawCarta(bufferMesa[1], 9);

	drawPlayersPoints();
}

function acabaOJogo(){
	this.imagem;
	if(pontosPlayer > pontosComputer)this.imagem = win;
	else this.imagem = lost;

	alturaSaidaImagens = (LARGURA * this.imagem.height)/this.imagem.width;
	X = 0;
	Y = (ALTURA - alturaSaidaImagens)/2;

	ctx.drawImage(fundo, 0, 0, LARGURA, ALTURA);
	ctx.drawImage(this.imagem, 0, 0, this.imagem.width, this.imagem.height, X, Y, LARGURA, alturaSaidaImagens);
	// setTimeout(function(){
	// 	let jogar_novamente = confirm("Deseja jogar novamente? ");
	// 	if(jogar_novamente == true) deixacontecer();
	// 	else alert("Até logo!");
	// }, 3000)
	
}




