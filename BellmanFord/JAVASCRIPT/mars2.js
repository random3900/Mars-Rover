var v= 0;
function reply_click(a){
  
  if (v==0){
   document.getElementById(a).style.backgroundColor = "GREEN";
    v++;
  }
  else if (v==1){
    document.getElementById(a).style.backgroundColor = "RED";
    v++;
  }
  else{
    document.getElementById(a).style.backgroundColor = "lightblue";
    v++;
  }
  
}