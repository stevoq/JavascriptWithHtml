<?php ?>


<html>
	<head>

		<title>Snake Game</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<script type="text/javascript" src="grid.js"></script>
		<link rel="stylesheet" type="text/css" href="grid.css" />
	</head>
	<body ><!--onload="start();"-->
		<div style="size: 2000px;">   
			<p>SNAKE GAME</p>
			<div id="createGrid" style="float: left" ></div>
			<!--Game Setting Feld-->
			<div style="background-color: #EEEFF3; height: 930px; width: 200px; float:right ; " >

				<form action="neuefeldsize.php" method="post" >	



					<h3>set size for Gamearea</h3>
					<lable>	<input type="text" name="text" placeholder="height" style="height: 40px; width: 80px;" id="height"/></lable>X
					<lable>	<input type="text" name="text" placeholder="width" style="height: 40px; width: 80px;" id="width"/></lable>
					</br></br>

					<level>	<input type="button" value="Play Game" style="height: 40px; width: 200px" onclick="createGrid()"  /></level>



				</form>


				<!-- Level 1 -->
				<div style="float:left;">
					<input type="button" id="button1" value="Level 1" onclick="firstInterval()"

						   style="float: left; height: 40px; width: 120px; margin-top: 20px; ">

					<!-- Level 2 -->
					<input type="button" id="button2" value="Level 2" style="float: left; height: 40px; width: 120px"

						   onclick="secondInterval()"  >

					<!-- Level 3 -->
					<input type="button" id="button3" value="Level 3" style="float: left;height: 40px; width: 120px"
						   onclick="thirdInterval()"
						   >

				</div>

				<div style="float: left;">
					<input type="button" name="button4" value="Pause" onclick="stopInterval()" style=" height: 40px; width: 100px; margin-top: 20px; float: left; " >	
					<input type="button" name="button5" value="set going" onclick="startInterval()" style=" height: 40px; width: 100px; margin-top: 20px; float: left;" >	
				</div>


				<div style=" float: left;">
					<h2>Score:</h2>
					<span  id="scoreBoard">0</span>

				</div>
			<!--<div><span id="time"></span>--></>
				<div>
					<form  >   <!-- methode post und action-->

						<h3>Select Level For the Game:</h3> 
						<select id ="level" style="height: 40px; width: 200px;" >

							<!-- Level 1 -->
							<option  id="level1" value="choice1">Level 1</option>

							<!-- Level 2 -->
							<option  id="level2" value="choice2">Level 2</option>

							<!-- Level 3 -->
							<option  id="level3" value="choice3">Level 3</option>

						</select>
						<input type="submit" value="submit" style="height: 40px; width: 200px;">
					</form>
				</div>
			</div>


		</div>
	</div>


</body >
</html>
