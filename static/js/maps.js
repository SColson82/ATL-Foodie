d3.json("../static/Resources/yelp_atl_restaurants.json").then(function(infoRes) {

    var starStatus = Object.entries(infoRes.stars);
    var restName = Object.entries(infoRes.name);
    var latitude = Object.entries(infoRes.latitude);
    var longitude = Object.entries(infoRes.longitude);
    let addressList = Object.entries(infoRes.address);
    let cityList = Object.entries(infoRes.city);
    let stateList = Object.entries(infoRes.state);
    let zipList = Object.entries(infoRes.postal_code);
    let catList = Object.entries(infoRes.categories);

    var restaurantCount = {
      FIVE_STARS: 0,
      FOUR_STARS: 0,
      THREE_STARS: 0,
      TWO_STARS: 0,
      ONE_STARS:0
    };

    var starStatusCode;
    var restaurantMarkers1=[];
    var restaurantMarkers2=[];
    var restaurantMarkers3=[];
    var restaurantMarkers4=[];
    var restaurantMarkers5=[];

    // Initialize an object that contains icons for each layer group.
    var icons = {
      ONE_STARS: L.ExtraMarkers.icon({
        markerColor: "red",
        shape: "penta"
      }),
      TWO_STARS: L.ExtraMarkers.icon({
        markerColor: "orange",
        shape: "penta"
      }),
      THREE_STARS: L.ExtraMarkers.icon({
        markerColor: "yellow",
        shape: "circle"
      }),
      FOUR_STARS: L.ExtraMarkers.icon({
        markerColor: "blue",
        shape: "square"
      }),
      FIVE_STARS: L.ExtraMarkers.icon({
        markerColor: "green",
        shape: "star"
      })
    };

    // Loop through the restName array.
    for (var index = 0; index < restName.length; index++) {

      if (starStatus[index][1] > 4) {
        starStatusCode = "FIVE_STARS";
      } else if (starStatus[index][1] > 3) {
        starStatusCode = "FOUR_STARS";
      } else if (starStatus[index][1] > 2) {
        starStatusCode = "THREE_STARS";
      } else if (starStatus[index][1] > 1) {
        starStatusCode = "TWO_STARS";
      } else {
        starStatusCode = "ONE_STARS";
      };

      var restaurantMarker = L.marker([latitude[index][1],longitude[index][1]], {
        icon: icons[starStatusCode]
      }).bindPopup(
        `<h4>${restName[index][1]}</h4>
        <h5>Rating: ${starStatus[index][1]}</h5>
        <h5>Address: ${addressList[index][1]}, ${cityList[index][1]}, ${stateList[index][1]} ${zipList[index][1]}</h5>
        <h5>Categories: ${catList[index][1]}</h5>`);

      

      if (starStatus[index][1] > 4) {
        restaurantMarkers5.push(restaurantMarker);
      } else if (starStatus[index][1] > 3) {
        restaurantMarkers4.push(restaurantMarker);
      } else if (starStatus[index][1] > 2) {
        restaurantMarkers3.push(restaurantMarker);
      } else if (starStatus[index][1] > 1) {
        restaurantMarkers2.push(restaurantMarker);
      } else {
        restaurantMarkers1.push(restaurantMarker);
      };

      // Update the restaurant count
      restaurantCount[starStatusCode]++;
    };

    createMap([restaurantMarkers1, restaurantMarkers2, restaurantMarkers3, restaurantMarkers4, restaurantMarkers5]);

    // Call the updateLegend function, which will update the legend
    updateLegend(restaurantCount);
});

function createMap(restaurantMarkers) {
  // Create the tile layer that will be the background of our map.
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Initialize all the LayerGroups that we'll use.
  var layers = {
    "FIVE_STARS": new L.LayerGroup(restaurantMarkers[4]),
    "FOUR_STARS": new L.LayerGroup(restaurantMarkers[3]),
    "THREE_STARS": new L.LayerGroup(restaurantMarkers[2]),
    "TWO_STARS": new L.LayerGroup(restaurantMarkers[1]),
    "ONE_STARS": new L.LayerGroup(restaurantMarkers[0]),
  };

  // Create a baseMaps object to hold the streetmap layer
  var baseMaps = {
    "Street Map": streetmap,
  };

  // Create an overlayMaps object
  var overlayMaps = {
    "Five Stars": layers.FIVE_STARS,
    "Four Stars": layers.FOUR_STARS,
    "Three Stars": layers.THREE_STARS,
    "Two Stars": layers.TWO_STARS,
    "One Star": layers.ONE_STARS
  };

  // Create the map object with options.
  var map = L.map("map", {
    center: [33.7790, -84.3880],
    zoom: 11,
    layers: [
      streetmap,
      layers.FIVE_STARS
    ],
  });

  // Create a control for our layers, and add our overlays to it.
  L.control.layers(baseMaps, overlayMaps,{collapsed:false}).addTo(map);

  // Create a legend to display information about our map.
  var info = L.control({
    position: "bottomright",
  });

  // When the layer control is added, insert a div with the class of "legend".
  info.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };

  // Add the info legend to the map.
  info.addTo(map);
};


// Update the legend's innerHTML with the restaurant star count.
function updateLegend(restaurantCount) {
  document.querySelector(".legend").innerHTML = [
    "<div class='fivestars'>Five Stars: " + restaurantCount.FIVE_STARS + "</div>",
    "<div class='fourstars'>Four Stars: " + restaurantCount.FOUR_STARS + "</div>",
    "<div class='threestars'>Three Stars: " + restaurantCount.THREE_STARS + "</div>",
    "<div class='twostars'>Two Stars: " + restaurantCount.TWO_STARS + "</div>",
    "<div class='onestars'>One Stars: " + restaurantCount.ONE_STARS + "</div>"
  ].join("");

};