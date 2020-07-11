// C++ program to find the shortest path between
// a given source cell to a destination cell.

const ROW = 9;
const COL = 10;

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
rowNum = [-1, 0, 0, 1];
colNum = [0, -1, 1, 0];

// function to find the shortest path between
// a given source cell to a destination cell.
function BFS(mat, src, dest) {
  // check source and destination cell
  // of the matrix have value 1
  mat[src.x][src.y] = 1;
  mat[dest.x][dest.y] = 1;

  console.log(src, dest, mat);
  if (!mat[src.x][src.y] || !mat[dest.x][dest.y]) return -1;

  visited = [
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  ];

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
      cellNum = pt.y * 12 + pt.x + 1;
      console.log(cellNum.toString());
      document.getElementById(cellNum.toString()).style.backgroundColor =
        "lightgreen";
    }
    // If we have reached the destination cell,
    // we are done

    // Otherwise dequeue the front cell in the queue
    // and enqueue its adjacent cells
    q.shift();

    for (i = 0; i < 4; i++) {
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

// mat = [
//   [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
//   [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
//   [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
//   [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
//   [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
//   [1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
//   [1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
// ];

mat = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
// source = { x: 0, y: 0 };
// dest = { x: 3, y: 4 };
var v = 0;
function reply_click(a) {
  if (v == 0) {
    document.getElementById(a).style.backgroundColor = "GREEN";
    v++;
    source = { x: (a % 12) - 1, y: Math.floor(a / 12) };
  } else if (v == 1) {
    document.getElementById(a).style.backgroundColor = "RED";
    v++;
    dest = { x: (a % 12) - 1, y: Math.floor(a / 12) };
  } else {
    document.getElementById(a).style.backgroundColor = "lightblue";
    v++;
    console.log(Math.floor(a / 12), (a % 12) - 1);
    mat[(a % 12) - 1][Math.floor(a / 12)] = 0;
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
