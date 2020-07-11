// C++ program to find the shortest path between
// a given source cell to a destination cell.

const ROW = 12;
const COL = 12;

//To store matrix cell cordinates
Point = {
  x: Number,
  y: Number,
};

// A Data Structure for queue used in BFS
queueNode = {
  pt: Point, // The cordinates of a cell
  dist: Number, // cell's distance of from the source
};

// check whether given cell (row, col) is a valid
// cell or not.
function isValid(row, col) {
  // return true if row number and column number
  // is in range
  return row >= 0 && row < ROW && col >= 0 && col < COL;
}

// These arrays are used to get row and column
// numbers of 4 neighbours of a given cell
rowNum = [-1, 0, 0, 1,-1,-1,1,1];
colNum = [0, -1, 1, 0,-1,+1,-1,+1];

// function to find the shortest path between
// a given source cell to a destination cell.
function BFS(mat, src, dest) {
  // check source and destination cell
  // of the matrix have value 1


  console.log(src, dest, mat);
  if (!mat[src.x][src.y] || !mat[dest.x][dest.y]) return -1;

  visited = []
  for(i=0;i<12;i++){
    visited[i]=[]
    for(j=0;j<12;j++)
      visited[i][j]=false
  }

  console.log(visited);
  // Mark the source cell as visited
  visited[src.x][src.y] = true;

  // Create a queue for BFS
  q = [];

  // Distance of source cell is 0
  s = { pt: src, dist: 0 };
  q.push(s); // Enqueue source cell

  // Do a BFS starting from source cell
  while (q.length != 0) {
    curr = q[0];
    pt = curr.pt;
    if (pt.x == dest.x && pt.y == dest.y) return curr.dist;
    if (!(pt.x == src.x && pt.y == src.y)) {
      cellNum = pt.x * 12 + pt.y + 1;
      console.log(cellNum.toString());
      document.getElementById(cellNum.toString()).style.backgroundColor =
        "lightblue";
    }
    // If we have reached the destination cell,
    // we are done

    // Otherwise dequeue the front cell in the queue
    // and enqueue its adjacent cells
    q.shift();

    for (i = 0; i < 8; i++) {
      row = pt.x + rowNum[i];
      col = pt.y + colNum[i];

      // if adjacent cell is valid, has path and
      // not visited yet, enqueue it.
      if (isValid(row, col) && mat[row][col] && !visited[row][col]) {
        // mark cell as visited and enqueue it
        visited[row][col] = true;
        Adjcell = { pt: { x: row, y: col }, dist: curr.dist + 1 };
        q.push(Adjcell);
      }
    }
  }

  // Return -1 if destination cannot be reached
  return -1;
}

// Driver program to test above function
mat = []
for(i=0;i<12;i++){
  mat[i]=[]
  for(j=0;j<12;j++)
    mat[i][j]=1
}
console.log(mat);
var v = 0;
function reply_click(a) {
  if (v == 0) {
    document.getElementById(a).style.backgroundColor = "GREEN";
    v++;
    source = { x:Math.floor((a-1) / 12)  , y: ((a-1) % 12) };
  } else if (v == 1) {
    document.getElementById(a).style.backgroundColor = "RED";
    v++;
    dest = { x:Math.floor((a-1) / 12)  , y: ((a-1) % 12) };
  } else {
    document.getElementById(a).style.backgroundColor = "#393e46";
    v++;
    console.log(Math.floor((a-1) / 12) , ((a-1) % 12));
    mat[Math.floor((a-1) / 12)][((a-1) % 12) ] = 0;
    
    console.log(mat[Math.floor((a-1) / 12)][ ((a-1) % 12)]);
    // dist = BFS(mat, source, dest);
    // if (dist != 10000) console.log("Shortest Path is ", dist);
    // else console.log("Shortest Path doesn't exist");
  }
}
function callAlgo() {
  dist = BFS(mat, source, dest);

  if (dist != 10000) console.log("Shortest Path is ", dist);
  else console.log("Shortest Path doesn't exist");
}
