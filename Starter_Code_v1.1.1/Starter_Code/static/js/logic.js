//Call the URL https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson
// all earthquakes from past 7 days: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
// past 1 day below for testing

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
//1. Use the URL of this JSON to pull in the data for the visualisation

// Perform a GET request to query url
d3.json(url).then(function(data) {
  createFeatures(data.features);

//when response recieved, send data.features object to createFeatures function
//     function markerSize(magnitude){
//         return magnitude*2;
//     }
});
//magnitude, location and depth


function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer){
        layer.bindPopup(`<h2>Location: ${feature.properties.place}</h2><hr><h3>Magnitude: ${feature.properties.mag}</h3><hr>
        <p>Depth(km): ${feature.geometry.coordinates[2]}</p><hr><p>${new Date(feature.properties.time)}</p>`);
    }

    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    createMap(earthquakes);
}

// Define a markerSize() function that will give each city a different radius based on its magnitude
let mag = (features.properties.mag);
function markerSize(mag) {
  return mag * 2;
}




// create colour profile for magnitude and depth 

// //  // Loop through the cities array, and create one marker for each city object.
//  for (let i = 0; i < feature.length; i++) {
  
//     // Conditionals for country gdp_pc
//     let color = "";
//     if (feature[i].geometry.coordinates[2] > 10) {
//       color = "yellow";
//     }
//     else if (feature[i].geometry.coordinates[2]> 20) {
//       color = "blue";
//     }
//     else if (feature[i].geometry.coordinates[2] > 30) {
//       color = "green";
//     }
//     else {
//       color = "violet";
//     }
  
//     // Add circles to the map.
//     L.circle(feature[i].properties.mag, {
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: color,
//       // Adjust the radius.
//       radius: Math.sqrt(feature[i].properties.mag) * 500
//     }).addTo(myMap);

// }



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


// 2.1 Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude. 
//feature.coordinates.longitude
//feature.coordinates.latitude
//feature.coordinates.depth

// Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by colour.
//
//feature.properties.mag
//
//feature.coordinates.depth



//Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in colour.

// Hint: The depth of the earth can be found as the third coordinate for each earthquake.





// 2.2 Include popups that provide additional information about the earthquake when its associated marker is clicked.






// 2.3 Create a legend that will provide context for your map data.

