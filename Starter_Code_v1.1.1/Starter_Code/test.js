// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);


  // from 15:1:6 
// Define a markerSize() function that will give each city a different radius based on its population.

  function markerSize (mag) {
    return mag *2
  };

  function chooseColor(depth) {
    switch(true) {
      case depth > 90:
        return "#800026";
      case depth > 70:
        return "#BD0026";
      case depth > 50:
        return "#E31A1C";
      case depth > 30:
        return "#FC4E2A";
      case depth > 10:
        return "#FEB24C";
      default:
        return "#FED976";
    }
  }
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
 
  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, 
        {
          radius: markerSize(feature.properties.mag),
          fillColor: chooseColor(feature.geometry.coordinates[2]),
          fillOpacity: 0.5,
          color: "black",
          // color: "#FED976",
          stroke: true,
          weight: 0.2
        }
      )
    }
     
  function onEachFeature (feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }
 
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  let features = features;

  for (let i = 0; i < features.length; i++) {
  
    // Conditionals for country gdp_pc
    let color = "";
    if (features[i].properties.mag > 1) {
      color = "yellow";
    }
    else if (features[i].properties.mag  > 3) {
      color = "blue";
    }
    else if (features[i].properties.mag  > 6) {
      color = "green";
    }
    else {
      color = "violet";
    }
  L.circle(features[i].geometry.coordinates[2] ,{
    fillOpacity: 0.75,
    color: "white",
    fillColor: color}).addTo(myMap);
  }
  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
