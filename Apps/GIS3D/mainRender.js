/*global define*/
define([
        'Cesium/Widgets/Viewer/Viewer',
        'Cesium/Scene/OpenStreetMapImageryProvider',
        'Cesium/Widgets/CesiumWidget/CesiumWidget',
        'Cesium/Widgets/CesiumInspector/CesiumInspector',
        'Cesium/Widgets/Viewer/viewerCesiumInspectorMixin',
        'createBuildings'
        ], function(
            Viewer,
            OpenStreetMapImageryProvider,
            CesiumWidget,
            CesiumInspector,
            viewerCesiumInspectorMixin,
            createBuildings){
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

           createBuildings(viewer);
           console.log('done rendering buildings');

});