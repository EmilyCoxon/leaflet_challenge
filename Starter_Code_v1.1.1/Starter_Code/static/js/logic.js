//Call the URL https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson
// all earthquakes from past 7 days: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
// past 1 day below for testing

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
//1. Use the URL of this JSON to pull in the data for the visualisation

// Perform a GET request to query url
d3.json(url).then(function(data) {
  createFeatures(data.features);


});

function createMap(earthquakes) {

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

  let myMap = L.map("map", {
    center: [
      -26, 140
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });


  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}

// 2. Import and visualise the data by doing the following:
//magnitude, location and depth

// 2.1 Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude. 
// Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by colour.
//
//feature.properties.mag
//
//feature.coordinates.geography[2]
function createFeatures(earthquakeData) {

  let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: markerSize(feature.properties.mag),
          fillColor: myColour(feature.geometry.coordinates[2]),
          fillOpacity: 0.9,
          color: "#000000",
          stroke: true,
          weight: 0.3
        })
      }

    
  });

//Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in colour.


function markerSize(mag) {
  // let mag = (feature.properties.mag);
  return mag * 5;
}

// Hint: The depth of the earth can be found as the third coordinate for each earthquake.

function myColour(depth) {
  switch(true) {
    case depth > 90:
      return "#660066";
    case depth > 70:
      return "#800080";
    case depth > 50:
      return "#993366";
    case depth > 30:
      return "#FF8080";
    case depth > 10:
      return "#FF99CC";
    default:
      return "#FFCC99";
  }
}

  createMap(earthquakes);
}
// Define a markerSize() function that will give each city a different radius based on its magnitude



// 2.2 Include popups that provide additional information about the earthquake when its associated marker is clicked.

function onEachFeature(feature, layer){
  layer.bindPopup(`<h2>Location: ${feature.properties.place}</h2><hr><h3>Magnitude: ${feature.properties.mag}</h3><hr>
  <p>Depth (km): ${feature.geometry.coordinates[2]}</p><hr><p>Time/Date: ${new Date(feature.properties.time)}</p>`);
}


// 2.3 Create a legend that will provide context for your map data.

// 15:2:4 how to legend


  // Set up the legend.
let legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  let depth = [-10, 10, 30, 50, 70, 90];

    // Add the minimum and maximum.
   let legendInfo = "<h1>Depth (km)</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + depth[0] + "</div>" +
        "<div class=\"max\">" + depth[depth.length - 1] + "</div>" +
      "</div>";

   div.innerHTML = legendInfo;

  limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding the legend to the map
legend.addTo(myMap);











