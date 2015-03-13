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
        'Cesium/Core/JulianDate',
        'Cesium/Core/CesiumTerrainProvider',
        'js/shp',
        'js/proj4',
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
        JulianDate,
        CesiumTerrainProvider,
        shp,
        proj4
        ) {
    "use strict";

    try{
        var viewer = new Viewer('cesiumContainer',{
            imageryProvider : new OpenStreetMapImageryProvider({
                url : '//a.tile.openstreetmap.org/'
            }),
            baseLayerPicker : false
        });

        var terrainProvider = new CesiumTerrainProvider({
            url : '//assets.agi.com/stk-terrain/world',
            requestWaterMask: true
        });

        viewer.terrainProvider = terrainProvider;

        var dataSource = new GeoJsonDataSource();
        viewer.dataSources.add(dataSource);

        GeoJsonDataSource.crsNames['EPSG:32245'] = function(coordinates){
            //Define the projections system:

            //var firstProjection = 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]';
            //var secondProjection = 'PROJCS["WGS_72_UTM_zone_45N",GEOGCS["GCS_WGS 72",DATUM["D_WGS_1972",SPHEROID["WGS_1972",6378135,298.26]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",87],PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],UNIT["Meter",1]]';


            //var secondProjection = 'PROJCS["NAD83 / Massachusetts Mainland",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",42.68333333333333],PARAMETER["standard_parallel_2",41.71666666666667],PARAMETER["latitude_of_origin",41],PARAMETER["central_meridian",-71.5],PARAMETER["false_easting",200000],PARAMETER["false_northing",750000],AUTHORITY["EPSG","26986"],AXIS["X",EAST],AXIS["Y",NORTH]]';
            //var secondProjection = "+proj=gnom +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";

            var firstProjection = 'PROJCS["WGS_72_UTM_zone_45N",GEOGCS["GCS_WGS 72",DATUM["D_WGS_1972",SPHEROID["WGS_1972",6378135,298.26]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",87],PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],UNIT["Meter",1]]';

   //         var firstProjection = '+proj=utm +zone=45 +ellps=WGS72 +towgs84=0,0,4.5,0,0,0.554,0.2263 +units=m +no_defs';
            var secondProjection = proj4('EPSG:4326');

            var xa = coordinates[0];
            var ya = coordinates[1];
            console.log('Initial Coordinates ' + coordinates);

            var newCoordinates = proj4(firstProjection,secondProjection,[xa,ya]);
            console.log('New Coordinates' , newCoordinates);

            return newCoordinates;

        };

        console.log(GeoJsonDataSource.crsNames['EPSG:32245']);
        shp('../SampleData/bldg_old.zip').then(function(geojson){
 /*           if(Array.isArray(geojson)){
                console.log('Multiple .shp files');
            }
            else{
                console.log('single file');
            }*/
            //assuming only one .shp in .zip file

            var geojsonObj = geojson.features;

            var convert = GeoJsonDataSource.crsNames['EPSG:32245'];
            convert(geojsonObj[0].geometry.coordinates[0][0]);

            //var xa = geojsonObj[0].geometry.coordinates[0][0][0];
            //var ya = geojsonObj[0].geometry.coordinates[0][0][1];
            //console.log('x: ' + xa);
            //console.log('y: ' + ya);

            //var objNew = proj4(firstProjection,secondProjection,[xa,ya]);
            //console.log('New Coordinates' , objNew);
            //use proj4 to change the coordinates

            for(var k=0 ;k<geojsonObj.length ; k++ ){
                var geom = geojsonObj[k].geometry.coordinates;
                for(var q=0 ; q<geom.length ; q++){
                    for(var p=0 ; p<geom[q].length ; p++){
                        var newCoords = convert(geom[q][p]);
                        geojsonObj[k].geometry.coordinates[q][p] = newCoords;
                    }
                }
                console.log(geom);
            }

            console.log(geojson);

            //var obj = JSON.parse(geojson);
            dataSource.load(geojson).then(function() {
                var entities = dataSource.entities.values;

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

                    var color = Color.White;

                    entity.polygon.material = color;
                    entity.polygon.fill=true;
                    entity.polygon.outlineColor = Color.BLACK;

                    //Attribute for the height:
                    //entity.polygon.extrudedHeight = 3.5*entity.properties.Stories;
                    entity.polygon.extrudedHeight = 3.5*entity.properties.HT_RANDOM;
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
