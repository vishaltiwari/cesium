/*global define*/
define([
        'Cesium/Widgets/Viewer/Viewer',
        'Cesium/Scene/OpenStreetMapImageryProvider',
        'Cesium/Widgets/CesiumWidget/CesiumWidget',
        'FileData',
        'renderShapefile',
        'renderGeoJson'
        ], function(
            Viewer,
            OpenStreetMapImageryProvider,
            CesiumWidget,
            data,
            renderShapefile,
            renderGeoJson){
           "use strict";

           var viewer = new Viewer('cesiumContainer',{
               imageryProvider : new OpenStreetMapImageryProvider({
                   url : '//a.tile.openstreetmap.org/'
               }),
               baseLayerPicker : false,
               timeline : false,
               animation : false
           });

           if(data.type === 'shp'){
               renderShapefile(viewer,data);
           }
           if(data.type === 'geojson'){
               console.log('Its a geojson object\n');
               renderGeoJson(viewer,data);
           }
});