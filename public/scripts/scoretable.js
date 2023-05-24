var urlParams = new URLSearchParams(window.location.search);
var user=urlParams.get('username');
var choosesec=urlParams.get('choosensec');
window.onload=togglesec(choosesec)
function loadpage(){
window.location.href ="/index?username="+user;
}
function loadchoosecsec(sec){
    window.location.href ="/scoretable?choosensec="+sec+"&username="+user;
}
function viewprofile(viewuser){
    window.location.href ="/stats?username="+user+'&viewuser='+viewuser;
}
function togglesec(ids){

    if(ids=='15'){
        document.getElementById('sec30').style.color= "#CCC";
        document.getElementById('sec60').style.color= "#CCC";
        document.getElementById('sec15').style.color= "#eabc01";
      }
      else if(ids=='30'){
        document.getElementById('sec15').style.color= "#CCC";
        document.getElementById('sec60').style.color= "#CCC";
        document.getElementById('sec30').style.color= "#eabc01";
      }
      else{
        document.getElementById('sec15').style.color= "#CCC";
        document.getElementById('sec30').style.color= "#CCC";
        document.getElementById('sec60').style.color= "#eabc01";
      }

     
}