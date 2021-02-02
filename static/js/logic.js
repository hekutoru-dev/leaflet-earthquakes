
let mymap = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 10,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(mymap);

// Read data from USGS web site.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(geodata => {

    let earthquakes = geodata.features;
    console.log(earthquakes);
    
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
        style: getStyle
    }).addTo(mymap);

    
    
    


});