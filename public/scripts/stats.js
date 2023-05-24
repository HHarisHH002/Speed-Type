window.onload=togglesec('sec15')
const colors = {
    yellow: {
        default: "rgba(254, 204, 1, 1)",
        half: "rgba(254, 204, 1, 0.5)",
        quarter: "rgba(254, 204, 1, 0.25)",
        zero: "rgba(254, 204, 1, 0)"
    },

};
var values= document.getElementById('value').innerText;
vals=JSON.parse(values)


const ctx = document.getElementById("myChart").getContext("2d");

gradient = ctx.createLinearGradient(0, 25, 0, 300);
gradient.addColorStop(0, colors.yellow.half);
gradient.addColorStop(0.35, colors.yellow.quarter);
gradient.addColorStop(1, colors.yellow.zero);

new Chart("myChart", {
    type: "scatter",

    data: {
        
        datasets: [{
            fill: true,
            showLine:true,
            backgroundColor: gradient,
            pointBackgroundColor: colors.yellow.default,
            borderColor: colors.yellow.default,
            lineTension: 0.2,
            borderWidth: 2,
            pointRadius: 3,
            data: vals
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
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        padding: 10,
                        autoSkip: false,
                        precision: 0,
                        

                    }
                }
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: false,

                    },
                    gridLines: {
                        display: false,
                        color: colors.yellow.quarter
                    },
                    ticks: {
                        beginAtZero: false,
                        precision: 0,
                        padding: 10
                    }
                }
            ]
        }
    }

});

var loadFile = function (event) {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
  };

var urlParams = new URLSearchParams(window.location.search);
var username=urlParams.get('username');


function loadpage(){
window.location.href ="/index?username="+username;
}

function loadstatspage(){
    window.location.href ="/stats?username="+username;
}
function loadscorespage(){
    window.location.href ="/scoretable?choosensec=15&username="+username;
}

function togglesec(ids){

    if(ids==="sec15"){
        document.getElementById('score60sec').style.display="none"
        document.getElementById('score30sec').style.display="none"
        document.getElementById('score15sec').style.display="flex"
        document.getElementById('sec30').style.color= "#CCC";
        document.getElementById('sec60').style.color= "#CCC";
      }
      else if(ids==="sec30"){
        document.getElementById('score60sec').style.display="none"
        document.getElementById('score15sec').style.display="none"
        document.getElementById('score30sec').style.display="flex"
        document.getElementById('sec15').style.color= "#CCC";
        document.getElementById('sec60').style.color= "#CCC";
      }
      else{
        document.getElementById('score15sec').style.display="none"
        document.getElementById('score30sec').style.display="none"
        document.getElementById('score60sec').style.display="flex"
        document.getElementById('sec15').style.color= "#CCC";
        document.getElementById('sec30').style.color= "#CCC";
      }
      document.getElementById(ids).style.color= "#eabc01";
     
}