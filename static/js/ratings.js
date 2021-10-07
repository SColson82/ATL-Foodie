var myMap = L.map("map", {
  center: [33.7790, -84.3880],
  zoom: 11
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json("../static/Resources/yelp_atl_restaurants.json").then(function(restData) {

  let starList = Object.entries(restData.stars);
  let latList = Object.entries(restData.latitude);
  let longList = Object.entries(restData.longitude);
  var heatArray = [];

  for (var i = 0; i < starList.length; i++) {
    heatArray.push([latList[i][1], longList[i][1], starList[i][1]]);
  };

  L.heatLayer(heatArray, {
    radius: 35,
    max: 5
  }).addTo(myMap);

});