// function charts(yelpRestaurantID) {
//     d3.json("static/Resources/yelp_atl_restaurants.json").then(data) =>{
//         var plattingData =data.review_count;
//     }
// }
var data = "static/Resources/yelp_atl_restaurants.json";

var dataPlotting = [
  {
    type: "densitymapbox",
    lon: data.longitude,
    lat: data.latitude,
    z: [1, 3, 2],
    radius: 50,
    colorbar: { y: 1, yanchor: "top", len: 0.45 },
  },
  {
    type: "densitymapbox",
    lon: [32, 35],
    lat: [-82, -85],
    radius: [50, 10],
    colorbar: { y: 0, yanchor: "bottom", len: 0.45 },
  },
];

var layout = {
  mapbox: { style: "light", center: { lat: 33.75, lon: -84.39 } },
  width: 600,
  height: 400,
};
var PUBLIC_API_KEY =
  "pk.eyJ1Ijoic2NvbHNvbjgyIiwiYSI6ImNrdTYzbjhrdjU3ODMyb28yZmlrMHpybjYifQ.jzpQ-HWh3lT55X-v0IQoHA";
var config = { mapboxAccessToken: PUBLIC_API_KEY };

Plotly.newPlot("rate-map", dataPlotting, layout, config);

function init() {
  d3.json("static/Resources/yelp_atl_restaurants.json").then(function (data) {
    console.log("static/Resources/yelp_atl_restaurants.json", data);
    // Set up the DropDown:
    let DropDown = d3.select(`#rate-map`);

    data.names.forEach((review_count) => {
      DropDown.append(`option`)
        .text(review_count)
        .property(`value`, review_count);
    });
    // Reset demographic info and visuals to first subject when page is refreshed.
    const firstSample = data.review_count[0];
    charts(firstSample);
    demo(firstSample);
  });
}
// Pull data for new subject into demo and visuals.
function optionChanged(newSample) {
  charts(newSample);
  demo(newSample);
}

init();
