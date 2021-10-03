


//define different colors and sections of the wheel
const sectors = [
  {color:"#ee1c24", label:"Pizza", textFontSize : 16},
  {color:"#3cb878", label:"Chinese", textFontSize : 16},
  {color:"#f6989d", label:"American", textFontSize : 16},
  {color:"#00aef0", label:"European", textFontSize : 16},
  {color:"#f26522", label:"Japanese", textFontSize : 16},
  {color:"#000000", label:"BLANK", textFontSize : 16}, 
  {color:"#e70697", label:"Soup/Salad/Sandwich", textFontSize : 9,},
  {color:"#88d498", label:"Vegan/Vegetarian", textFontSize : 16},
  {color:"#f6989d", label:"Thai", textFontSize : 16},
  {color:"#ee1c24", label:"Mexican", textFontSize : 16},
  {color:"#3cb878", label:"Latin American", textFontSize : 10}, 
  {color:"#f26522", label:"African", textFontSize : 16},
  {color:"#a186be", label:"Korean", textFontSize : 16},
  {color:"#88d498", label:"Italian", textFontSize : 16},
  {color:"#00aef0", label:"Irish", textFontSize : 16},
  {color:"#ee1c24", label:"Mediterranean", textFontSize : 10},
  {color:"#f6989d", label:"Caribbean", textFontSize : 16},
  {color:"#f26522", label:"French", textFontSize : 16},
  {color:"#3cb878", label:"Tex-mex", textFontSize : 16},
  {color:"#165baa", label:"Seafood", textFontSize : 16},
  {color:"#a186be", label:"Spanish", textFontSize : 16},
  {color:"#88d498", label:"Chicken", textFontSize : 16},
  {color:"#00aef0", label:"Southeast Asian", textFontSize : 10},
  {color:"#f4a261", label:"Jewish/Kosher", textFontSize : 10},
  {color:"#e9c46a", label:"Middle Eastern", textFontSize : 10},
  {color:"#f4a261", label:"BBQ/Steakhouse", textFontSize : 8},
  {color:"#f26522", label:"Australian", textFontSize : 16},
]


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
  ctx.font = "bold 20px sans-serif";
  ctx.fillText(sector.label, rad - 10, 10);
  //
  ctx.restore();
};

function rotate() {
  const sector = sectors[getIndex()];
  //console.log("sector", sector)
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  EL_spin.textContent = !angVel ? "SPIN" : sector.label;
  EL_spin.style.background = sector.color;
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


function restaurants(restaurantInfo){
  d3.json("/categories").then((Resources) => {
      // //get samples info from json file

      let samples = [];
      for (var i = 0; i < data.length; i++) {
          samples.push(Object.values(data)[i]);
}
      console.log("ID#", samples)
      const twoColumns = { data: samples.map(({categories, restaurant }) => ({categories, restaurant })) };
      console.log("twoColumns", twoColumns)

       // filter to get different types of cuisines
      let restSamples = samples.filter(function (restNames) {
          return restNames.categories_description == restaurantInfo
      });
      console.log("restSamples", restSamples)
      let display2 = d3.select("#sample-metadata2");
      display2.html("");
      //get the list of restaurants
      let restCounts = getcounts(restSamples, "restaurant");
      console.log("restCounts", restCounts)
      console.log(Object.keys(restCounts))
      console.log(Object.values(restCounts));
      let restResults = Object.keys(restCounts).map(f=>({type:f, count:restCounts[f]}))
      console.log("restResults", restResults)
       // Sort the data by the most number of cuisines in each city in descending (most to least)
      let restResultsSortedByValues = Object.values(restResults).sort((a, b) => b.count - a.count);
      console.log("restsortedbyvalues", restResultsSortedByValues)
      restResultsSlicedData = restResultsSortedByValues.slice(0, 5);
      console.log("restResultsSlicedData", restResultsSlicedData)
      //get the list of 5 restaurants for each cuisine
      restResultsDisplay=[]
          for (var s = 0; s < restResultsSlicedData.length; s++) {
              restResultsDisplay.push(restResultsSlicedData[s].type);
          }
          console.log("restResultsdisplay", restResultsDisplay)
      Object.entries(restResultsDisplay).forEach(([,d])=>{
           display2.append("h5").text(`${d}`); 
            });
  })    
}
//restaurants("Italian")
function init(){


// //  // see dropdown
d3.json("/categories").then((data) => {
  let sampleNames = [];
  for (var i = 0; i < data.length; i++) {
    sampleNames.push(Object.values(data)[i]);
}
  var boroNames = {};
  sampleNames.forEach(function(typeBoro){
  //console.log(value)
  if (boroNames[typeBoro["boro"]]) {
      boroNames[typeBoro["boro"]]++;
    }
    else {
      boroNames[typeBoro["boro"]] = 1;
    } 
  })

  console.log("boroNames", boroNames)
  let boroInfo = Object.keys(boroNames).map(e=>({boro:e, count:boroNames[e]}));
  console.log("boroInfo", boroInfo);
  var obj = {};
sampleNames.forEach(function(value){
//console.log(value)
if (obj[value["cuisine_description"]]) {
  obj[value["cuisine_description"]]++;
}
else {
  obj[value["cuisine_description"]] = 1;
} 
});
  let results = Object.keys(obj).map(e=>({type:e, count:obj[e]}));

restaurantsTypes=[]
  for (var i = 0; i < results.length; i++) {
      restaurantsTypes.push(results[i].type);
  }
 
let dropDown2 = d3. select("#selDataset2");
restaurantsTypes.forEach((o)=>{
dropDown2.append("option").text(o).property("value",o)
})

});
};
function optionChanged(restaurantInfo) {
 restaurants(restaurantInfo);


};

init()

function getcounts(dataArray, myParam) {

  var finalArray = {};
  dataArray.forEach(function (boroNames) {
      //console.log(value)
      if (finalArray[boroNames[myParam]]) {
          finalArray[boroNames[myParam]]++;
      }
      else {
          finalArray[boroNames[myParam]] = 1;
      }
  });
  return finalArray;
  
}
