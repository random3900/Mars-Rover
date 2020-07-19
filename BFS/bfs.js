const ROW = 12;
const COL = 12;

var mat = [];
var inputType;
var source;
var dest;
setVisibility("");
function initialize(){
  if(source!=undefined){
        color(xy_to_id(source),"#c4fb6d");
  }
  if(dest!=undefined){
    color(xy_to_id(dest),"#c4fb6d");
  }
  if(mat!=undefined){
    for (i = 0; i < ROW; i++) {
      for (j = 0; j < COL; j++) color(xy_to_id({x:i,y:j}), "#c4fd6d");
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

window.onload= function(){
  initialize();
}
function isValid(row, col) {
  return row >= 0 && row < ROW && col >= 0 && col < COL;
}
function xy_to_id(cell) {
  return ROW * cell.x + cell.y + 1;
}
function id_to_xy(id) {
  return { x: Math.floor((id - 1) / COL), y: (id - 1) % COL };
}
function color(cellNum, color) {
  document.getElementById(cellNum.toString()).style.backgroundColor = color;
}
function free(cellNumber){
  var cell = id_to_xy(cellNumber);
  if(source===cell){
    color(cellNumber,"#c4fb6d");
    source = undefined;
  }
  if(dest===cell){
    color(cellNumber,"#c4fb6d");
    dest = undefined;
  }
  if(mat[cell.x][cell.y]===0){
    color(cellNumber,"#c4fb6d");
    mat[cell.x][cell.y] = 1;
  }
}
function setCell(cellNumber){
  var x = id_to_xy(cellNumber).x
  var y = id_to_xy(cellNumber).y;
  if(inputType==="Source"){
    if(source!=undefined){
      if(id_to_xy(cellNumber)===source){
        color(cellNumber,"#c4fb6d");
        source = undefined;
        return;
      } 
    
      else{
        free(cellNumber);
        color(cellNumber,"GREEN");
        color(xy_to_id(source),"#c4fb6d");
        source = id_to_xy(cellNumber);
        inputType = "Destination";
        setVisibility("dest");
        return;
      }
    }
    else{
      free(cellNumber);
      color(cellNumber,"GREEN");
      source = id_to_xy(cellNumber);
      inputType = "Destination";
      setVisibility("dest");
      return;
    }
  }
  if(inputType==="Block"){
    var cell = id_to_xy(cellNumber);
      if(mat[cell.x][cell.y]===0){
        color(cellNumber,"#c4fb6d");
        mat[cell.x][cell.y] = 1;
        return;
      } 
    
      else{
        free(cellNumber);
        color(cellNumber,"#393e46");
        mat[cell.x][cell.y] = 0;
        return;
      }
    
  }
  if(inputType==="Destination"){
    if(dest!=undefined){
      if(id_to_xy(cellNumber)===dest){
        color(cellNumber,"#c4fb6d");
        dest = undefined;
        return;
      } 
    
      else{
        free(cellNumber);
        color(cellNumber,"RED");
        color(xy_to_id(dest),"#c4fb6d");
        dest = id_to_xy(cellNumber);
        inputType = "Block";
        setVisibility("block");
        return;
      }
    }
    else{
      free(cellNumber);
      color(cellNumber,"RED");
      dest = id_to_xy(cellNumber);
      inputType = "Block";
      setVisibility("block");
      return;
    }
  }
}
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
function tracePath(path) {
  for (i = 0; i < path.length; i++) {
    var pt = path[i];
    var cellNum = xy_to_id(pt);
    color(cellNum, "darkblue");
  }
}
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
      color(cellNum, "lightblue");
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

function reply_click(cellNumber) {
  setCell(cellNumber);
}
function findPath() {
  //setVisibility("info");
  var dist = bfs(mat, source, dest);
  if (dist != 10000) console.log("Shortest Path is ", dist);
  else console.log("Shortest Path doesn't exist");
}
function source_fn() {
  setVisibility("src");
  inputType = "Source";
}
function destination() {
  setVisibility("dest");
  inputType = "Destination";
}
function block_fn() {
  setVisibility("block");
  inputType = "Block";
}

/*
 what if cell is already something else DONE
 init function  DONE
 variable names 
 comments 
 reset function DONE
 description
 */
