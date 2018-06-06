var poles = [[4, 3, 2, 1, 0], [], []];
var moves = 0;
var screenWidth = 0;

var movingFrom = 3;

function restart(){
	poles = [[4, 3, 2, 1, 0], [], []];
	moves = 0;
	renderRings();
}

// tries to add a ring to a pole, returns true/false
function addRing(pole, ring){
	var ringsOnPole = poles[pole];
	var numOfRings = ringsOnPole.length;
	if(numOfRings == 0 || ring < ringsOnPole[numOfRings-1]){
		poles[pole].push(ring);
		return true;
	}else{
		return false;
	}
}

// removes a ring from a pole
function removeRing(pole){
	if(poles[pole].length > 0){
		poles[pole].pop();
	}
}

// displays rings
function renderRings(){
	$('.toh-pole').empty();

	$('#move-counter').html('Moves: '+moves);

	for(var i = 0; i < poles.length; i++){
		for(var j = 0; j < poles[i].length; j++){

			var ringID = poles[i][j];
			var ringWidth = ringID*(screenWidth/30)+56;
			var ringBottom = j*36;
			var ringLeft = 10-(ringID*(screenWidth/60)+28);
			var ringStyles = `bottom: ${ringBottom}px; left: ${ringLeft}px; width: ${ringWidth}px;`;

			var ringHtml = `<div class="toh-ring" id="toh-ring-${ringID}" style="${ringStyles}"></div>`;
			$('#toh-pole-'+i).append(ringHtml);
		}

		$('#toh-pole-'+i).append('<div class="movehere">Move Here</div>');
		$('.movehere').hide();
	}
}

// move a ring from one pole to another
function moveRing(from, to){
	if(from == to || poles[from].length == 0){
		return false;
	}else{
		var ring = poles[from][poles[from].length-1];
		if(addRing(to, ring)){
			removeRing(from);
			moves++;
			renderRings();
			checkComplete();
			return true;
		}else{
			return false;
		}
	}
}

// activate move
function activateMove(pole){
	if(movingFrom == 3){
		movingFrom = pole;
	}else{
		$('.movehere').hide();
		moveRing(movingFrom, pole);
		$('.movehere').hide();
		movingFrom = 3;
	}
}

// checks if the puzzle is complete
function checkComplete(){
	if(JSON.stringify(poles[2]) == '[4,3,2,1,0]'){
		setTimeout(displayCode, 100);
	}
}

function displayCode(){
	$('#code').fadeIn(1000);
}

$(document).ready(function(){
	screenWidth = $('#toh-cont').width();
	console.log(screenWidth);
	renderRings();

	$('#code').hide();


	$('#toh-pole-0').click(function(){
		$('#toh-pole-1 .movehere').show();
		$('#toh-pole-2 .movehere').show();
		activateMove(0);
	});
	$('#toh-pole-1').click(function(){
		$('#toh-pole-0 .movehere').show();
		$('#toh-pole-2 .movehere').show();
		activateMove(1);
	});
	$('#toh-pole-2').click(function(){
		$('#toh-pole-0 .movehere').show();
		$('#toh-pole-1 .movehere').show();
		activateMove(2);
	});
});