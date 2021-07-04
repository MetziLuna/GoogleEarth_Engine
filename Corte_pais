#Es necesario subir a los Assets los límites del país previamente en formato shape.
var table = ee.FeatureCollection("users/maguilar/limite_sv");

var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
                  .filter(ee.Filter.date('2019-09-01', '2020-12-31'))
                  .map(function(image){return image.clip(table)});

var nighttime = dataset.select('avg_rad');
var nighttimeVis = {min: 0.0, max: 60.0};
Map.setCenter(-89.191389, 13.698889, 8);
Map.addLayer(nighttime, nighttimeVis, 'Nighttime');
Map.addLayer(table, table, 'Sivar');
