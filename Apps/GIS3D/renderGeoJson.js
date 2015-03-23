/*global define*/
define(['Cesium/DataSources/GeoJsonDataSource',
        'Cesium/Core/Color'
        ],
        function(GeoJsonDataSource,
                Color){
    "use strict";
     function renderGeoJson(viewer,data){
        if(data.type === 'geojson'){
          //var dataSource = new GeoJsonDataSource();
            console.log('trying to load:'+data.path);
            var promise = GeoJsonDataSource.load(data.path);
            //viewer.dataSources.add(dataSource);
            //viewer.zoomTo(dataSource);
            promise.then(function(dataSource){
                console.log('geojson file read');
                var entities = dataSource.entities.values;

                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];

                    //var hierarchyProperty = entity.polygon.hierarchy;
                    //var time=JulianDate.now();
                    //var hierarchy=hierarchyProperty.getValue(time);
                    //var positions = hierarchy.positions;
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
            });
        }
        else{
            console.log('Not a geojson file');
        }
    }
     return renderGeoJson;
});