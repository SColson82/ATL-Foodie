function FindMeMap() {
  var options = {center : new L.LatLng(45.52, -122.67), zoom : 11.5 };
  
  var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  
  var mapLayer = new L.TileLayer(osmUrl);
  
  this.map = new L.Map('map', options).addLayer(mapLayer);
}

function locateUser() {
  this.map.locate({setView : true});
}

var map = null;

FindMeMap();

$('#actions').find('a').on('click', function() {
 locateUser();
});
