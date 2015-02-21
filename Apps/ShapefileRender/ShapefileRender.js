/*global define*/
define([
        'Cesium/Core/defined',
        'Cesium/Core/formatError',
        'Cesium/Core/getFilenameFromUri',
        'Cesium/Core/queryToObject',
        'Cesium/DataSources/CzmlDataSource',
        'Cesium/DataSources/GeoJsonDataSource',
        'Cesium/Scene/TileMapServiceImageryProvider',
        'Cesium/Widgets/Viewer/Viewer',
        'Cesium/Widgets/Viewer/viewerCesiumInspectorMixin',
        'Cesium/Widgets/Viewer/viewerDragDropMixin',
        'Cesium/Scene/OpenStreetMapImageryProvider',
        'Cesium/Scene/ArcGisMapServerImageryProvider',
        'Cesium/Core/Color',
        'js/shp',
        'domReady!'
    ], function(
        defined,
        formatError,
        getFilenameFromUri,
        queryToObject,
        CzmlDataSource,
        GeoJsonDataSource,
        TileMapServiceImageryProvider,
        Viewer,
        viewerCesiumInspectorMixin,
        viewerDragDropMixin,
        OpenStreetMapImageryProvider,
        ArcGisMapServerImageryProvider,
        Color,
        shp) {
    "use strict";

    try{
        var viewer = new Viewer('cesiumContainer',{
            imageryProvider : new OpenStreetMapImageryProvider({
                url : '//a.tile.openstreetmap.org/'
            }),
            baseLayerPicker : false
        });
        var dataSource = new GeoJsonDataSource();
        viewer.dataSources.add(dataSource);

        shp('../SampleData/Vector_data_buildings.zip').then(function(geojson){
 /*           if(Array.isArray(geojson)){
                console.log('Multiple .shp files');
            }
            else{
                console.log('single file');
            }*/
            //assuming only one .shp in .zip file

            console.log(geojson);

            //var obj = JSON.parse(geojson);
            dataSource.load(geojson).then(function() {
                var entities = dataSource.entities.values;

                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    var color = Color.White;

                    entity.polygon.material = color;
                    entity.polygon.fill=true;
                    entity.polygon.outlineColor = Color.BLACK;

                    entity.polygon.extrudedHeight = 3.5*entity.properties.Stories;
                }
            });

            viewer.dataSources.add(dataSource);
            viewer.zoomTo(dataSource);

        }, function(e){
            console.log('error'+e);
        });
        //use geojson to render the files.

        /*var layers = viewer.scene.imageryLayers;
        var blackMarble = layers.addImageryProvider(new TileMapServiceImageryProvider({
            url :  '//cesiumjs.org/tilesets/imagery/blackmarble',
            maximumLevel : 8,
            credit :  'Black Marble imagery courtesy NASA Earth Observatory'
        }));
        blackMarble.alpha = 0.5; // 0.0 is transparent.  1.0 is opaque.
        blackMarble.brightness = 2.0; // > 1.0 increases brightness.  < 1.0 decreases.*/


    }
    catch(err){
        window.alert("oops!!! error occured:" + err);
    }

});