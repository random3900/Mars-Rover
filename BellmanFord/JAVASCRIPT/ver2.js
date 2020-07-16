
function initi(c,d,mat,n){
    var flag=0;
    var temp=mat[c][d];
    var mini=temp;
  
    if (c+1<n && mat[c+1][d]!=-1 ){
        mini=Math.min(mat[c][d],mat[c+1][d]+1,mini);}
        
    if (d+1<n && mat[c][d+1]!=-1){
        mini=Math.min(mat[c][d],mat[c][d+1]+1,mini);}
            
    if (d-1>=0 && mat[c][d-1]!=-1){
        mini=Math.min(mat[c][d-1]+1,mat[c][d],mini);}
            
    if (c-1>=0 && mat[c-1][d]!=-1){
        mini=Math.min(mat[c-1][d]+1,mat[c][d],mini);}

    if (c+1<n && d+1<n && mat[c+1][d+1]!=-1){
        mini=Math.min(mat[c+1][d+1]+1,mat[c][d],mini);}

    if (c-1>=0 && d+1<n && mat[c-1][d+1]!=-1){
        mini=Math.min(mat[c-1][d+1]+1,mat[c][d],mini);}

    if (c+1<n && d-1>=0 && mat[c+1][d-1]!=-1){
        mini=Math.min(mat[c+1][d-1]+1,mat[c][d],mini);}

    if (c-1>=0 && d-1>=0 && mat[c-1][d-1]!=-1){
        mini=Math.min(mat[c-1][d-1]+1,mat[c][d],mini);}
    if (temp>mini){
        flag=1;
        mat[c][d]=mini;}
        
    return flag;

}







var mat = [];
var n=12;
for(var i=0; i<n; i++) {
    mat[i] = [];
    for(var j=0; j<n; j++) {
        mat[i][j] = n*n*n;
    }
}

var s1=0,s2=0,d1=3,d2=3;
mat[d1][d2]=0;
mat[3][2]=-1;
mat[2][2]=-1;
mat[3][4]=-1;
mat[2][3]=-1;
mat[2][4]=-1;
mat[4][3]=-1;
mat[4][4]=-1;


var k=0,v=n*n;
while(k<v){
	flag=0;
    for (i=d1;i<n;i++){
        for (j=d2;j<n;j++){
            if (mat[i][j]!=-1){
                flag=Math.max(flag,initi(i,j,mat,n))}}}

    for (i=d1;i<n;i++){
        for (j=d2;j>=0;j--){
            if (mat[i][j]!=-1){
                flag=Math.max(flag,initi(i,j,mat,n))}}}
    for (i=d1;i>=0;i--){
        for (j=d2;j<n;j++){
            if (mat[i][j]!=-1){
                flag=Math.max(flag,initi(i,j,mat,n))}}}
    for (i=d1;i>=0;i--){
        for (j=d2;j>=0;j--){
            if (mat[i][j]!=-1){
                flag=Math.max(flag,initi(i,j,mat,n))}}}
    if (flag==0){
    	break;
    }
    k++;

}

for(var i = 0; i < n; i++) {
  for(var z = 0; z < n; z++) {
    document.write(mat[i][z],end=" ");
  }
  document.write("<br>");
}


l1=[]
l2=[]
var i=s1;
var j=s2,kk=0;
while(!(i==d1 && j==d2)){
    mini=n*n*n;
    if (i+1<n){
        mini=mat[i+1][j];
        c=i+1;
        d=j;}
    if (j+1<n && mini>mat[i][j+1] && mat[i][j+1]!=-1){
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
    if (i+1<n && j+1<n && mini>mat[i+1][j+1] && mat[i+1][j+1]!=-1){
        mini=mat[i+1][j+1];
        c=i+1;
        d=j+1;}
    if (i+1<n && j-1>=0 && mini>mat[i+1][j-1] && mat[i+1][j-1]!=-1){
        mini=mat[i+1][j-1];
        c=i+1;
        d=j-1;}
    if (i-1>=0 && j+1<n && mini>mat[i-1][j+1] && mat[i-1][j+1]!=-1){
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

t=0;
while(t<kk){
	document.write(l1[t] +" " + l2[t],end="<br>");
    t++;
}









