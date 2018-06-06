var poles = [[4, 3, 2, 1, 0], [], []];

function start(){
	
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

	for(var i = 0; i < poles.length; i++){
		for(var j = 0; j < poles[i].length; j++){

			var ringID = poles[i][j];
			var ringWidth = ringID*20+80;
			var ringBottom = j*36;
			var ringLeft = 10-(ringID*10+40);
			var ringStyles = `bottom: ${ringBottom}px; left: ${ringLeft}px; width: ${ringWidth}px;`;

			var ringHtml = `<div class="toh-ring" id="toh-ring-${ringID}" style="${ringStyles}"></div>`;
			$('#toh-pole-'+i).append(ringHtml);
		}
	}
}

// move a ring from one pole to another
function moveRing(from, to){
	if(from == to){
		return false;
	}else{
		var ring = poles[from][poles[from].length-1];
		if(addRing(to, ring)){
			removeRing(from);
			renderRings();
		}
	}
}

$(document).ready(function(){
	renderRings();
});