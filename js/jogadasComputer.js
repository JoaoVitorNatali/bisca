function sorteaCartaPc(vet){ //sorteia a carta que o pc vai jogar
	let sorte;
	do{
		sorte = Math.floor(Math.random()*3);
		if(vet[sorte] != "") return sorte;
	}while(vet[sorte] == "");
}

function jogadaComputer(player, computer, buffer, bufferMesa){ //a jogada computer basicamente vai escolher uma carta para jogar, antes do player
	let tempoEspera = 1500;
	setTimeout(function(){
		this.indexCarta = cartaMaisInutil(computer);
		this.carta = computer[this.indexCarta];
		computer[this.indexCarta] = "";
		bufferMesa[buffer-8] = this.carta;
		update(player, computer, bufferMesa);
		travaEcarteComputer = 0;
		setTimeout( function(){
			travaGlobal = 1;
			jogadaPlayer(player, computer, 9, bufferMesa);
		}, tempoEspera);
	}, tempoEspera);
}

function encarteComputer(player, computer, buffer, bufferMesa){ //essa aqui, ao contrario da jogada, ela joga depois do player
	let tempoEspera = 1500;
	setTimeout(function(){
		this.indexCarta = jogadaInteligente(computer, bufferMesa[0]);
		this.carta = computer[this.indexCarta];
		computer[this.indexCarta] = "";
		bufferMesa[buffer-8] = this.carta;
		update(player, computer, bufferMesa);
		computarQuemGanhou(bufferMesa, "player", "computer", player, computer);
	}, tempoEspera);
}

function jogadaInteligente(minhaMao, cartaMesa){ //retornar o indice da carta
	let indice_minha_carta;
	let nipe_carta_mesa = nipeCarta(cartaMesa);
	let value_carta_mesa = indiceCartaEmOrdem(cartaMesa, nipe_carta_mesa);
	let sete = new RegExp(/^sete/i);
	let as = new RegExp(/^As/i);
	if(nipe_carta_mesa == nipe_corte){//primeiro vamos ver se é corte que tem na mesa
		
		if(sete.test(cartaMesa) == true){ // se for o sete, preciso saber se tenho o As para dar o reli né
			indice_minha_carta = cartaEncarte(value_carta_mesa, nipe_carta_mesa, minhaMao);
			if(indice_minha_carta != -1) return indice_minha_carta;
			else return cartaMaisInutil(minhaMao);
		}
		else{ //presumo que se o corte na mesa não for o sete, então é melhor jogar lixo pro jogador
			return cartaMaisInutil(minhaMao);
		}
	}

	else{ //se veio aqui é pq não é corte na mesa
		//vamos ver se é bisca e tentar pegar a qualquer custo
		if(sete.test(cartaMesa) == true || as.test(cartaMesa) == true){
			indice_minha_carta = cartaEncarte(value_carta_mesa, nipe_carta_mesa, minhaMao);
			if(indice_minha_carta != -1) return indice_minha_carta;	 //tenta encartar
			indice_minha_carta = cortar(minhaMao);
			if(indice_minha_carta != -1) return indice_minha_carta; //tenta cortar
		}
		else{
			//não era bisca na mesa
			//ou era bisca mas eu não tenho corte nem encarte
			//vamos tentar encartar essa pra levar uns pontos quem sabe
			indice_minha_carta = cartaEncarte(value_carta_mesa, nipe_carta_mesa, minhaMao);
			if(indice_minha_carta != -1) return indice_minha_carta; //mas pra encartar, eu preciso ter como kk
			else return cartaMaisInutil(minhaMao);
		}
		
		
	}
}

function cartaEncarte(value_carta_mesa, nipe_mesa, minhaMao){ //simplesmente retorna o indice da sua maior carta que encarta a da mesa
	let maior = value_carta_mesa;
	let meuNipe;
	let meuIndex = -1;
	let myValueIndex;

	for(let i = 0; i < 3; i++){
		if(minhaMao[i] != ""){//valida se não ta vazia a posição
			meuNipe = nipeCarta(minhaMao[i]);//descobre meu nipe
			if(meuNipe == nipe_mesa){ //valida se meu nipe é do mesmo nipe da mesa
				myValueIndex = indiceCartaEmOrdem(minhaMao[i], meuNipe); //descobre o valor do indice da minha carta
				if(myValueIndex > maior){
					maior = myValueIndex;
					meuIndex = i;
				}	
			}
		}
	}
	return meuIndex;
}

function cartaMaisInutil(minhaMao){
	let auxNipe;
	let auxValue;
	let auxPontos = [0,0,0]; //vou atribuir pontos pras cartas, quanto menor ganha
	for(let i = 0; i < 3; i++){
		if(minhaMao[i] == "") auxPontos[i] = 999;
		auxNipe = nipeCarta(minhaMao[i]);
		auxValue = indiceCartaEmOrdem(minhaMao[i], auxNipe);
		if(auxNipe == nipe_corte){ //se for corte
			auxPontos[i] += auxValue + 3;
		}
		if(auxValue > 7){ //se for bisca
			auxPontos[i] += auxValue + 2;
		} else if(auxValue > 4){ //se for ponto
			auxPontos[i] += auxValue -1;
		}
	}

	let menor;
	let indexmenor;
	let flag = 0;
	for(let j = 0; j < 3; j++){
		if( (auxPontos[j] < menor) || (flag == 0) ) {
			flag = 1;
			menor = auxPontos[j];
			indexmenor = j;
		}
	}
	return indexmenor; //retorna o indice da carta mais bosta do usuario
}

function cortar(minhaMao){// retorna o indice da sua menor carta capaz de cortar ou -1 se não tiver corte
	let auxVet = [99,99,99];
	let auxNipe;
	for(let i = 0; i < 3; i++){
		auxNipe = nipeCarta(minhaMao[i]);
		if(auxNipe == nipe_corte){
			auxVet[i] = indiceCartaEmOrdem(minhaMao[i], auxNipe);
		}
	}
	let flag = 0;
	let menor;
	let auxIndex  = -1;
	for(let i = 0; i<3; i++){
		if((auxVet[i] < menor) || (flag == 0) ){
			flag = 1;
			menor = auxVet[i];
			auxIndex = i;
		}
	}
	return auxIndex;
}