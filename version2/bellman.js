var v= 0;

var mat = [];
var s1,s2,d1,d2;
var n=12;
for(var i=0; i<n; i++) {
    mat[i] = [];
    for(var j=0; j<n; j++) {
        mat[i][j] = n*n*n;
    }
}
function reply_click(a){
  a=Number(a);
  var q=((a-1)/12);
  var rem=((a-1)%12);
  q.toFixed(0);
  rem.toFixed(0);
  q=parseInt(q);
  rem=parseInt(rem);
  if (v==0){
   document.getElementById(a).style.backgroundColor = "GREEN";
   s1=q;
   s2=rem;
   
   v=1;
  }
  else if (v==1){
    document.getElementById(a).style.backgroundColor = "RED";
    d1=q;
    d2=rem;
    mat[d1][d2]=0;
    v=2;
  }
  else{
    document.getElementById(a).style.backgroundColor = "lightblue";
    mat[q][rem]=-1;
    v++;
  }
  
}

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




function bellalgo(){
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
  
  l1=[]
l2=[]
var i=s1;
var j=s2,kk=0;
while(!(i==d1 && j==d2)){
    mini=n*n*n;
    if (i+1<n && mat[i+1][j]!=-1){
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
  
  var t=0;
while(t<kk-1){
  var df=l1[t]*12 + (l2[t]+1);
  df=df.toString();
	document.getElementById(df).style.backgroundColor = "PURPLE";
    t++;
}


  
}




