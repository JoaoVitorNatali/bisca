function deixacontecer(){
	canvas.removeEventListener("click", deixacontecer); //sem isso basicamente vai pedir eternamente para rodar o codigo

	baralho_inteiro = baralho_inteiro_fixo;
	var player = ["","",""];
	var computer = ["","",""];
	var bufferMesa = ["", ""];
	pontosPlayer = 0;
	pontosComputer = 0;
	corte = sortearCorte();
	nipe_corte = nipeCarta(corte);
	quantJogadas = 0;

	for(let i = 0; i < 3; i++){
		player[i] = sortearCarta();
		computer[i] = sortearCarta();
	}

	update(player, computer, bufferMesa);

	let sequencia = Math.floor(Math.random()*2); //define quem começa
				
	if(sequencia == 1){
		travaEncarteComputer = 1;
		travaGlobal = 1;
		jogadaPlayer(player, computer, MANDANTE, bufferMesa);
	}
	else{
		travaEncarteComputer = 0;
		jogadaComputer(player, computer, MANDANTE, bufferMesa);
	}
}
