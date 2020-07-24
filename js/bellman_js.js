//Variables Used
var maxVal = ROW * COL * ROW;
var sourceCount = 0;
var count = 0;
var v = 0;

window.onload = function () {
  initialize();
};
/* Utility Functions*/

//Initialize the Input Parameters and Auxillary Variables
function initialize() {
  setVisibility("");
  if (source != undefined) {
    for (var i = 0; i < source.length; i++)
      color(xy_to_id(source[i]), cellColor);
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
    for (j = 0; j < COL; j++) mat[i][j] = maxVal;
  }

  inputType = "";
  source = [];
  dest = undefined;
  count = 0;
  sourceCount = 0;
  dest = undefined;
}

/* UI Button Interfaces */

//Reset Input Parameters and Auxillary Variable; Interface with HTML Button - Reset
function reset() {
  initialize();
}

//Interface with HTML Grid Cell onClick()
function reply_click(a) {
  a = Number(a);
  var pt = id_to_xy(a);
  if (inputType === "Source") {
    var i,
      duplicateSourcePos = -1;
    for (i = 0; i < source.length; i++) {
      if (source[i].x === pt.x && source[i].y === pt.y) {
        duplicateSourcePos = i;
        source[i] = {};
        color(a, cellColor);
      }
    }
    source = source.filter((value) => Object.keys(value).length !== 0);

    if (duplicateSourcePos != -1) {
      sourceCount--;
      return;
    }
    color(a, sourceColor);
    source[sourceCount] = pt;
    sourceCount++;
  } else if (inputType === "Destination") {
    if (dest !== undefined) {
      if (dest.x === pt.x && dest.y === pt.y) {
        dest = undefined;
        color(a, cellColor);
        mat[pt.x][pt.y] = maxVal;
        return;
      } else {
        color(xy_to_id(dest), cellColor);
        mat[dest.x][dest.y] = maxVal;
      }
    }

    color(a, destColor); //dest
    dest = pt;
    mat[pt.x][pt.y] = 0;
  } else if (inputType === "Block") {
    color(a, blockColor); //blocks
    mat[pt.x][pt.y] = -1;
  } else {
  }
}

/* Path Finding Logic */

//Utility function for Bellman Ford Algorithm
function initi(c, d, mat) {
  var flag = 0;
  var temp = mat[c][d];
  var mini = temp;

  if (c + 1 < ROW && mat[c + 1][d] != -1) {
    mini = Math.min(mat[c][d], mat[c + 1][d] + 1, mini);
  }

  if (d + 1 < COL && mat[c][d + 1] != -1) {
    mini = Math.min(mat[c][d], mat[c][d + 1] + 1, mini);
  }

  if (d - 1 >= 0 && mat[c][d - 1] != -1) {
    mini = Math.min(mat[c][d - 1] + 1, mat[c][d], mini);
  }

  if (c - 1 >= 0 && mat[c - 1][d] != -1) {
    mini = Math.min(mat[c - 1][d] + 1, mat[c][d], mini);
  }

  if (c + 1 < ROW && d + 1 < COL && mat[c + 1][d + 1] != -1) {
    mini = Math.min(mat[c + 1][d + 1] + 1, mat[c][d], mini);
  }

  if (c - 1 >= 0 && d + 1 < COL && mat[c - 1][d + 1] != -1) {
    mini = Math.min(mat[c - 1][d + 1] + 1, mat[c][d], mini);
  }

  if (c + 1 < ROW && d - 1 >= 0 && mat[c + 1][d - 1] != -1) {
    mini = Math.min(mat[c + 1][d - 1] + 1, mat[c][d], mini);
  }

  if (c - 1 >= 0 && d - 1 >= 0 && mat[c - 1][d - 1] != -1) {
    mini = Math.min(mat[c - 1][d - 1] + 1, mat[c][d], mini);
  }
  if (temp > mini) {
    flag = 1;
    mat[c][d] = mini;
  }

  return flag;
}

//Bellman Ford Algorithm
function bellalgo() {
  if (!checkInput()) {
    console.log("invalid input");
    return;
  }
  inputType = "";
  count = 0;
  var k = 0,
    v = 8 * ROW * COL * COL * ROW;
  while (k < v) {
    flag = 0;

    for (i = dest.x; i < ROW; i++) {
      for (j = dest.y; j < COL; j++) {
        if (mat[i][j] != -1) {
          flag = Math.max(flag, initi(i, j, mat));
        }
      }
    }

    for (i = dest.x; i < ROW; i++) {
      for (j = dest.y; j >= 0; j--) {
        if (mat[i][j] != -1) {
          flag = Math.max(flag, initi(i, j, mat));
        }
      }
    }
    for (i = dest.x; i >= 0; i--) {
      for (j = dest.y; j < COL; j++) {
        if (mat[i][j] != -1) {
          flag = Math.max(flag, initi(i, j, mat));
        }
      }
    }
    for (i = dest.x; i >= 0; i--) {
      for (j = dest.y; j >= 0; j--) {
        if (mat[i][j] != -1) {
          flag = Math.max(flag, initi(i, j, mat));
        }
      }
    }
    if (flag === 0) {
      break;
    }
    k++;
  }
  var f = 0;
  while (f < sourceCount) {
    l = [];
    var i = source[f].x;
    var j = source[f].y,
      kk = 0;
    var c, d;
    while (!(i === dest.x && j === dest.y)) {
      mini = ROW * COL + 1;

      if (i + 1 < ROW && mat[i + 1][j] != -1) {
        mini = mat[i + 1][j];
        c = i + 1;
        d = j;
      }
      if (j + 1 < COL && mini > mat[i][j + 1] && mat[i][j + 1] != -1) {
        mini = mat[i][j + 1];
        c = i;
        d = j + 1;
      }
      if (i - 1 >= 0 && mini > mat[i - 1][j] && mat[i - 1][j] != -1) {
        mini = mat[i - 1][j];
        c = i - 1;
        d = j;
      }
      if (j - 1 >= 0 && mini > mat[i][j - 1] && mat[i][j - 1] != -1) {
        mini = mat[i][j - 1];
        c = i;
        d = j - 1;
      }
      if (
        i + 1 < ROW &&
        j + 1 < COL &&
        mini > mat[i + 1][j + 1] &&
        mat[i + 1][j + 1] != -1
      ) {
        mini = mat[i + 1][j + 1];
        c = i + 1;
        d = j + 1;
      }
      if (
        i + 1 < ROW &&
        j - 1 >= 0 &&
        mini > mat[i + 1][j - 1] &&
        mat[i + 1][j - 1] != -1
      ) {
        mini = mat[i + 1][j - 1];
        c = i + 1;
        d = j - 1;
      }
      if (
        i - 1 >= 0 &&
        j + 1 < COL &&
        mini > mat[i - 1][j + 1] &&
        mat[i - 1][j + 1] != -1
      ) {
        mini = mat[i - 1][j + 1];
        c = i - 1;
        d = j + 1;
      }
      if (
        i - 1 >= 0 &&
        j - 1 >= 0 &&
        mini > mat[i - 1][j - 1] &&
        mat[i - 1][j - 1] != -1
      ) {
        mini = mat[i - 1][j - 1];
        c = i - 1;
        d = j - 1;
      }
      i = c;
      j = d;

      l[kk] = { x: i, y: j };
      kk++;
    }
    tracePath(l);
    color(xy_to_id(dest), destColor);
    var temp;
    for (temp = 0; temp < source.length-1; temp++) {
      color(source[temp], sourceColor);
    }

    f++;
  }
}
