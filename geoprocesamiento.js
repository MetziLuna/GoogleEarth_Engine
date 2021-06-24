//Adds municipalities of El Salvador layer
var municipios = ee.FeatureCollection('users/maguilar/municipios');
var lagos = ee.FeatureCollection('users/maguilar/lagoA_WGS_1984');

Map.setCenter(-89.191389, 13.698889,9);
Map.addLayer(municipios, {color:'BD6F5E'}, 'Municipios');
Map.addLayer(lagos, {color: 'blue'}, 'Lagos');

var getCentroids = function(feature) {
  return feature.set({polyCent: feature.centroid()});
};

function performMap(feature) {
 // Reduce number of vertices in geometry; the number is to specify maximum
 // error in meters. This is only for illustrative purposes, since Earth Engine
 // can handle up to 1 million vertices.
 var simple = feature.simplify(10000);
 // Find centroid of geometry.
 var center = simple.centroid();
 // Return buffer around geometry; the number represents the width of buffer,
 // in meters.
 return center.buffer(200);
}
// Map function over feature collection.
var mappedCentroid = municipios.map(performMap);
// Add the layer to the map with a specified color and layer name.
Map.addLayer(mappedCentroid, {color: 'black'}, 'Mapped buffed centroids');
// Compute the intersection, display it in green.
var poly1 = municipios.geometry();
var poly2 = lagos.geometry();
var intersection = poly1.intersection(poly2, ee.ErrorMargin(1));
Map.addLayer(intersection, {color: '00FF00'}, 'intersection');

// Compute symmetric difference, display in black.
var symDiff = poly1.symmetricDifference(poly2, ee.ErrorMargin(1));
Map.addLayer(symDiff, {color: '000000'}, 'symmetric difference');

// Export the FeatureCollection to a KML file.
Export.table.toDrive({
 collection: mappedCentroid,
  description:'centroides',
  fileFormat: 'KML'
});
