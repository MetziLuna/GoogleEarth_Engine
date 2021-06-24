//Descarga luces nocturnas para un período especificado y hace el corte de país

var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
                  .filter(ee.Filter.date('2019-09-01', '2020-12-31'))
                  .map(function(image){return image.clip(table)});
var table = ee.FeatureCollection("users/maguilar/municipios");
var nighttime = dataset.select('avg_rad');
var nighttimeVis = {min: 0.0, max: 60.0};
Map.setCenter(-89.191389, 13.698889, 8);
Map.addLayer(nighttime, nighttimeVis, 'Nighttime');
Map.addLayer(table, table, 'Municipios');

// Export a cloud-optimized GeoTIFF.
Export.image.toDrive({
  image: nighttime,
  description: 'imageToCOGeoTiffExample',
  scale: 30,
  region: table,
  fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  }
});
