const ROW = 12;
const COL = 12;
const cellColor = "#282828";
const sourceColor = "#76C470";
const destColor = "#F25050";
const blockColor = "#c4f6ff";
const traceColor = "#c4fb6d";
const pathColor = "#faed27";
var mat = [];
var inputType;
var source;
var dest;


/* Utility Functions*/

//Convert XY Coordinates to Grid Cell Number
function xy_to_id(cell) {
  return ROW * cell.x + cell.y + 1;
}

//Convert Grid Cell Number to XY Coordinates
function id_to_xy(id) {
  return { x: Math.floor((id - 1) / COL), y: (id - 1) % COL };
}

//Check if row, col Represent Valid Coordinates in the Grid
function isValid(row, col) {
  return row >= 0 && row < ROW && col >= 0 && col < COL;
}

//Color a Cell based on Cell Number
function color(cellNum, color) {
  document.getElementById(cellNum.toString()).style.backgroundColor = color;
}

//Show/Hide the Description Text for HTML Buttons
function setVisibility(name) {
  const ids = ["src", "dest", "info", "block"];
  for (var i = 0; i < 4; i++) {
    var x = document.getElementById(ids[i]);
    var display_type = "";
    if (ids[i] == name) {
      display_type = "block";
    } else display_type = "none";
    x.style.display = display_type;
  }
}

//Check if Input Provided is Valid
function checkInput() {
  if (source === undefined) {
    document.getElementById("info").innerHTML = "Source is not defined";
    setVisibility("info");
    return 0;
  }
  if (dest === undefined) {
    document.getElementById("info").innerHTML = "Destination is not defined";
    setVisibility("info");
    return 0;
  }
  return 1;
}

//Color the Grid Cells lying on the Path(s) between Source and Destination
function tracePath(path) {
  for (i = 0; i < path.length; i++) {
    var pt = path[i];
    var cellNum = xy_to_id(pt);
    color(cellNum, pathColor);
  }
}

/* UI Button Interfaces */

//Interface with HTML Button - Source
function source_fn() {
  setVisibility("src");
  inputType = "Source";
}

//Interface with HTML Button - Destination
function destination() {
  setVisibility("dest");
  inputType = "Destination";
}

//Interface with HTML Button - Block
function block_fn() {
  setVisibility("block");
  inputType = "Block";
}

