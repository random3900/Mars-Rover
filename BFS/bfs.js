//Variables Used
const ROW = 12;
const COL = 12;
const cellColor = "#282828";
const sourceColor = "GREEN";
const destColor = "RED";
const blockColor = "#c4f6ff";
const traceColor = "#c4fb6d";
const pathColor = "#faed27";
var mat = [];
var inputType;
var source;
var dest;

window.onload= function(){
  initialize();
}

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

//Initialize the Input Parameters and Auxillary Variables
function initialize(){
  if(source!=undefined){
        color(xy_to_id(source),cellColor);
  }
  if(dest!=undefined){
    color(xy_to_id(dest),cellColor);
  }
  if(mat!=undefined){
    for (i = 0; i < ROW; i++) {
      for (j = 0; j < COL; j++) color(xy_to_id({x:i,y:j}), cellColor);
      }
  }

  mat = [];
  for (i = 0; i < ROW; i++) {
    mat[i] = [];
    for (j = 0; j < COL; j++) mat[i][j] = 1;
  }
  
  console.log(mat);
  inputType = "";
  source = undefined;
  dest = undefined;
  setVisibility("");
}

//Set a cell as Source, Destination or Block based on InuptTypes
function setCell(cellNumber){
  var x = id_to_xy(cellNumber).x
  var y = id_to_xy(cellNumber).y;
  if(inputType==="Source"){
    if(source!=undefined){
      if(id_to_xy(cellNumber)===source){
        color(cellNumber,cellColor);
        source = undefined;
        return;
      } 
    
      else{
        free(cellNumber);
        color(cellNumber,sourceColor);
        color(xy_to_id(source),cellColor);
        source = id_to_xy(cellNumber);
        inputType = "Destination";
        setVisibility("dest");
        return;
      }
    }
    else{
      free(cellNumber);
      color(cellNumber,sourceColor);
      source = id_to_xy(cellNumber);
      inputType = "Destination";
      setVisibility("dest");
      return;
    }
  }
  if(inputType==="Block"){
    var cell = id_to_xy(cellNumber);
      if(mat[cell.x][cell.y]===0){
        color(cellNumber,cellColor);
        mat[cell.x][cell.y] = 1;
        return;
      } 
    
      else{
        free(cellNumber);
        color(cellNumber,blockColor);
        mat[cell.x][cell.y] = 0;
        return;
      }
    
  }
  if(inputType==="Destination"){
    if(dest!=undefined){
      if(id_to_xy(cellNumber)===dest){
        color(cellNumber,cellColor);
        dest = undefined;
        return;
      } 
    
      else{
        free(cellNumber);
        color(cellNumber,destColor);
        color(xy_to_id(dest),cellColor);
        dest = id_to_xy(cellNumber);
        inputType = "Block";
        setVisibility("block");
        return;
      }
    }
    else{
      free(cellNumber);
      color(cellNumber,destColor);
      dest = id_to_xy(cellNumber);
      inputType = "Block";
      setVisibility("block");
      return;
    }
  }
}

//Free a Grid Cell (Remove it From Source/Destination/Block)
function free(cellNumber){
  var cell = id_to_xy(cellNumber);
  if(source===cell){
    color(cellNumber,cellColor);
    source = undefined;
  }
  if(dest===cell){
    color(cellNumber,cellColor);
    dest = undefined;
  }
  if(mat[cell.x][cell.y]===0){
    color(cellNumber,cellColor);
    mat[cell.x][cell.y] = 1;
  }
}

//Check if Input Provided is Valid
function checkInput(){
  if(source===undefined){
    document.getElementById("info").innerHTML = "Source is not defined";
    setVisibility("info");
    return 0;
  }
  if(dest===undefined){
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

//Interface with HTML Grid Cell onClick()
function reply_click(cellNumber) {
  setCell(cellNumber);
}

//Interface with HTML Button - Find Path
function findPath() {
  //setVisibility("info");
  var dist = bfs(mat, source, dest);
  if (dist != 10000) console.log("Shortest Path is ", dist);
  else console.log("Shortest Path doesn't exist");
}


              /* Path Finding Logic */
                            
//Utility function for Bellman Ford Algorithm
function bfs(mat, src, dest) {
  if(checkInput()===0)
    return;
  if (!mat[src.x][src.y] || !mat[dest.x][dest.y]) return -1;

  const rowNum = [-1, 0, 0, 1, -1, -1, 1, 1];
  const colNum = [0, -1, 1, 0, -1, +1, -1, +1];

  var visited = [];
  for (i = 0; i < 12; i++) {
    visited[i] = [];
    for (j = 0; j < 12; j++) visited[i][j] = false;
  }

  visited[src.x][src.y] = true;
  var q = [];
  var s = { pt: src, dist: 0, path: [] };
  q.push(s);
  while (q.length != 0) {
    var curr = q[0];
    var pt = curr.pt;
    var newPath = [...curr.path];
    if (pt.x == dest.x && pt.y == dest.y) {
      tracePath(curr.path);
      return curr.dist;
    }
    if (!(pt.x == src.x && pt.y == src.y)) {
      var cellNum = xy_to_id(pt);
      color(cellNum, traceColor);
      newPath.push(curr.pt);
    }
    q.shift();

    for (i = 0; i < 8; i++) {
      var row = pt.x + rowNum[i];
      var col = pt.y + colNum[i];
      if (isValid(row, col) && mat[row][col] && !visited[row][col]) {
        visited[row][col] = true;
        var Adjcell = {
          pt: { x: row, y: col },
          dist: curr.dist + 1,
          path: newPath,
        };
        q.push(Adjcell);
      }
    }
  }
  return -1;
}

