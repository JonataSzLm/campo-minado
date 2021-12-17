const row = 10; //numero de linhas
const col = 10; //numero de colunas
const qtd_bombs = 12; //quantidade de bombas
var campos = []; //vetor de suporte
var flag = false;
var numFlags = 0;
var min = 0;
var seg = 0;
var inicio = true;
var fim = 0;
var consulta = 0;
var go = false;

function calculaJ(x) { //calcula coluna
	var j = x % row;
	if (j == 0) {
		j = 10;
	}
	return j;
}

function calculaI(x, j) { //calcula linha
	var i = ((x - j) / col) + 1;
	return i;
}

function calculaC(i, j) { //calcula indice a partir de i e j
	var c = ((i - 1) * col) + j;
	return c;
}

function geraCampo() { //construtor
	let table = document.getElementById('tabela');
	var campo = "";
	for (var i = 1; i <= row; i++) {
		campo += '<tr>';
		for (var j = 1; j <= col; j++) {
			campo += '<td id="l' + i + 'c' + j + '"><div id="c' + i + '-' + j + '" class="campo" onclick="abreCampo(' + i + ', ' + j + ')"></div></td>';
		}
		campo += '</tr>'
	}
	table.innerHTML = campo;
	iniciaMatriz();
	geraBombas(qtd_bombs);
	geraNumeros();
	geraCores();
	contaBombas();
	document.getElementById('timer').innerHTML = '00:00';
	table.addEventListener("click", function(event) {
		if (inicio && !go) {
			iniciaTimer();
			inicio = false;
		}
	});
}



function iniciaMatriz() { //inicia vetor de suporte com 0
	for (var c = 0; c < (row*col) + 1; c++) {
		campos[c] = 0;
	}
}

function geraBombas(qtd) { //gera bombas
	const bomb = [];
	var r = 0;
	while (r < qtd) {
		var i = Math.floor(Math.random() * row) + 1;
		var j = Math.floor(Math.random() * col) + 1;
		var c = calculaC(i, j);
		if (campos[c] != 10) {
			campos[c] = 10;
			bomb[r] = document.getElementById('l' + i + 'c' + j);
			bomb[r].innerHTML = '<img src="img/bomb.svg" id="b' + r + '" class="bomb"><div id="c' + i + '-' + j + '" class="campo" onclick="gameOver(' + i + ', ' + j + ')"></div>';
			r++;
		}
	}
}

function geraNumeros() {
	var i, j = 0;
	for (var c = 1; c <= (row*col) + 1; c++) {

		j = calculaJ(c);
		i = calculaI(c, j);

		var id = 'l' + i + 'c' + j;
		let cp = document.getElementById(id);

		if (campos[c] != 10 && i >= 1 && i <= 10 && j >= 1 && j <= 10) {
			if (campos[c + 1] == 10 && (j + 1) <= 10) { // j+1 < 10
				//direita
				campos[c]++;
				cp.innerHTML = '<p class="dica">' + campos[c] + '</p><div id="c' + i + '-' + j + '" class="campo" onclick="abreCampo(' + i + ', ' + j + ')"></div>';
			}
			if (campos[c - 1] == 10 && (j - 1) >= 1) {
				//esquerda
				campos[c]++;
				cp.innerHTML = '<p class="dica">' + campos[c] + '</p><div id="c' + i + '-' + j + '" class="campo" onclick="abreCampo(' + i + ', ' + j + ')"></div>';
			}
			if (campos[c + col] == 10 && (i + 1) <= 10) {
				//baixo
				campos[c]++;
				cp.innerHTML = '<p class="dica">' + campos[c] + '</p><div id="c' + i + '-' + j + '" class="campo" onclick="abreCampo(' + i + ', ' + j + ')"></div>';
			}
			if (campos[c - col] == 10 && (i - 1) >= 1) {
				//cima
				campos[c]++;
				cp.innerHTML = '<p class="dica">' + campos[c] + '</p><div id="c' + i + '-' + j + '" class="campo" onclick="abreCampo(' + i + ', ' + j + ')"></div>';
			}

			if (campos[c - 1 - col] == 10 && (j - 1) >= 1 && (i - 1) >= 1) {
				//diagonal superior esquerda
				campos[c]++;
				cp.innerHTML = '<p class="dica">' + campos[c] + '</p><div id="c' + i + '-' + j + '" class="campo" onclick="abreCampo(' + i + ', ' + j + ')"></div>';
			}
			if (campos[c + 1 + col] == 10 && (j + 1) <= 10 && (i + 1) <= 10) {
				//diagonal inferior direita
				campos[c]++;
				cp.innerHTML = '<p class="dica">' + campos[c] + '</p><div id="c' + i + '-' + j + '" class="campo" onclick="abreCampo(' + i + ', ' + j + ')"></div>';
			}
			if (campos[c + 1 - col] == 10 && (j + 1) <= 10 && (i - 1) >= 1) {
				//diagonal superior direita
				campos[c]++;
				cp.innerHTML = '<p class="dica">' + campos[c] + '</p><div id="c' + i + '-' + j + '" class="campo" onclick="abreCampo(' + i + ', ' + j + ')"></div>';
			}
			if (campos[c - 1 + col] == 10 && (j - 1) >= 1 && (i + 1) <= 10) {
				//diagonal inferior esquerda
				campos[c]++;
				cp.innerHTML = '<p class="dica">' + campos[c] + '</p><div id="c' + i + '-' + j + '" class="campo" onclick="abreCampo(' + i + ', ' + j + ')"></div>';
			}
		}

	}
}

function geraCores() {
	var i,j = 0;
	for (var c = 1; c <= (row*col) + 1; c++) {
		
		j = calculaJ(c);
		i = calculaI(c, j);
		
		var id = 'l' + i + 'c' + j;
		let element = document.getElementById(id);

		if (campos[c] == 1) {
			element.style.color = 'green';
		} else if (campos[c] == 2) {
			element.style.color = 'blue';
		} else if (campos[c] == 3) {
			element.style.color = 'red';
		} else if (campos[c] == 4) {
			element.style.color = '#191970';
		} else if (campos[c] == 5) {
			element.style.color = 'orange';
		} else if (campos[c] == 6) {
			element.style.color = 'pink';
		} else if (campos[c] == 7) {
			element.style.color = 'gray';
		} else if (campos[c] == 8) {
			element.style.color = 'purple';
		}
	}
}

function gameOver(i_cp, j_cp) { //quando clicar na bomba
	var c = calculaC(i_cp, j_cp);
	if (flag) {	
		if (campos[c] >= 100) {
			removeFlag(c);
		} else {
			addFlag(c);
		}
	} else {
		if (campos[c] < 100) {
			for (var r = 1; r <= (row*col); r++) {
				var j = calculaJ(r);
				var i = calculaI(r, j);
				let b = document.getElementById('c' + i + '-' + j);
				animaCampo(b);
				if (r == c) {
					document.getElementById('l' + i + 'c' + j).style.cssText = 'background-color: red;';
				}
			}
			go = true;
			clearInterval(fim);
			showGO();
		}
	}
}

function abreCampo(i, j) { //revela o que esta por tras do campo
	var c = calculaC(i, j);
	if (flag) {
		if (campos[c] >= 100) {
			removeFlag(c);
		} else {
			addFlag(c);
		}
		
	} else {
		if (campos[c] < 100) {
			revelaCampos(c);
			verificaCampos(c);
			if (consulta >= (row*col) - qtd_bombs) {
				showModal();
			}
		}
	}
}

function revelaCampos(posicaoX) { //atribui -1 as celulas que serão revelados
	var i, j = 0;
	var x = posicaoX;

	j = calculaJ(x);
	i = calculaI(x, j);

	if (campos[x] == 0) { //Nao possui bomba em volta
		campos[x] = -1;
		consulta++;
		if (j+1 <= 10){
			revelaCampos(x+1);
		}
		if (j-1 >= 1) {
			revelaCampos(x-1);
		}
		if (i+1 <= 10) {
			revelaCampos(x+col);
		}
		if (i-1 >= 1) {	
			revelaCampos(x-col);
		}
		if (j+1 <= 10 && i+1 <= 10) {
			revelaCampos(x+1+col);	
		}
		if (j-1 >= 1 && i+1 <= 10) {
			revelaCampos(x-1+col);
		}
		if (j-1 >= 1 && i-1 >= 1) {	
			revelaCampos(x-1-col);
		}
		if (j+1 <= 10 && i-1 >= 1) {
			revelaCampos(x+1-col);
		}
		return
	} else if (campos[x] > 0 && campos[x] != 10 && campos[x] < 100) {
		campos[x] = -1;
		consulta++;
		return
	} else if (campos[x] == -1) {
		return
	}
}

function verificaCampos(c_campo) {
	var i, j = 0;
	for (var c = 1; c <= (row*col); c++) {
		
		j = calculaJ(c);
		i = calculaI(c, j);

		var id = 'c' + i + '-' + j;
		let camp = document.getElementById(id);

		if (campos[c] == -1) {
			animaCampo(camp);
		}
	}
}

function animaCampo(campoX) {
	campoX.style.cssText = 'animation: abrir 2s forwards;';
}


function flagCP() {
	if (!go) {
		flag = !flag;
		let f = document.getElementById('flagMenu');
		f.classList.toggle('flagAtiva');
	}
}

function addFlag(x) {
	var c = x;
	var j = calculaJ(c);
	var i = calculaI(c, j);
	var id = 'c' + i + '-' + j;
	let camp = document.getElementById(id);
	if (numFlags < qtd_bombs) {
		camp.innerHTML = '<img src="img/flag.svg" class="flag">';
		campos[c] = campos[c] + 100;
		numFlags++;
		contaBombas();
	}
}	

function removeFlag(x) {
	var c = x;
	var j = calculaJ(c);
	var i = calculaI(c, j);
	var id = 'c' + i + '-' + j;
	let camp = document.getElementById(id);
	if (numFlags > 0) {
		camp.innerHTML = '';
		campos[c] = campos[c] - 100;
		numFlags--;
		contaBombas();
	}
}
 function restartGame() {
 	//recarrega a pagina
 	window.location.reload();
}

function iniciaTimer() {
	fim = window.setInterval(function timer(){
		seg++;
		let timer = document.getElementById('timer');
		if (seg == 60) {
			seg = 0;
			min++;
		}
		if (min == 0) {
			if (seg < 10) {
				timer.innerHTML = '00:0' + seg;
			} else {
				timer.innerHTML = '00:' + seg;
			}
		} else if (min < 10) {
			if (seg < 10) {
				timer.innerHTML = '0' + min + ':0' + seg;
			} else {
				timer.innerHTML = '0' + min + ':' + seg;
			}
		} else if (min < 60) {
			if (seg < 10) {
				timer.innerHTML = min + ':0' + seg;
			} else {
				timer.innerHTML = min + ':' + seg;
			}
		} else {
			gameOver(1, 1);
		}
	}, 1000);
}

function contaBombas() {
	document.getElementById('qtdBombas').innerHTML = qtd_bombs - numFlags;
}

function showModal() {
	let tempo = document.getElementById('timer').innerHTML;
	let modal = document.getElementById('modal');
	let myTime = document.getElementById('myTime');
	let myRecord = document.getElementById('myRecord');
	modal.classList.toggle('showModal');
	myTime.innerHTML = tempo;
	writeRecord(tempo);
	myRecord.innerHTML = readRecord();
}

function writeRecord(tempo) {
	if (tempo < readRecord() || readRecord() == null) {
		localStorage.setItem('time', tempo);
	}
}

function readRecord() {
	return localStorage.getItem('time');
}

function showGO() {
	if (go) {
		let gameover = document.getElementById('gameover');
		gameover.classList.toggle('showGO');
	}
}