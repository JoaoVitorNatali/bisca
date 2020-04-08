var figura;
window.onload = init;

function init(){
//editar dinamicamente as atribuições de crédito
var foot = document.getElementById("foot");
foot.style.marginTop = (ALTURA + 50) + "px";


canvas = document.createElement("canvas");
canvas.width = LARGURA;
canvas.height = ALTURA;
canvas.style.border = "3px solid #000";
document.body.appendChild(canvas);
ctx = canvas.getContext("2d");

//crio os elementos imagem
fundo = document.createElement('img');
verso = document.createElement('img');
figura = document.createElement('img');
win = document.createElement('img');
lost = document.createElement('img');
initPlay = document.createElement('img');
//adiciono os atributos de localização
win.src = "img/ganhou.png";
lost.src = "img/perdeu.png";
initPlay.src = "img/play.png";
fundo.src = "img/fundo_novo.png";
verso.src = "img/versoCarta.jpg";
figura.src = "img/baralhoBisca.png";

figura.onload = function(){
	LARGURACARTA = (figura.width)/10;
	ALTURACARTA = (figura.height)/4;
	alturaSaidaImagens = (LARGURA * initPlay.height)/initPlay.width;
	Y = (ALTURA - alturaSaidaImagens)/2;
	X = 0;


	ctx.drawImage(fundo, 0, 0, LARGURA, ALTURA);
	console.log(fundo);
		
	ctx.drawImage(initPlay, 0, 0, initPlay.width, initPlay.height, X, Y, LARGURA, alturaSaidaImagens);
	canvas.addEventListener("click", deixacontecer);
}

}
