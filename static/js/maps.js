function createMap(restaurants) {
  // Create the tile layer that will be the background of our map.
  var streetmap = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  // Create a baseMaps object to hold the streetmap layer.
  var baseMaps = {
    "Street Map": streetmap,
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
    "restaurants": restaurants,
  };

  // Create the map object with options.
  var map = L.map("map-id", {
    center: [33.84, -84.32],
    zoom: 11,
    layers: [streetmap, restaurants],
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control
    .layers(baseMaps, overlayMaps, {
      collapsed: false,
    })
    .addTo(map);
}

function createMarkers(response) {
  // Pull the "stations" property from response.data.
  var stations = Object.entries(response.name);
  var latitude = Object.entries(response.latitude);
  var longitude = Object.entries(response.longitude);
  console.log(stations)
  // Initialize an array to hold bike markers.
  var restaurantMarkers = [];

  // Loop through the stations array.
  for (var index = 0; index < stations.length; index++) {

    // For each station, create a marker, and bind a popup with the station's name.
    var restaurantMarker = L.marker([latitude[index][1], longitude[index][1]]).bindPopup(
      "<h3>" + stations[index][1] + "<h3><h3>Capacity: " + latitude[index][1] + longitude[index][1] +  "</h3>"
    );

    // Add the marker to the bikeMarkers array.
    restaurantMarkers.push(restaurantMarker);
  }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(restaurantMarkers));
}

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("../Basic/static/Resources/yelp_atl_restaurants.json").then(
  createMarkers
);
