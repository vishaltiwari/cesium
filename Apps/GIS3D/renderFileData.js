/*global define*/
define([
        'Cesium/Widgets/Viewer/Viewer',
        'Cesium/Scene/OpenStreetMapImageryProvider',
        'FileData',
        'renderShapefile',
        'renderGeoJson'
        ], function(
            Viewer,
            OpenStreetMapImageryProvider,
            data,
            renderShapefile){
           "use strict";

           var viewer = new Viewer('cesiumContainer',{
               imageryProvider : new OpenStreetMapImageryProvider({
                   url : '//a.tile.openstreetmap.org/'
               }),
               baseLayerPicker : false
           });

           if(data.type === 'shp'){
               renderShapefile(viewer,data);
           }
           if(data.type === 'geojson'){
               renderGeoJson(viewer,data);
           }
});