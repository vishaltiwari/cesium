define(['Cesium/DataSources/GeoJsonDataSource'],function(GeoJsonDataSource){
    "use strict";
    return function(viewer,data){
        var dataSource = new GeoJsonDataSource();
        if(data.type === 'geojson'){
            dataSource.load(data.path).then(function(){
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
        }

    };
});