define([
        'Cesium/DataSources/GeoJsonDataSource',
        'Cesium/Core/Color',
        'Cesium/Core/JulianDate',
        'js/shp',
        'js/proj4'
        ], function(
            GeoJsonDataSource,
            Color,
            JulianDate,
            shp,
            proj4
            ){
          "use strict";

          function renderShapefile(viewer,fileData){
              var dataSource = new GeoJsonDataSource();

              if(fileData.type === "shp"){
                  var entities;
                  shp(fileData.path).then(function(geojson){
                      console.log('This is a geojson'+geojson.features[0].geometry.coordinates[0][0][0]);
                          //collection of entites for generic consumption:
                          //console.log('geojson has been loaded by the dataSource');
                          dataSource.load(geojson).then(function() {
                              var entities = dataSource.entities.values;

                              for (var i = 0; i < entities.length; i++) {
                                  var entity = entities[i];

                                  var hierarchyProperty = entity.polygon.hierarchy;
                                  var time=JulianDate.now();
                                  var hierarchy=hierarchyProperty.getValue(time);
                                  var positions = hierarchy.positions;
                                  var color = Color.White;

                                  entity.polygon.material = color;
                                  entity.polygon.fill=true;
                                  entity.polygon.outlineColor = Color.BLACK;

                                  //Attribute for the height:
                                  entity.polygon.extrudedHeight = 3.5*entity.properties.Stories;
                                  //entity.polygon.extrudedHeight = 3.5*entity.properties.HT_RANDOM;
                              }
                          });
                          viewer.dataSources.add(dataSource);
                          viewer.zoomTo(dataSource);
                  }, function(err){
                      console.log('error in loading shapfile'+err);
                  });
              }
              else{
                  console.log("Not a shapfile\n");
              }
          }
          return renderShapefile;
});