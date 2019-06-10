

/* Snake Game */

const blankCell = "statusEmpty", hindrancesCell = "statusBarrier", snakeCellBody = "statusBody", foodCell = "statusFood", wallCell = "statusWall";
// konstanten, die die Richtung erklären
const left = 37, up = 38, right = 39, down = 40;														// Tastatur Richtungen

const verticalAxis		= 0;																			// Die horizentale Axe hat den Wert 1(oben und unten)
const horizentalAxis	= 1;																			// Die vertikale Axe hat den Wert 0(Links und Recht)
const ownLogOn			= true;																			// wenntrue, dann loggen

var gridContainer;
var height;
var width;																								// Der Variable wurde bei der Funktion create Grid als ein Node verwendet . 
var cells				= new Array();																	// für die Erstellung unseres Grid, haben wir ein lerres Array zu dem Varibale cells zugewiesen.
var snake;
var ProzessInterval;																					// für die Funktion, die später mehrere funktionen in Interval einsetzt.
var interval;
var defaultDirection	= right;																		// Die Richtung, die am anfang die Schlange benutzt.
var settingDirection;
var direction			= null;																			// direction am Anfang ist null 
var foodExist			= false;																		// Food wurde am Anfang nicht erstellt,
// es wird ers dann erstellt, wenn auf dem Knopf gedrückt wird 
var createdGrid			= false;																		// Grid am anfang wurde nicht erstellt, es wird erst dann erstellt, wenn wir auf button drücken
var score = 0;
var firstLevelButton;
var secondLevelButton;
var thirdLevelButton;

window.addEventListener("keydown", setWay, false);														// Die Methode .addEventListener() wird an der spezifizierten Element 
function startInterval(){																				// start Interval über Interval
	interval = window.setInterval(prozessInterval, 150);												// hir kann auch die Geschwindigkeit Kontrolieren 
	levelFirstInterval = window.setInterval(firstLevelBarrier, 5000);									// alle 5 sek  für leveländerung
	levelTwoInterval = window.setInterval(secondLevelBarrier, 60000);									// alle 1 min ausführen für leveländerung
	levelThreeInterval = window.setInterval(thirdLevelBarrier, 90000);									// alle 1,2 min für leveländerung
}

function firstInterval(){
	levelFirstInterval = window.setInterval(firstLevelBarrier, 0);										// nach 0 Sekunde wird erste Hindernisse gezeigt.aber hier nur wenn auf 
																										// auf dem Knopf gedruckt wird.
}
window.clearInterval(levelFirstInterval);
function secondInterval(){
	levelTwoInterval = window.setInterval(secondLevelBarrier, 0);										// nach 0 Sekunde wird zweite Hindernisse gezeigt.aber hier nur wenn auf 
																										// auf dem Knopf gedruckt wird.
}
window.clearInterval(levelTwoInterval);
function thirdInterval(){
	levelThreeInterval = window.setInterval(thirdLevelBarrier, 0);										// nach 0 Sekunde wird dritte Hindernisse gezeigt.aber hier nur wenn auf 
																										// auf dem Knopf gedruckt wird.
}
window.clearInterval(levelThreeInterval);
function stopInterval(){																				//funktion für Stop Inteval
	window.clearInterval(interval);																		// für Pause
	window.clearInterval(levelFirstInterval);															// für leveländerung  Hier nochmal, weil die für automatische Erstellung der Hindernisse in gegebeneIntervall sind. 
	window.clearInterval(levelTwoInterval);																// für leveländerung
	window.clearInterval(levelThreeInterval);															// für leveländerung
}
function createGrid(){
	if (createdGrid === true){																			// hier wird geprüft, ob Grid erstellt wurde oder nein , wenn ja dann gebe zurück
		return;
	}
	width = parseInt(document.getElementById('width').value);											// umwandeln von String DatenType to Integer, 
																										// dann zugreifen über Id von Html Datei																								
	height = parseInt(document.getElementById('height').value);
	gridContainer = document.getElementById('createGrid');												// Node erstellen
	for (row = 0; row < height; row++){																	// zeile
		cells[row] = new Array();
		for (column = 0; column < width; column++){														// spalte
			var child = document.createElement('div');													// Node erstellen
			child.setAttribute('class', 'cell');
			child.setAttribute('id', 'cell_' + row + '_' + column);
			gridContainer.appendChild(child);															// Das Kind Element wurde mit ElternElement verknüpft.
			cells[row][column] = blankCell;																//den Status von fast alle Cells ist Empty.
		}
		var child = document.createElement('div');
		child.setAttribute('class', 'clear');
		gridContainer.appendChild(child);
	}

	createdGrid = true;																					// wenn Grid schon erstellt wurde, dann stop 																					
	createSnake();																						// Die Methode Snake muss auch hier aufgerufen werden .
	startInterval();
	showLevel();
}

function firstLevelBarrier(){																			// Die Hindernisse wurden im for Schleife auf den Positionen festgelegt.
	for (x = 15; x < 24; x++){
		for (y = 15; y < 19; y++){
		}
		setCellStatus(hindrancesCell, x, y);
	}
}
function secondLevelBarrier(){
	for (x = 12; x < 17; x++){																			// Die Hindernisse wurden im for Schleife auf den Positionen festgelegt.
		for (y = 4; y < 8; y++){
		}
		setCellStatus(hindrancesCell, x, y);
	}
}
function thirdLevelBarrier(){
	for (x = 1; x < 7; x++){
		for (y = 0; y < 6; y++){
		}																								// Die Hindernisse wurden im for Schleife auf den Positionen festgelegt.
		setCellStatus(hindrancesCell, x, y);
	}
}
function setCellStatus(newStatus, rowPosition, columnPosition){											//Funktion für setzen des Status, 3 parameter 
																										// die Status habe als const definiert und auch in css File als klasse 
	cells[rowPosition][columnPosition] = newStatus;
	childId = 'cell_' + rowPosition + '_' + columnPosition;												// Node erstellen

	childNode = document.getElementById(childId);														// greift auf ein Element by eindeutiges Id-Attribute
	childNode.setAttribute('class', 'cell ' + newStatus);												//setzt Status auf Node
}

function getCellStatus(rowPosition, columnPosition)														//hole Status
{
																										//von anzahl der Rows wird Hohe und von der Anzahl von Column wird Bereite
	if (rowPosition >= height || rowPosition < 0 || columnPosition >= width || columnPosition < 0){      //Hier gibt 4 Richtungen Hohe nach Oben und nach Unten, und Bereite nach Oben und nach  Unten.
																										//wenn Hohe nach Unten großegleich als maximale größe der Grid ist oder wenn Hohe nach oben
																										//kleine als 0 oder wenn bereite nach Rechts größegleich als maximalebereite ist oder wenn 
																										//wenn Bereite nach Links kleine als 0 ist dann..
							
		return wallCell;
	}																									// dann return denn Status wallCell
	return 	cells[rowPosition][columnPosition];
}

function prozessInterval(){
	if (direction !== null){																			// Richtung Ermitteln, wenn der nächste Richtung nicht null ist ,
																										//setzt neue Richtung auf defaultDirection. und  setzt nochmal direction auf null
		defaultDirection = direction;
		direction = null;
	}

																										//Beachtung des Status des nächtes Feldes
	var nextFeldPos = nextFeldPosition();																//Die nächste Position des Feldes
	var nextFeldStatus = getCellStatus(nextFeldPos[verticalAxis], nextFeldPos[horizentalAxis]);			// Hole den Status von des Feldes, welches der sowohl vertikale alsauch horizentale 
																										// Axe hat. Der hat den Datentype Array
																										//switch oder if anhand des status

	if (nextFeldStatus === blankCell){																	// wenn nächtesFeld lerr Status hat
	
		addingHead(nextFeldPos[verticalAxis], nextFeldPos[horizentalAxis]);								//hinzufügen von Kopf und Löschen von Schwanz der Schlange
		removingTail();
	} 
	else if (nextFeldStatus === hindrancesCell){														// wenn in nächtes Feld ein hinderniss steht		
		gameOver();																						// die Methode gameOver wurde hier aufgerufen
	} 
	else if (nextFeldStatus === foodCell){																//wenn nächtes Feld Food ist,dann wird gegessen und wird dadurch die Schlange länger 
		addingHead(nextFeldPos[verticalAxis], nextFeldPos[horizentalAxis]);								//Hinzufügen Kopf nochmal
		foodExist = false;																				// Food wurde einmal generiert und gegessen.Es gibt nicht mehr auf dem Feld.
		countFood();
	} 
	else if (nextFeldStatus === snakeCellBody){
		gameOver();																						// wenn Snake sich beisst, dann ist das Spiel vorbei.
	} 
	else if (nextFeldStatus === wallCell){
		gameOver();
	}
	createFood();																						// Die Methode Create Food wird im Intervall aufgerufen
}

function  createSnake(){																				// Snake Erstellen
																								    	// ein Snake, welches ein deminsionale Array darstellt.Der hat zwei Element
	ownLog('createSnake');																				// die nennen wir Kopf und Schwanz der Schlnage
	snake = [[0, 0], [0, 1]];

	setCellStatus(snakeCellBody, 0, 0);																	// setzt Status an der Position 0,0 und 0,1
	setCellStatus(snakeCellBody, 0, 1);
}
function positionCurrentHead(){																			// Position aktualles Kopf, welche der erstes Element Array ist
	ownLog('positionCurrentHead');
	var ac = (snake.slice(snake.length - 1, snake.length));												// Das erste Element wird aus dem Array zurück gegeben.
																										//.Die Slice() Methode schreibt eine SchattenKopie von einem Teil des Arrays in
																										// ein neues Array-Objekte von begin bis end. Sie nimmt zwei parameter einer Beginn 
																										// einer end, also end wir nicht enthalten
	return ac[0];																						// gebe der Position des aktuellesKopf auf index deer Schattenkopie des Arrays zurück
}
function nextFeldPosition(){																			// Die Funktion zeigt die Position des nächstes Feld
	ownLog('nextFeldPosition');

	var snakeHead = positionCurrentHead();
	var positionHorizental = snakeHead[horizentalAxis];													//hier wurde jede Axe aleine zu eine Variable hinzugefügt 
	var positionVertical = snakeHead[verticalAxis];
	switch (defaultDirection){																			// Die Anweisung wird verwendet, 
																										//um verschiedene Aktionen auf der Grundlage verschiedene Bedingungen zu erliedigen.
				case left:
					positionHorizental--;																//in x Axe nach links wird dekrementiert
					break;
				case up:
					positionVertical--;																	//in y Axe nach oben wird dekrementiert
					break;
				case right:
					positionHorizental++;																//in x Axe  nach rechts wird inkrementiert
					break;
				case down:
					positionVertical++;																	//in y Axe nach unten wird inkrementiert
					break;
			}
	return [positionVertical, positionHorizental];														// gib die Position nächtes Fledes zurück 
}
function  addingHead(rPosition, cPosition){																// zum Bewegen ein Neues Kopf hinzufügen 
	snake.push([rPosition, cPosition]);																	//füge ein Element am ende des Arrays in der Position rPosition and cPosition
	setCellStatus(snakeCellBody, rPosition, cPosition);													//setzt Status an der Positionen Snake Body
	ownLog('addingHead');
}
function removingTail(){																				//zum Bewegen, der Schwanz muss gelöscht werden,
																										// immer und immer an der selbe Position 0,1 des Arrays
	var ac = snake.slice(0, 1);																			//begin der Slice 0 und ende 1 und 1 wird nicht enthalten, dann 0
	var tail = ac[0];																					// von der SchttenKopie des Arrays die nullte Position 
	setCellStatus(blankCell, tail[verticalAxis], tail[horizentalAxis]);									// indem Fall setzt die Status Empty an der nullte Position vertikal und horizental
	snake.shift();																						// lösche das erste Element																		
	ownLog('removingTail');
}
																										//	eine Ereignisbehandlungroutine befestigt.
																										// Richtung geben
																										// hier wird user Eingabe abgefangen
function setWay(event){																					// wenn Taste von user gedrückt wird, nimmt eine neue Richtung
	ownLog('setWay');
	switch (event.keyCode){
		case left:
			if (direction !== right){
				direction = left;
			}
			ownLog('direction is left');
			break;
		case up:
			if (direction !== down){
				direction = up;
				ownLog('direction is up', );
			}
			break;
		case right :
			if (direction !== left){
				direction = right;
				ownLog('direction is right', );
			}
			break;
		case down:
			if (direction !== up){
				direction = down;
				ownLog('direction is down', );
			}
			break;
		default:
			ownLog('some other key');
	}
}
																										// futter platzieren
function createFood(){
	ownLog('createFood');
																										// wenn Futter existiert, dann gib den zurück.
	if (foodExist === true){																			// Der muss durch Zufallzahl angezeigt werden 
																										// Es wird auf der Homepagae gezeigt.																									
		return;
	}
	do{
		x = Math.floor(Math.random() * width);															// errechne random x koordinate und schreibe in lokale var x
																										//Die Math.floor() Funktion gibt den größten Integer zurück
																										//der kleiner oder gleich der gegeben Nummer ist(Abrunden) 
		y = Math.floor(Math.random() * height);															// errechne random y koordinate und schreibe in lokale var y

	} 
	while (getCellStatus(x, y) !== blankCell)															//so lange der status an position der vars x,y nicht leer ist 

	setCellStatus(foodCell, x, y);																		// setze status an position der vars x,y auf statusFood
	foodExist = true;																					// hier sagen wir, ist Essen auf dem Feld ja , dann nicht mehr also stop
	// wenn nicht nochmal erstellen
}
function countFood(){
	ownLog('countFood');
	score += 1;																							// dekerementiere jedes mal auf eins ,wenn Snake isst 
	document.getElementById('scoreBoard').innerHTML = score;											// gebe zugreif des Element von html und nimmt den Wert von Score
}
function gameOver(){																					// game over Funktion()		
	stopInterval();																						// stop den Interval und gib den hinweis GameOver
	alert("Game Over. Do you want to play Again?\n please click on the botton(play again).");
}
function ownLog(output){																				// zum Ausgaben in der Console kann eine Funktion definiert werden, dann in der Funktion
																										// den Constant auf True einsetzen. Erst Oben muss als Constant definiert werden.
	if (ownLogOn === true){
		console.log(output);
	}
}


