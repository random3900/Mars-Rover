
window.onload = function () {
  initialize();
};

/* Utility Functions*/

//Initialize the Input Parameters and Auxillary Variables
function initialize() {
  if (source != undefined) {
    color(xy_to_id(source), cellColor);
  }
  if (dest != undefined) {
    color(xy_to_id(dest), cellColor);
  }
  if (mat != undefined) {
    for (i = 0; i < ROW; i++) {
      for (j = 0; j < COL; j++) color(xy_to_id({ x: i, y: j }), cellColor);
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
function setCell(cellNumber) {
  var x = id_to_xy(cellNumber).x;
  var y = id_to_xy(cellNumber).y;
  if (inputType === "Source") {
    if (source != undefined) {
      if (id_to_xy(cellNumber) === source) {
        color(cellNumber, cellColor);
        source = undefined;
        return;
      } else {
        free(cellNumber);
        color(cellNumber, sourceColor);
        color(xy_to_id(source), cellColor);
        source = id_to_xy(cellNumber);
        return;
      }
    } else {
      free(cellNumber);
      color(cellNumber, sourceColor);
      source = id_to_xy(cellNumber);
      return;
    }
  }
  if (inputType === "Block") {
    var cell = id_to_xy(cellNumber);
    if (mat[cell.x][cell.y] === 0) {
      color(cellNumber, cellColor);
      mat[cell.x][cell.y] = 1;
      return;
    } else {
      free(cellNumber);
      color(cellNumber, blockColor);
      mat[cell.x][cell.y] = 0;
      return;
    }
  }
  if (inputType === "Destination") {
    if (dest != undefined) {
      if (id_to_xy(cellNumber) === dest) {
        color(cellNumber, cellColor);
        dest = undefined;
        return;
      } else {
        free(cellNumber);
        color(cellNumber, destColor);
        color(xy_to_id(dest), cellColor);
        dest = id_to_xy(cellNumber);
        return;
      }
    } else {
      free(cellNumber);
      color(cellNumber, destColor);
      dest = id_to_xy(cellNumber);
      return;
    }
  }
}

//Free a Grid Cell (Remove it From Source/Destination/Block)
function free(cellNumber) {
  var cell = id_to_xy(cellNumber);
  if (source === cell) {
    color(cellNumber, cellColor);
    source = undefined;
  }
  if (dest === cell) {
    color(cellNumber, cellColor);
    dest = undefined;
  }
  if (mat[cell.x][cell.y] === 0) {
    color(cellNumber, cellColor);
    mat[cell.x][cell.y] = 1;
  }
}

/* UI Button Interfaces */

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
  if (checkInput() === 0) return;
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
