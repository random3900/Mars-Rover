//Initialize variables
var v=-1;
var flag1,flag2;
var mat = [];
var cost=[];
var visited=[];
var Queuex=[];
var Queuey=[];

var s1,s2,d1,d2;//source and destination
var n=12;
var prev=-1,p1,p2;
for(var i=0; i<n; i++) {
    mat[i] = [];
    cost[i]=[];
    visited[i]=[];
    for(var j=0; j<n; j++) {
        mat[i][j] = 0;//normal block
        visited[i][j]=0;
        cost[i][j]=-1;
    }
}
console.log(mat);
//Reset Input Parameters and Auxillary Variable; Interface with //HTML Button - Reset
function refresh(){
    location.reload();
}
//Interface with HTML Button - Source
function source(){
v=0;
flag1=1;
}
//Interface with HTML Button - Destination
function destination(){
        prev=-1;
        flag1=0;
v=1;
flag2=1;
}
//Interface with HTML Button - Block
function block(){
        flag2=0;
v=2;
}

//Interface with HTML Grid Cell onClick()
function reply_click(a){
    a=Number(a);
    var q=((a-1)/n);
    var rem=((a-1)%n);
    q.toFixed(0);
    rem.toFixed(0);
    q=parseInt(q);
    rem=parseInt(rem);
   
    if (v==0 && flag1==1){
        if (prev==-1){
  prev=a;
  p1=q;
  p2=rem;
}
else{
  document.getElementById(prev).style.backgroundColor="#282828";
  prev=a;
  p1=q;
  p2=rem;
}
     document.getElementById(a).style.backgroundColor ="#76C470"; //source
     s1=q;
     s2=rem;
         
   
    }
    else if (v==1 && flag2==1){
if (prev==-1){
  prev=a;
  p1=q;
  p2=rem;
}
else{
  document.getElementById(prev).style.backgroundColor="#282828";
  mat[p1][p2]=0;
  prev=a;
  p1=q;
  p2=rem;
}
     
      document.getElementById(a).style.backgroundColor = "#F25050";  //dest
      d1=q;
      d2=rem;
      mat[d1][d2]=2;// 2 for destination
     
     
    }
    else if(v>=2){
      document.getElementById(a).style.backgroundColor = "#c4f6ff"; //blocks
      mat[q][rem]=-1;//-1 for obstacle
      v++;
    }
   
  }
// A Utility Function to check whether the given cell is 
// blocked or not 
function isvalid(x,y){
    if(x<0 || y<0 ||x>=n ||y>=n)
    {
        return 0;
    }
    if(mat[x][y]==-1){
        return 0;
    }
    return 1;
}
//Function to recursively find the path from the Source to the Destination
function recurGo(){
    if(Queuex.length==0)
        return;
    x=Queuex.shift();
    y=Queuey.shift();
    if(isvalid(x,y)==0)
        return;
    else if(x==d1 && y==d2)
        return;
    else{
        visited[x][y]=1;
        //left
        if(isvalid(x,y-1) && (visited[x][y-1]==0)){
            Queuex.push(x);
            Queuey.push(y-1);
            if(cost[x][y-1]==-1)
                cost[x][y-1]=cost[x][y]+1;
            else
            {
                var min=cost[x][y-1];
                if((cost[x][y]+1) < cost[x][y-1])
                    min=cost[x][y]+1;
               cost[x][y-1]=min;
            }
               
        }
        //right
        if(isvalid(x,y+1) && (visited[x][y+1]==0)){
            Queuex.push(x);
            Queuey.push(y+1);
            if(cost[x][y+1]==-1)
                cost[x][y+1]=cost[x][y]+1;
            else
            {
                var min=cost[x][y+1];
                if((cost[x][y]+1) < cost[x][y+1])
                    min=cost[x][y]+1;
               cost[x][y+1]=min;
            }
               
        }
        //top
        if(isvalid(x-1,y) && (visited[x-1][y]==0)){
            Queuex.push(x-1);
            Queuey.push(y);
            if(cost[x-1][y]==-1)
                cost[x-1][y]=cost[x][y]+1;
            else
            {
                var min=cost[x-1][y];
                if((cost[x][y]+1) < cost[x-1][y])
                    min=cost[x][y]+1;
               cost[x-1][y]=min;
            }
               
        }
        //bottom
        if(isvalid(x+1,y) && (visited[x+1][y]==0)){
            Queuex.push(x+1);
            Queuey.push(y);
            if(cost[x+1][y]==-1)
                cost[x+1][y]=cost[x][y]+1;
            else
            {
                var min=cost[x+1][y];
                if((cost[x][y]+1) < cost[x+1][y])
                    min=cost[x][y]+1;
               cost[x+1][y]=min;
            }
               
        }        
        recurGo();  
   
    }
 


}
// Utilty Function highlight the path traced
function highlight(matrix, x1, y1, x2, y2){
    var previousValue = matrix[x2][y2];
    var successfulRoute = [];

    var x = x2;
    var y = y2;

    while ( !(x === x1 && y === y1) ) {

        for (var i = x-1; i < x+2; i++)  {  // -1, 0, 1
            for (var j = y-1; j < y+2; j++) { // -1, 0, 1

                if (
                    matrix[i] && (matrix[i][j] === previousValue -1) && // If array x array defined and the matrix value is 0
                    !(i === x && j === y) ) {

                    previousValue = matrix[i][j];
                    successfulRoute.push([i, j]);
                    x = i;
                    y = j;

                } else if (successfulRoute.length == matrix[x2][y2] - 1) { // If we got to the end of the route
                    x = x1;
                    y = y1; // Break the while loop
                }

            }
        }

    }

    successfulRoute.unshift([x2, y2]); // Add end point
    successfulRoute.push([x1, y1]); // Add start point
   
    console.log(successfulRoute);
    return successfulRoute;

}
//Main function of the Algorithm
function Lee(){
    v=-1;
    Queuex.push(s1);
    Queuey.push(s2);
    cost[s1][s2]=0;
    visited[s1][s2]=1;
    try{
        recurGo();
    }
    catch(err){
        alert("Maximum recursion limit reached! Obstacles are very less and possiblities are many.");
    }
   
   
    //Write the Numbers
    for(i=0;i<n;i++){
        for(j=0;j<n;j++){
            if(cost[i][j]!=-1){
                  //id
                  nCalc=n*i+j+1;
                  nCalc=Number(nCalc);
              // console.log(n);
              var idx=document.getElementById(nCalc);
              idx.innerHTML=cost[i][j];

            }

                 
        }
    }
    //Highlight Path
    h=highlight(cost,s1,s2,d1,d2)
    for(i=1;i<h.length-1;i++){
       curx=h[i][0];
       cury=h[i][1];
       nCalc=n*curx+cury+1;
       nCalc=Number(nCalc);
 
         var idx=document.getElementById(nCalc);
         idx.style.backgroundColor="#faed27";

   }
    var tc=cost[d1][d2];//Target Cost
   
}
