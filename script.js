MAX_ROWS = 12;
MAX_COLUMNS = 15;

LOAD_INDEX = 0;

COLORS = {
  0: 'lightgray',
  1: 'lightblue',
  2: 'salmon',  
  3: '#FFCC66'
};

function generateTiles() {
	var table = document.getElementById("tiles");

  var load = false;

  if (window.location.hash != '') {
    load = true;
    hashedMatrix = window.location.hash;
    MAX_ROWS = hashedMatrix.substring(1,hashedMatrix.indexOf('x'));
    MAX_COLUMNS = hashedMatrix.substring(hashedMatrix.indexOf('x')+1,hashedMatrix.indexOf(';'));
    matrix = hashedMatrix.substring(hashedMatrix.indexOf(';') + 1);
  }
  
	for (let i=0; i < MAX_ROWS; i++) {
			
		var row = table.insertRow(i);

		for (let j=0; j < MAX_COLUMNS; j++) {
		
			var cell = row.insertCell(j);

      if (load) {
        loadedValue = getTileValue(matrix);
        cell.innerHTML = loadedValue['value'];
        cell.style.backgroundColor = loadedValue['color'];
      } else {
        cell.innerHTML = "0";
        cell.style.backgroundColor = 'lightgray'
      }
      cell.id = 'r'+i+'_c'+j;
      cell.onclick = function() { changeType(this.id); };

		}  
          
  }

}

function getTileValue(matrix) {

  result = {
    'value': matrix[LOAD_INDEX],
    'color': COLORS[matrix[LOAD_INDEX]],
  }

  LOAD_INDEX = LOAD_INDEX + 1;

  return result

}

function changeType(id) {
  //window.location.hash = id;
  //console.log('Clicked on '+id)
  var cell = document.getElementById(id);
  cell.innerHTML = parseInt(cell.innerHTML) + 1;
  if (cell.innerHTML == '4') {
    cell.innerHTML = 0;
  }
  cell.style.backgroundColor = COLORS[cell.innerHTML]
  refreshCounter();
}

function refreshCounter() {

  var hashedMatrix = MAX_ROWS+'x'+MAX_COLUMNS+';';

  var table = document.getElementById("tiles");

  colors_used = {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0
  }

  var elements = document.querySelectorAll("td");
  for (var i= 0; i < elements.length; i++) {
    colors_used[elements[i].innerHTML] = colors_used[elements[i].innerHTML] + 1;
    hashedMatrix = hashedMatrix + elements[i].innerHTML;    
  }  
 
  window.location.hash = hashedMatrix;    

  document.getElementById("blue").innerHTML = colors_used[1];
  document.getElementById("red").innerHTML = colors_used[2];
  document.getElementById("yellow").innerHTML = colors_used[3];

}

function updateSlider() {
  var slider = document.getElementById("myRange");
  var output = document.getElementById("tile_width");
  output.innerHTML = slider.value;

  var elements = document.querySelectorAll("td");
  for (var i= 0; i < elements.length; i++) {
    elements[i].style.width = slider.value + 'px';
    elements[i].style.height = slider.value + 'px';
  }

}