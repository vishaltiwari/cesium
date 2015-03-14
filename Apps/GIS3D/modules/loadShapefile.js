/*global define*/
define(['Cesium/DataSources/GeoJsonDataSource',
        'js/shp',
        'FileData'
        ],
        function(
          GeoJsonDataSource,
          shp,
          fileData){
    "use strict";

    var dataSource = new GeoJsonDataSource();
    //viewer.dataSources.add(dataSource);
    if(fileData.type === "shp"){
        var entities;
        shp(fileData.path).then(function(geojson){
            dataSource.load(geojson).then(function(){
                //collection of entites for generic consumption:
                entities = dataSource.entities.values;
            });
        }, function(err){
            console.log('error in loading shapfile'+err);
        });
        return {
            entities : entities,
            dataSource : dataSource
        };
    }
    else{
        console.log("Not a shapfile\n");
    }
});