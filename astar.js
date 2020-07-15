grid = [];
var openSet = [];
var closedSet = [];
var path = [];
var count = 0;
var ty = 0;
var x, y;
var source, dest;
for (i = 0; i < 12; i++) {
  grid[i] = [];
  for (j = 0; j < 12; j++) grid[i][j] = 1;
}

var type = -1,
  count = 0;
function src() {
  type = 1; //For source type is equal to one
}

function dst() {
  type = 2; //For destination type is equal to two
}

function blk() {
  type = 3; // For block type is equal to three
}

function reply_click(a1) {
  //a1 = Number(a1);
  if (type == 1) {
    document.getElementById(a1).style.backgroundColor = "GREEN";
    source = { first: Math.floor((a1 - 1) / 12), second: (a1 - 1) % 12 };
    console.log(a1,source);
    type++;
  } else if (type == 2) {
    document.getElementById(a1).style.backgroundColor = "RED";
    dest = { first: Math.floor((a1 - 1) / 12), second: (a1 - 1) % 12 };
    console.log(a1,dest)
    type++;
  } else if (type == 3) {
    document.getElementById(a1).style.backgroundColor = "#393e46";
    console.log(a1,Math.floor((a1 - 1) / 12), (a1 - 1) % 12);
    grid[Math.floor((a1 - 1) / 12)][(a1 - 1) % 12] = 0;
  } else {
  }
}
function start() {
  aStarSearch(source, dest, grid);
}
const FLT_MAX = 100000;
const ROW = 5;
const COL = 5;
// typedef pair<int, int> Pair;
// typedef pair<double, pair<int, int>> pPair;

// struct cell
// { int parent_i, parent_j;
//   double f, g, h;
// };

function cell_unblocked(grid, row, col) {
  if (grid[row][col] === 1) return true;
  else return false;
}

function cell_valid(row, col) {
  return row >= 0 && row < 12 && col >= 0 && col < 12;
}
function cell_destination(row, col, dest) {
  if (row === dest.first && col === dest.second) return true;
  else return false;
}

function euclidian_distance(row, col, dest) {
  /*console.log(
    row,
    col,
    dest,
    Math.sqrt(
      (row - dest.first) * (row - dest.first) +
        (col - dest.second) * (col - dest.second)
    )
  );*/
  return Math.sqrt(
    (row - dest.first) * (row - dest.first) +
      (col - dest.second) * (col - dest.second)
  );
}

function manhattan_distance(row, col, dest) {
  return Math.abs(row - dest.first) + Math.abs(col - dest.second);
}

function diagonal_distance(row, col, dest) {
  return Math.max(Math.abs(row - dest.first), Math.abs(col - dest.second));
}

function tracePath(C, dest) {
  console.log("\nThe Path is ");
  var row = dest.first;
  var col = dest.second;

  Path = [];

  while (!(C[row][col].parent_i === row && C[row][col].parent_j === col)) {
    Path.push({ first: row, second: col });
    var temp_row = C[row][col].parent_i;
    var temp_col = C[row][col].parent_j;
    row = temp_row;
    col = temp_col;
  }

  Path.push({ first: row, second: col });
  while (Path.length != 0) {
    p = Path[Path.length - 1];
    Path.pop();
    console.log(p.first, p.second);
    // 0 0->1; 0 1 ->2 ; row*12+col+1
    cellNum = (p.first) * 12 + p.second +1;
    console.log(cellNum);
    document.getElementById(cellNum).style.backgroundColor = "blue";
  }

  return;
}
// grid, source, dest
function aStarSearch(source, dest, grid) {
  console.log(source, dest, grid);
  if (cell_destination(source.first, source.second, dest) === true) {
    return;
  }
  closedList = [];
  for (var i = 0; i < 12; i++) {
    closedList[i] = [];
    for (var j = 0; j < 12; j++) {
      closedList[i][j] = false;
    }
  }
  C = [];
  var i, j;
  for (i = 0; i < 12; i++) {
    C[i] = [];
    for (j = 0; j < 12; j++) {
      C[i][j] = {
        f: FLT_MAX,
        g: FLT_MAX,
        h: FLT_MAX,
        parent_i: -1,
        parent_j: -1,
      };
    }
  }
  console.log(C);
  var i = source.first;
  var j = source.second;
  C[i][j].f = 0.0;
  C[i][j].g = 0.0;
  C[i][j].h = 0.0;
  C[i][j].parent_i = i;
  C[i][j].parent_j = j;
  //console.log(C);
  openList = [];
  openList.push({ first: 0.0, second: { first: i, second: j } });
  var foundDest = false;
  var gNew, hNew, fNew;
  while (openList.length != 0) {
    p = openList[0];
    console.log(p);
    openList.shift();
    if (!cell_valid(p.second.first, p.second.second)) continue;
    i = p.second.first;
    j = p.second.second;
    closedList[i][j] = true;
    x = [0, 0, -1, -1, -1, 1, 1, 1];
    y = [1, -1, 0, 1, -1, 0, 1, -1];
    for (i_ind = 0; i_ind < 8; i_ind++) {
      if (cell_valid(i + x[i_ind], j + y[i_ind]) === true) {
        if (cell_destination(i + x[i_ind], j + y[i_ind], dest) === true) {
          C[i + x[i_ind]][j + y[i_ind]].parent_i = i;
          C[i + x[i_ind]][j + y[i_ind]].parent_j = j;
          console.log("The destination cell is found\n");
          tracePath(C, dest);
          foundDest = true;
          return;
        } else if (
          closedList[i + x[i_ind]][j + y[i_ind]] === false &&
          cell_unblocked(grid, i + x[i_ind], j + y[i_ind]) === true
        ) {
          gNew = C[i][j].g + 1.0;
          hNew = euclidian_distance(i + x[i_ind], j + y[i_ind], dest);
          fNew = gNew + hNew;
          if (
            C[i + x[i_ind]][j + y[i_ind]].f == FLT_MAX ||
            C[i + x[i_ind]][j + y[i_ind]].f > fNew
          ) {
            openList.push({
              first: fNew,
              second: { first: i + x[i_ind], second: j + y[i_ind] },
            });
            C[i + x[i_ind]][j + y[i_ind]].f = fNew;
            C[i + x[i_ind]][j + y[i_ind]].g = gNew;
            C[i + x[i_ind]][j + y[i_ind]].h = hNew;
            C[i + x[i_ind]][j + y[i_ind]].parent_i = i;
            C[i + x[i_ind]][j + y[i_ind]].parent_j = j;
          }
        }
      }
    }
  }
  if (foundDest === false) console.log("Destination not found");

  return;
}
