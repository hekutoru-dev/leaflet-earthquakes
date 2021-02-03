
// Initial setup for the map.
let map = L.map('map').setView([51.505, -0.09], 13);

let mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
let mapboxAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

// Tile layers for the map.
let streetsmap =L.tileLayer(mapboxUrl, {
    attribution: mapboxAttr,
    maxZoom: 8,    
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map);

let lightmap = L.tileLayer(mapboxUrl, {
    attribution: mapboxAttr,
    maxZoom: 8,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY    
});

let darkmap = L.tileLayer(mapboxUrl, {
    attribution: mapboxAttr,
    maxZoom: 8,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY    
});

let satmap = L.tileLayer(mapboxUrl, {
    attribution: mapboxAttr,
    maxZoom: 8,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY    
});

// Create the 2 layers for the 2 datasets: earthquakes and plates.
let earthquakes = new L.LayerGroup();
let plates = new L.LayerGroup();

// Define our map choices.
let baseMaps = {
    "Streets": streetsmap,
    "Light": lightmap,
    "Dark": darkmap,
    "Satellite": satmap
}

// Define layer choices.
let overlays = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": plates
}

// Add the control.
L.control.layers(baseMaps, overlays).addTo(map);


// Read data from USGS web site.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(geodata => {

    // Change style of markers.
    function getStyle(ft) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(ft.properties.mag),
            color: "#000000",
            radius: getRadius(ft.properties.mag),
            weight: 0.3                            
        }
    }

    // Change color by magnitude.
    function getColor(mag) {
        return mag > 5 ? "#ea2c2c" :
            mag > 4 ? "#ea822c" :
            mag > 3 ? "#ee9c00" :
            mag > 2 ? "#eecc00" :
            mag > 1 ? "#d4ee00" : "#98ee00";
    }

    // Change radius by magnitude
    function getRadius(mag) {
        return mag === 0 ? 1 : mag * 3;
    }

    // Create a GeoJSON layer.
    L.geoJSON (geodata, {
        pointToLayer: function(geoPoint, coords) {
            return L.circleMarker(coords);
        },
        style: getStyle,
        onEachFeature: function(ft, layer) {
            layer.bindPopup("<b>Location: </b>" + ft.properties.place + 
                            "<br><b>Magnitude: </b>" + ft.properties.mag)
        }
    }).addTo(earthquakes);   // END L.geoJSON()  

    // Add legend to map.
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function() {

        let div = L.DomUtil.create('div', 'legend');
        let magnitudes = [0, 1, 2, 3, 4, 5];

        // Loop through magnitudes array and add to legend.
        // The squared color is given using CSS style on <i> tag.
        for (let i=0; i < magnitudes.length; i++) {
            div.innerHTML += "<i style='background:" + getColor(magnitudes[i]) + "'></i>" + 
                magnitudes[i] + (magnitudes[i+1] ? ' &ndash; ' + magnitudes[i+1] + "<br>" : " + ");
        }
        return div;
    };    
    legend.addTo(map);

    // Make a call to the geoJSON data of the tectonicplates.
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(platesData => {
        
        L.geoJSON(platesData, {
            color: "purple"
        }).addTo(plates); // END L.geoJSON()
    });

}); // END d3.json read.