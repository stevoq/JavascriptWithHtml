<?php ?>
<html>
	<head>
		<title>Snake Game</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<script type="text/javascript" src="grid.js"></script>
		<link rel="stylesheet" type="text/css" href="grid.css" />
	</head>
	<body>
		<div style="size: 2000px;">   
			<p>SNAKE GAME</p>
			<div id="createGrid" style="float: left" ></div>
			<!--Game Setting Feld-->
			<div id="setting">
				<p>Give size for the Gamearea<p>
					<input type="text" id="height" name="text" placeholder="Height"> X
					<input type="text" id="width" name="text" placeholder="Width">
					<input type="button" id="playBtn"  value="Play Game"  onclick="createGrid()">
					<input type="button" id="levelBtn" value="Level 1" onclick="firstInterval()">
					<input type="button" id="levelBtn" value="Level 2" onclick="secondInterval()">
					<input type="button" id="levelBtn" value="Level 3" onclick="thirdInterval()">
					<input type="button" id="pAndgBtn" value="Pause" onclick="stopInterval()">	
					<input type="button" id="pAndgBtn" value="set going" onclick="startInterval()">	
				<h2> Score:</h2>
				<span  id="scoreBoard">0</span>
				<div id="playAgain">
				<input type="button"  id="load" value="Play Again" onClick="window.location.reload(true)">
				</div>
				
			
			</div>
		</div>
			
	</body>
</html>
