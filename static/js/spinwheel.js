// Save filepath of json file
const url = "templates/Resources/categories.json";


// access data in json file
d3.json(url).then(function(data) {
  var selectorLabels = Object.values(data.Category);

  var sectors = [];

  //define different colors and sections of the wheel
  for (let i=0; i<selectorLabels.length; i++) {
    sectors.push({
      color: colorPicker(i), 
      label: selectorLabels[i], 
      textFontSize: 14})
  };

  function colorPicker(i) {
    if (i % 7 === 1) {
      return "#007474";
    } else if (i % 7 === 2) {
      return "#de3163";
    } else if (i % 7 === 3) {
      return "#d73b3e";
    } else if (i % 7 === 4) {
      return "#0014a8";
    } else if (i % 7 === 5) {
      return "#ff6961";
    } else if (i % 7 === 6) {
      return "#6a5acd";
    } else if (i % 7 === 0) {
      return "#ff69b4";
    } else {
      return "black";
    }
  }


const rand = (m, M) => Math.random() * (M - m) + m;
const tot = sectors.length;
const EL_spin = document.querySelector("#spin");
const ctx = document.querySelector("#wheel").getContext('2d');
const dia = ctx.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / sectors.length;

const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0; // Angular velocity
let ang = 0; // Angle in radians

const getIndex = () => Math.floor(tot - ang / TAU * tot) % tot;

function drawSector(sector, i) {
  const ang = arc * i;
  ctx.save();
  // COLOR
  ctx.beginPath();
  ctx.fillStyle = sector.color;
  ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad, ang, ang + arc);
  ctx.lineTo(rad, rad);
  ctx.fill();
  // TEXT
  ctx.translate(rad, rad);
  ctx.rotate(ang + arc / 2);
  ctx.textAlign = "right";
  ctx.fillStyle = "#fff";
  ctx.font = "bold 17px sans-serif";
  ctx.fillText(sector.label, rad - 10, 10);
  //
  ctx.restore();
};

function rotate() {
  const sector = sectors[getIndex()];
  //console.log("sector", sector)
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  EL_spin.textContent = lineNum();
  EL_spin.style.background = sector.color;

  function lineNum() {
    if (!angVel) {
      return "SPIN";
    } else if (sector.label.split(" ")[1]) {
      let textSplit = sector.label.split(" ");
      let returnString = "";
      for (let i=0; i<textSplit.length; i++) {
        returnString += `${textSplit[i]} <br>`
      };
      console.log(returnString);
      return returnString;
    } else {
      return sector.label;
    }
  }
}

function frame() {
  if (!angVel) return;
  angVel *= friction; // Decrement velocity by friction
  if (angVel < 0.002) angVel = 0; // Bring to stop
  ang += angVel; // Update angle
  ang %= TAU; // Normalize angle
  rotate();
}

function engine() {
  frame();
  requestAnimationFrame(engine)
}

// INIT
sectors.forEach(drawSector);
rotate(); // Initial rotation
engine(); // Start engine
EL_spin.addEventListener("click", () => {
  if (!angVel) angVel = rand(0.25, 0.35);
});

var dropdown = d3.select("#selDataset2");

  function init(){
    selectorLabels.forEach((type)=>{
      dropdown.append("option").text(type).property("value",type)
    })
  };

  init();

  dropdown.on("change", function() {
    d3.selectAll("h5").remove();

    //get restaurants info from json file
    d3.json("../../templates/Resources/yelp_atl_restaurants.json").then((restData) => {
        let catList = Object.entries(restData.categories);
        let nameList = Object.entries(restData.name);
        let type = d3.select(this).property("value");
        let restList = [];

        for (let i=0; i<catList.length; i++) {
          if (catList[i][1].includes(type)) {
            restList.push(nameList[i][1]);
          }
        };

        displayList = [];

        for (let i=0; i<5; i++) {
          var random = Math.floor(Math.random() * restList.length);
          while (displayList.includes(restList[random])) {
            var random = Math.floor(Math.random() * restList.length);
          }
          displayList.push(restList[random])
          d3.select("#restaurants").append("h5").text(`${restList[random]}`).style("color", "black");
        };

    })    
  });

  

});