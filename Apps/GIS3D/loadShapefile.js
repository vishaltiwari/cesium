/*global define*/
define(['Cesium/DataSources/GeoJsonDataSource',
        'js/shp',
        ],
        function(
          GeoJsonDataSource,
          shp
          ){
    "use strict";

    function loadshp(fileData){
        console.log('It has gone in loadShapefile as well\n');
        var dataSource = new GeoJsonDataSource();
        //viewer.dataSources.add(dataSource);
        if(fileData.type === "shp"){
            var entities;
            shp(fileData.path).then(function(geojson){
                console.log('This is a geojson'+geojson.features[0].geometry.coordinates[0][0][0]);
                dataSource.load(geojson).then(function(){
                    //collection of entites for generic consumption:
                    console.log('geojson has been loaded by the dataSource');
                    entities = dataSource.entities.values;
                    return {
                        entities : entities,
                        dataSource : dataSource
                    };
                    console.log('This is printed?? suprizing');
                });
            }, function(err){
                console.log('error in loading shapfile'+err);
            });
        }
        else{
            console.log("Not a shapfile\n");
        }
    }
    return loadshp;
});