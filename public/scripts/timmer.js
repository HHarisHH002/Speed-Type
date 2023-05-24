
var isgamestarted=0
function timmer(time){
  if(isgamestarted==0){
    document.getElementById("timer-animation").style.animation='countdown ' + time + 's';
    var countdownNumberEl = document.getElementById('countdown-number');
    var countdown = time;
    countdownNumberEl.textContent = countdown;
    interval=setInterval(function() {
      countdown = --countdown <= 0 ? StopFunction(): countdown;

      countdownNumberEl.textContent = countdown;
    }, 1000);
    isgamestarted=1
}
}
function StopFunction() {
  clearInterval(interval);
}

