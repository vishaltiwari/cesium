/*global define*/
define([
        'Cesium/Widgets/Viewer/Viewer',
        'Cesium/Scene/OpenStreetMapImageryProvider',
        'Cesium/Widgets/CesiumWidget/CesiumWidget',
        'Cesium/Widgets/CesiumInspector/CesiumInspector',
        'Cesium/Widgets/Viewer/viewerCesiumInspectorMixin',
        'FileData',
        'renderShapefile',
        'renderGeoJson',
        'renderKml'
        ], function(
            Viewer,
            OpenStreetMapImageryProvider,
            CesiumWidget,
            CesiumInspector,
            viewerCesiumInspectorMixin,
            data,
            renderShapefile,
            renderGeoJson,
            renderKml){
           "use strict";

           var viewer = new Viewer('cesiumContainer',{
               imageryProvider : new OpenStreetMapImageryProvider({
                   url : '//a.tile.openstreetmap.org/'
               }),
               baseLayerPicker : false,
               timeline : false,
               animation : false
           });
           viewer.extend(viewerCesiumInspectorMixin);

           if(data.type === 'shp'){
               renderShapefile(viewer,data);
           }
           else if(data.type === 'geojson'){
               console.log('Its a geojson object\n');
               renderGeoJson(viewer,data);
           }
           else if(data.type === 'kml'){
               console.log('its a mkl/kmz file');
               renderKml(viewer,data);
           }
});