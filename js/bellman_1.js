var v= 0;

var mat = [];
var d1,d2;
var s1=[];
var s2=[];
var row=12,col=12;
var ty=0;
var te=row*col*row;
var type=-1,count=0;
for(var i=0; i<row; i++) {
    mat[i] = [];
    for(var j=0; j<col; j++) {
        mat[i][j] = te;
var al=i*col + j+1;

    }
}

function reset(){
   s1=[];
s2=[];
type=-1;
count=0;
for(var i=0; i<row; i++) {
var te=row*col*row;

    for(var j=0; j<col; j++) {
        mat[i][j] = te;
var al=i*col + j+1;
document.getElementById(al).style.backgroundColor = "WHITE";
    }
}
}

var p1=-1,p2=-1;

function src(){
  type=1; //For source type is equal to one
}

function dst(){
  type=2; //For destination type is equal to two
}

function blk(){
  type=3; // For block type is equal to three
}
var pre=-1;
function reply_click(a){
  a=Number(a);
  var q=((a-1)/col);
  var rem=((a-1)%col);
  q.toFixed(0);
  rem.toFixed(0);
  q=parseInt(q);
  rem=parseInt(rem);
  if (type==1){
   document.getElementById(a).style.backgroundColor = "#76C470"; //source
   s1[ty]=q;
   s2[ty]=rem;
    ty++;
   
   
  }
  else if (type==2){
   
   
    document.getElementById(a).style.backgroundColor = "#F25050";  //dest
    d1=q;
    d2=rem;
    mat[d1][d2]=0;
    if (pre!=-1){
document.getElementById(pre).style.backgroundColor = "WHITE";
mat[p1][p2]=te;
}
    else{ p1=d1;
p2=d2;
}
   
    pre=a;
    p1=d1;
    p2=d2;
   
   
   
   
  }
  else if (type==3){
    document.getElementById(a).style.backgroundColor = "#393E46"; //blocks
    mat[q][rem]=-1;
 
  }
  else{
   
  }
}

function initi(c,d,mat){
    var flag=0;
    var temp=mat[c][d];
    var mini=temp;
 
    if (c+1<row && mat[c+1][d]!=-1 ){
        mini=Math.min(mat[c][d],mat[c+1][d]+1,mini);}
       
    if (d+1<col && mat[c][d+1]!=-1){
        mini=Math.min(mat[c][d],mat[c][d+1]+1,mini);}
           
    if (d-1>=0 && mat[c][d-1]!=-1){
        mini=Math.min(mat[c][d-1]+1,mat[c][d],mini);}
           
    if (c-1>=0 && mat[c-1][d]!=-1){
        mini=Math.min(mat[c-1][d]+1,mat[c][d],mini);}

    if (c+1<row && d+1<col && mat[c+1][d+1]!=-1){
        mini=Math.min(mat[c+1][d+1]+1,mat[c][d],mini);}

    if (c-1>=0 && d+1<col && mat[c-1][d+1]!=-1){
        mini=Math.min(mat[c-1][d+1]+1,mat[c][d],mini);}

    if (c+1<row && d-1>=0 && mat[c+1][d-1]!=-1){
        mini=Math.min(mat[c+1][d-1]+1,mat[c][d],mini);}

    if (c-1>=0 && d-1>=0 && mat[c-1][d-1]!=-1){
        mini=Math.min(mat[c-1][d-1]+1,mat[c][d],mini);}
    if (temp>mini){
        flag=1;
        mat[c][d]=mini;}
       
    return flag;

}




function bellalgo(){
  type=-1;
  count=0;
  var k=0,v=8*row*col*row*col;
while(k<v){
flag=0;
    for (i=d1;i<row;i++){
        for (j=d2;j<col;j++){
            if (mat[i][j]!=-1){
                flag=Math.max(flag,initi(i,j,mat))}}}

    for (i=d1;i<row;i++){
        for (j=d2;j>=0;j--){
            if (mat[i][j]!=-1){
                flag=Math.max(flag,initi(i,j,mat))}}}
    for (i=d1;i>=0;i--){
        for (j=d2;j<col;j++){
            if (mat[i][j]!=-1){
                flag=Math.max(flag,initi(i,j,mat))}}}
    for (i=d1;i>=0;i--){
        for (j=d2;j>=0;j--){
            if (mat[i][j]!=-1){
                flag=Math.max(flag,initi(i,j,mat))}}}
    if (flag==0){
    break;
    }
    k++;

}
 var f=0;
  while(f<ty){
 
  l1=[]
l2=[]
var i=s1[f];
var j=s2[f],kk=0;
while(!(i==d1 && j==d2)){
    mini=(row*col)+1;
    if (i+1<row && mat[i+1][j]!=-1){
        mini=mat[i+1][j];
        c=i+1;
        d=j;}
    if (j+1<col && mini>mat[i][j+1] && mat[i][j+1]!=-1){
        mini=mat[i][j+1];
        c=i;
        d=j+1;}
    if (i-1>=0 && mini>mat[i-1][j] && mat[i-1][j]!=-1){
        mini=mat[i-1][j];
        c=i-1;
        d=j;}
    if (j-1>=0 && mini>mat[i][j-1] && mat[i][j-1]!=-1){
        mini=mat[i][j-1];
        c=i;
        d=j-1;}
    if (i+1<row && j+1<col && mini>mat[i+1][j+1] && mat[i+1][j+1]!=-1)        {
        mini=mat[i+1][j+1];
        c=i+1;
        d=j+1;}
    if (i+1<row && j-1>=0 && mini>mat[i+1][j-1] && mat[i+1][j-1]!=-1){
        mini=mat[i+1][j-1];
        c=i+1;
        d=j-1;}
    if (i-1>=0 && j+1<col && mini>mat[i-1][j+1] && mat[i-1][j+1]!=-1){
        mini=mat[i-1][j+1];
        c=i-1;
        d=j+1;}
    if (i-1>=0 && j-1>=0 && mini>mat[i-1][j-1] && mat[i-1][j-1]!=-1){
        mini=mat[i-1][j-1];
        c=i-1;
        d=j-1;}
    i=c;
    j=d;
    l1[kk]=i;
    l2[kk]=j;
    kk++;

}
 
  var t=0;
 
while(t<kk-1){
  var df=l1[t]*col + (l2[t]+1);
  df=df.toString();
document.getElementById(df).style.backgroundColor = "#BBC86D"; //path highlighting
    t++;
}
    f++;
 
 
  }
}