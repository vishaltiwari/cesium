/*global define*/
define(['require',
        'Cesium/Scene/TileMapServiceImageryProvider',
        'Cesium/Widgets/Viewer/Viewer',
        'Cesium/Widgets/Viewer/viewerCesiumInspectorMixin',
        'Cesium/Scene/OpenStreetMapImageryProvider',
        'Cesium/Core/Color',
        'Cesium/Core/JulianDate',
        'Cesium/Core/CesiumTerrainProvider'
        ], function(
                require,
            TileMapServiceImageryProvider,
            Viewer,
            viewerCesiumInspectorMixin,
            OpenStreetMapImageryProvider,
            Color,
            JulianDate,
            CesiumTerrainProvider){
           "use strict";

           var viewer = new Viewer('cesiumContainer',{
               imageryProvider : new OpenStreetMapImageryProvider({
                   url : '//a.tile.openstreetmap.org/'
               }),
               baseLayerPicker : false
           });
           /*
           require(['LoadFileData'],function(obj){

               var dataSource = obj.dataSource;
               var entities = obj.entities;

               for (var i = 0; i < entities.length; i++) {
                   var entity = entities[i];

                   var hierarchyProperty = entity.polygon.hierarchy;
                   var time=JulianDate.now();
                   var hierarchy=hierarchyProperty.getValue(time);

                   var positions = hierarchy.positions;

                   //print the cartesian3d:
                   /*
                   for(var j=0 ; j<positions.length ; j++){
                       console.log(positions[j].x + ' ' + positions[j].y + ' ' + positions[j].z);
                   }*/
                   //console.log(hierarchy);
/*
                   var color = Color.White;

                   entity.polygon.material = color;
                   entity.polygon.fill=true;
                   entity.polygon.outlineColor = Color.BLACK;

                   //Attribute for the height:
                   entity.polygon.extrudedHeight = 3.5*entity.properties.Stories;
                   //entity.polygon.extrudedHeight = 3.5*entity.properties.HT_RANDOM;
               }

               viewer.dataSources.add(dataSource);
               viewer.zoomTo(dataSource);

           });*/
});