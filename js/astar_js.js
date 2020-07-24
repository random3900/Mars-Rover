grid = [];
var openSet = [];
var closedSet = [];
var path = [];
var count = 0;
var x, y;
var source, dest;
for (i = 0; i < 12; i++) {
  grid[i] = [];
  for (j = 0; j < 12; j++) grid[i][j] = 1;
}
var flag1=0,flag2=0,flag3=0;
var prev=-1,p1=-1,p2=-1;
var weight;
var type = -1,
  count = 0;
function reset()
{
  location.reload();
 }
function src() {
  prev=-1;
  type = 1; //For source type is equal to one
  flag1=1;
}

function dst() {
  flag1=0;
  prev=-1;
  type = 2; //For destination type is equal to two
  flag2=1;
}
function dst1()
{
  prev=-1;
  flag2=0;
  type=3;
  flag3=1;
}

function blk() {
  prev=-1;
  flag3=0;
  type = 4; // For block type is equal to four
}

function reply_click(a1) {
  //a1 = Number(a1);
  if (type == 1 && flag1==1) {
    if(prev==-1){
	prev=a1;
        p1=Math.floor((a1-1)/12);
	p2=Math.floor((a1-1)/12);
    }
    else{
	document.getElementById(prev).style.backgroundColor = "WHITE";
	prev=a1;
	p1=Math.floor((a1-1)/12);
	p2=Math.floor((a1-1)/12);
    }
    document.getElementById(a1).style.backgroundColor = "#76C470";
    source = { first: Math.floor((a1 - 1) / 12), second: (a1 - 1) % 12 };
    }
    
  else if (type == 2 && flag2==1) {
    if(prev==-1){
	prev=a1;
        p1=Math.floor((a1-1)/12);
	p2=Math.floor((a1-1)/12);
    }
    else{
	document.getElementById(prev).style.backgroundColor = "WHITE";
	prev=a1;
	p1=Math.floor((a1-1)/12);
	p2=Math.floor((a1-1)/12);
    }
    document.getElementById(a1).style.backgroundColor = "#F25050";
    dest = { first: Math.floor((a1 - 1) / 12), second: (a1 - 1) % 12 };
    //console.log(a1,dest);
    
    count=0;
    
  } 
  
  else if (type ==4) {
    document.getElementById(a1).style.backgroundColor = "#393E46";
    console.log(a1,Math.floor((a1 - 1) / 12), (a1 - 1) % 12);
    grid[Math.floor((a1 - 1) / 12)][(a1 - 1) % 12] = 0;
  } 
  else if(type==3 && flag3==1){
    if(prev==-1){
	prev=a1;
        p1=Math.floor((a1-1)/12);
	p2=Math.floor((a1-1)/12);
    }
    else{
	document.getElementById(prev).style.backgroundColor = "WHITE";
	prev=a1;
	p1=Math.floor((a1-1)/12);
	p2=Math.floor((a1-1)/12);
    }
    document.getElementById(a1).style.backgroundColor = "#F25050";
    dest1 = { first: Math.floor((a1 - 1) / 12), second: (a1 - 1) % 12 }  
    count=1;
    
          }
  else {
  }
}
function start() {
flag1=0;
flag2=0;
flag3=0;
type=-1;

if(count==1)
  {
  //console.log("hi"); 
  aStarSearch(source, dest, grid);
 //console.log("hellooo");
 aStarSearch(source, dest1, grid);
  }
 else 
   aStarSearch(source, dest, grid);
 
}
const FLT_MAX = 100000;
const ROW = 12;
const COL = 12;
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

var choice;
var w;
choice=1;
function heuristics(weight)
{ choice=1;
 w=weight;
  
}
function heuristics1(weight)
{ choice=2;
w=weight;}

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


function tracePath(C, dest) {
  //console.log("\nThe Path is ");
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
    //console.log(p.first, p.second);
    // 0 0->1; 0 1 ->2 ; row*12+col+1
    cellNum = (p.first) * 12 + p.second +1;
    
    //console.log(cellNum);
    document.getElementById(cellNum).style.backgroundColor = "#BBC86D";
    if(p.first==source.first&&p.second==source.second)
      {document.getElementById(cellNum).style.backgroundColor = "#76C470";
        
      }
    if(count==1)
      {
    if(p.first==dest1.first&&p.second==dest1.second)
      {document.getElementById(cellNum).style.backgroundColor = "#F25050";
        
      } }
    if(p.first==dest.first&&p.second==dest.second)
      {document.getElementById(cellNum).style.backgroundColor = "#F25050";
        
      }
  }

  return;
}
// grid, source, dest
function aStarSearch(source, dest, grid) {
  
  //console.log(source, dest, grid);
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
  //console.log(C);
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
    //console.log(p);
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
          if(choice==1)
            {
          hNew = euclidian_distance(i + x[i_ind], j + y[i_ind], dest); }
          else if(choice==2)
            { hNew = manhattan_distance(i + x[i_ind], j + y[i_ind], dest);  }
          else
            {
              hNew = euclidian_distance(i + x[i_ind], j + y[i_ind], dest); 
            }
          fNew = gNew + w*hNew;
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