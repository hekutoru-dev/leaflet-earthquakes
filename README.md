# Seismic Activity with Leaflet
Visualization of recent earthquakes using Leaflet


### Level 1: Basic Visualization

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. The data is extracted from the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page. The selected data is from 'All Earthquakes from the Past 7 Days', a JSON representation of that data. D3 is used to make a call to the URL and pull the data into the visualization.

1. **Visualizing the Data**

Using Leaflet a map is created to plots all of the earthquakes from the pulled data set based on their longitude and latitude.

   * Markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

   * Popups are included to provide additional information about the earthquake when a marker is clicked.

   * A legend is also created to provide context for the map data.

To read the GeoJSON data the [Leaflet GeoJSON](https://leafletjs.com/reference-1.7.1.html#geojson) reference will be very helpful.


### Level 2: Multiple Layer Data: Tectonic Plates

Two data sets are plotted on the map to illustrate the relationship between tectonic plates and seismic activity. The data is pulled from data on tectonic plates can be found at [Tectonic Plates](https://github.com/fraxen/tectonicplates).


* Different map styles are used on this excersise 

* Layer controls are also included in the map.

To group several layers into one, and how to use the layers control to allow users to easily switch different layers on your map, it may be helpful to follow the suggestions in [Leaflet Layer Groups](https://leafletjs.com/examples/layers-control/)
