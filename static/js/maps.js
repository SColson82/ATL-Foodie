function createMap(restaurants) {
  // Create the tile layer that will be the background of our map.
  var streetmap = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  // Initialize all the LayerGroups that we'll use.
  var layers = {
    FIVE_STARS: new L.LayerGroup(),
    FOUR_STARS: new L.LayerGroup(),
    THREE_STARS: new L.LayerGroup(),
    TWO_STARS: new L.LayerGroup(),
    ONE_STARS: new L.LayerGroup(),
  };
  // Create a baseMaps object to hold the streetmap layer.
  var baseMaps = {
    "Street Map": streetmap,
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
    "Five Stars": layers.FIVE_STARS,
    "Four Stars": layers.FOUR_STARS,
    "Three Stars": layers.THREE_STARS,
    "Two Stars": layers.TWO_STARS,
    "One Star": layers.ONE_STARS,
  };

  // Create the map object with options.
  var map = L.map("map", {
    center: [33.84, -84.32],
    zoom: 11,
    layers: [
      layers.FIVE_STARS,
      layers.FOUR_STARS,
      layers.THREE_STARS,
      layers.TWO_STARS,
      layers.ONE_STARS,
    ],
  });

  // Create a control for our layers, and add our overlays to it.
  L.control.layers(null, overlays).addTo(map);

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
  // Initialize an object that contains icons for each layer group.
var icons = {
  TWO_STARS: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  FIVE_STARS: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  ONE_STARS: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  THREE_STARS: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  FOUR_STARS: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  })
}

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("../static/Resources/yelp_atl_restaurants.json").then(function(infoRes) {

  // When the first API call completes, perform another call to the Citi Bike station status endpoint.
  d3.json("../static/Resources/yelp_atl_restaurants.json").then(function(statusRes) {
    var starStatus = statusRes.stars;
    var stationInfo =infoRes.name;

      // Initialize an array to hold bike markers.
    var restaurantCount = {
      FIVE_STARS: 0,
      FOUR_STARS: 0,
      THREE_STARS: 0,
      TWO_STARS: 0,
      ONE_STARS:0
    };

    // // Pull the "stations" property from response.data.
    // var stations = Object.entries(response.name);
    // var latitude = Object.entries(response.latitude);
    // var longitude = Object.entries(response.longitude);
    // console.log(stations);

    // Initialize stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for the layer group.
    var stationStatusCode;

    // Loop through the stations array.
    for (var index = 0; index < stationInfo.length; index++) {
      // Create a new station object with properties of both station objects.
      var station = Object.assign({}, stationInfo[index], stationStatus[index]);
      // If a station is listed but not installed, it's coming soon.
      if (station.stars > 4) {
        stationStatusCode = "FIVE_STARS";
      }
      // If a station has no available bikes, it's empty.
      else if (station.stars > 3) {
        stationStatusCode = "FOUR_STARS";
      }
      // If a station is installed but isn't renting, it's out of order.
      else if (station.stars > 2) {
        stationStatusCode = "THREE_STARS";
      }
      // If a station has less than five bikes, it's status is low.
      else if (station.stars > 1) {
        stationStatusCode = "TWO_STARS";
      }
      // Otherwise, the station is normal.
      else {
        stationStatusCode = "ONE_STARS";
      }

      // Update the station count.
      restaurantCount[stationStatusCode]++;

      // Create a new marker with the appropriate icon and coordinates.
      var newMarker = L.marker([station.lat, station.lon], {
        icon: icons[stationStatusCode]
      });

      // Add the new marker to the appropriate layer.
      newMarker.addTo(layers[stationStatusCode]);

      // For each station, create a marker, and bind a popup with the station's name.
      var restaurantMarker = L.marker([
        latitude[index][1],
        longitude[index][1],
      ]).bindPopup(
        "<h3>" +
          stations[index][1] +
          "<h3><h3>Capacity: " +
          latitude[index][1] +
          longitude[index][1] +
          "</h3>"
      );}

    // Add the marker to the bikeMarkers array.
    restaurantMarkers.push(restaurantMarker);
  }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(restaurantMarkers));
  // Call the updateLegend function, which will update the legend!
  updateLegend(updatedAt, restaurantCount);
)});
});

// Update the legend's innerHTML with the last updated time and station count.
function updateLegend(time, restaurantCount) {
document.querySelector(".legend").innerHTML = [
  "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
  "<p class='out-of-order'>Out of Order Stations: " + restaurantCount.FIVE_STARS + "</p>",
  "<p class='coming-soon'>Stations Coming Soon: " + restaurantCount.FOUR_STARS + "</p>",
  "<p class='empty'>Empty Stations: " + restaurantCount.THREE_STARS + "</p>",
  "<p class='low'>Low Stations: " + restaurantCount.TWO_STARS + "</p>",
  "<p class='healthy'>Healthy Stations: " + restaurantCount.ONE_STARS + "</p>"
].join("");
}


