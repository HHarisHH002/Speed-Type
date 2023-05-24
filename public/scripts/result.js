var urlParams = new URLSearchParams(window.location.search);
var username=urlParams.get('username');
console.log(username)
var WPM = urlParams.get('wpm');
var acc = urlParams.get('accuracy');
var x_wpm=urlParams.get('xvalues')
var y_sec=urlParams.get('yvalues')
var secs=urlParams.get('sec')

x_wpm=x_wpm.split(",").map(Number);
y_sec=y_sec.split(",").map(Number);
console.log(x_wpm)
var x=x_wpm
if(secs==30){
  x_wpm=[]
  y_sec=[]
  for(i=0;i<=28;i+=2){
    x_wpm.push(Math.floor((x[i]+x[i+1])/2))
    y_sec.push(i+2)
  }
}
if(secs==60){
  x_wpm=[]
  y_sec=[]
  for(i=0;i<=56;i+=4){
    x_wpm.push(Math.floor((x[i]+x[i+1]+x[i+2]+x[i+3])/4))
    y_sec.push(i+4)
  }
}

console.log(x_wpm,y_sec)

document.getElementById("wpmvalue").innerText=WPM;
document.getElementById("accvalue").innerText=acc+"%";

const colors = {
  yellow: {
    default: "rgba(254, 204, 1, 1)",
    half: "rgba(254, 204, 1, 0.5)",
    quarter: "rgba(254, 204, 1, 0.25)",
    zero: "rgba(254, 204, 1, 0)"
  },

};
const ctx = document.getElementById("myChart").getContext("2d");

gradient = ctx.createLinearGradient(0, 25, 0, 300);
gradient.addColorStop(0, colors.yellow.half);
gradient.addColorStop(0.35, colors.yellow.quarter);
gradient.addColorStop(1, colors.yellow.zero);

new Chart("myChart", {
  type: 'line',
  data: {
    labels:y_sec,
    datasets: [{
      fill: true,
      backgroundColor: gradient,
      pointBackgroundColor: colors.yellow.default,
      borderColor: colors.yellow.default,
      lineTension: 0.2,
      borderWidth: 2,
      pointRadius: 3,
      data: x_wpm
    }]
  },
  options: {
  layout: {
    padding: 10
  },
  responsive: true,
  legend: {
    display: false
  },

  scales: {
    xAxes: [
      {
        ticks: {
          padding: 10,
          min: 0,
          
        }
      }
    ],
    yAxes: [
      {
        scaleLabel: {
          display: false,
          
        },
        gridLines: {
          
          
        },
        ticks: {
          beginAtZero: false,
          padding: 10,
          min: 0,
          
        }
      }
    ]
  }
}

});
function reloadpage(){
  if(username==null){
    window.location.href ="/";
  }
  else{
    window.location.href ="/index?username="+username;
  }
}