function sortearCorte(){
	let index, carta;
	let as = new RegExp(/^As/i);
	let sete = new RegExp(/^sete/i);
	do{
		index = Math.floor(Math.random()*(baralho_inteiro.length));
		carta = baralho_inteiro[index];
	}while(as.test(carta) == true || sete.test(carta) == true);

	baralho_inteiro.splice(index, 1);
	return carta;
}

function sortearCarta(){
	if(baralho_inteiro.length == 0){
		let aux = corte;
		corte = "";
		return aux;
	}
	else{
		let index = Math.floor(Math.random()*(baralho_inteiro.length));
		let carta = baralho_inteiro[index];
		baralho_inteiro.splice(index, 1); //desaparece com a carta sem deixar nenhum suspeito, tlgd
		return carta;
	}
}

function nipeCarta(carta) {
	for(let i = 0; i < 10; i++){
		if(carta == baralho_paus[i]) return 0;//paus
		else if(carta == baralho_copas[i]) return 1; //copas
		else if(carta == baralho_espada[i]) return 2; //espada
		else if(carta == baralho_ouro[i]) return 3; //ouro
		
	}
}

function descobreindexCarta(carta, nipe){
	this.baralho = [];
	if(nipe == 0) this.baralho = baralho_paus;
	else if(nipe == 1) this.baralho = baralho_copas;
	else if(nipe == 2) this.baralho = baralho_espada;
	else if(nipe == 3) this.baralho = baralho_ouro;
	for(let i = 0; i < 10; i++){
		if(this.baralho[i] == carta){
			return i;
		}
	}
}

function jogadaPlayer(player, computer, buffer, bufferMesa){
	
	this.x;
	this.y;
	var eixoYa, eixoYb;
	var eixoX1, eixoX2, eixoX3, limite1, limite2, limite3;
	let carta, indexCarta;
	let event;
	canvas.addEventListener("mousedown", joga);

	function joga(e){
		playerJogada(player, computer, buffer, bufferMesa, e);
	}
	
	function playerJogada(player, computer, buffer, bufferMesa, e){
		
		var rect = canvas.getBoundingClientRect();  // get element's abs. position
		this.x = e.clientX - rect.left;              // get mouse x and adjust for el.
		this.y = e.clientY - rect.top;               // get mouse y and adjust for el.
		// console.log('Mouse position: ' + this.x + ',' + this.y); //mostra a posição do mouse
		eixoYa = ALTURA/2;
		eixoYb = ALTURA;
		larguraCarta = 100;
		alturaCarta = 150;
		eixoX1 = (LARGURA/2) - (larguraCarta/2) - (larguraCarta + espacamento);
		limite1 = eixoX1 + larguraCarta;
		eixoX2 = limite1 + espacamento;
		limite2 = eixoX2 + larguraCarta;
		eixoX3 = limite2 + espacamento;
		limite3 = eixoX3 + larguraCarta;
		let trava = 0;
		if( (this.y >= eixoYa) && (this.y <= eixoYb) ){
			if ((this.x >= eixoX1)&& (this.x <= limite1) ){
				// console.log("quadrado 1");
				indexCarta = 0;
				trava = 1;
			}
			else if( (this.x >= eixoX2) && (this.x <= limite2) ){
				// console.log("quadrado 2");
				indexCarta = 1;
				trava = 1;
			}
			else if( (this.x >= eixoX3) && (this.x <= limite3) ){
				// console.log("quadrado 3");
				indexCarta = 2;
				trava = 1;
			}
		}
		if(trava == 1){ //essa trava impede reação de click em outras partes que não sejam cartas
			if(player[indexCarta] != ""){ //esse if impede que aconteça reação de click se naquela posição do vetor não tenha mais carta
				if(travaGlobal == 1){
					travaGlobal = 0;
					if(travaEncarteComputer == 0) buffer = 9;
					else buffer = 8;
					bufferMesa[buffer-8] = player[indexCarta];
					player[indexCarta] = "";
					update(player, computer, bufferMesa);
					if (travaEncarteComputer == 1) encarteComputer(player, computer, ENCARTE, bufferMesa);
					else computarQuemGanhou(bufferMesa, "computer", "player", player, computer); //se o player encartou, entao computa
					// canvas.removeEventListener("mousedown", joga);
				}
			}	
		}
	} //muito cuidado ao mexer nesse território
}

function indiceCartaEmOrdem(carta, nipe){
	let vet = ["dois", "tres", "quatro", "cinco", "seis", "dama", "valete", "reis", "sete", "As"];
	let stringNipe;
	if(nipe == 0) stringNipe = "-paus";
	else if(nipe == 1) stringNipe = "-copas";
	else if(nipe == 2) stringNipe = "-espada";
	else if(nipe == 3) stringNipe = "-ouro";
	for(let i = 0; i < 10; i++){
		if(carta == (vet[i]+stringNipe)) return i;
	}
}

function computarQuemGanhou(bufferMesa, ordem1, ordem2, player, computer){

	this.carta1 = bufferMesa[0];
	this.carta2 = bufferMesa[1];

	this.nipe1 = nipeCarta(this.carta1);
	this.nipe2 = nipeCarta(this.carta2);

	this.indice1 = indiceCartaEmOrdem(this.carta1, this.nipe1);
	this.indice2 = indiceCartaEmOrdem(this.carta2, this.nipe2);

	this.ganhador;
	//primeiro verifica se são do mesmo nipe
	if(this.nipe1 == this.nipe2){ //são do mesmo nipe, agora elas que lutem
		if(this.indice1 > this.indice2) this.ganhador = ordem1;
		else if(this.indice2 > this.indice1) this.ganhador = ordem2;
	}
	else{
		if(this.nipe2 == nipe_corte) this.ganhador = ordem2;
		else if(this.nipe1 == nipe_corte) this.ganhador = ordem1;
		else this.ganhador = ordem1;
	}
	
	atribuirPontuacao(bufferMesa, ganhador, indice1, indice2);
	proximaJogada(player, computer, bufferMesa, ganhador);
}

function atribuirPontuacao(bufferMesa, ganhador, indice1, indice2){
	let vetPontuacao = [0,0,0,0,0,2,3,4,10,11];
	if(ganhador == "player"){
		pontosPlayer += vetPontuacao[indice1];
		pontosPlayer += vetPontuacao[indice2];
	}
	else if(ganhador == "computer"){
		pontosComputer += vetPontuacao[indice1];
		pontosComputer += vetPontuacao[indice2];
	}
}

function proximaJogada(player, computer, bufferMesa, ganhador){
	
	if(baralho_inteiro.length > 0){
		for(let i = 0; i < 3; i++){
			if(player[i] == "") player[i] = sortearCarta();
			if(computer[i] == "") computer[i] = sortearCarta();
		}
	}

	let time = 1500;
	setTimeout(function(){

		bufferMesa[0] = "";
		bufferMesa[1] = "";
		update(player, computer, bufferMesa);

		quantJogadas += 1;
		if(quantJogadas == 20){
			acabaOJogo();
		}
		else{
			// setTimeout( function(){

				if(ganhador == "player"){
					travaEncarteComputer = 1;
					travaGlobal = 1;
					jogadaPlayer(player, computer, MANDANTE, bufferMesa);
				}

				else if(ganhador == "computer"){
					travaEncarteComputer = 0;//impedir o pc de encartar
					jogadaComputer(player, computer, MANDANTE, bufferMesa);
				}

			// }, time);
		}
	}, time)
	
	
}