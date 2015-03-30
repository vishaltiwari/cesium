/*global define*/
define(['require',
        'Cesium/Core/GeometryInstance',
        'Cesium/Core/WallGeometry',
        'Cesium/Scene/MaterialAppearance',
        'Cesium/Core/Cartesian3',
        'Cesium/Scene/Material',
        'Cesium/Scene/Primitive',
        //'createWallID',
        'FileData'],
        function(require,
                GeometryInstance,
                WallGeometry,
                MaterialAppearance,
                Cartesian3,
                Material,
                Primitive,
          //      createwallID,
                data){
        "use strict";
        //create the wall
        function createBuildings(viewer){
            var scene = viewer.scene;
            console.log('creating walls now');
            require(['createWallID'],function(promise){
                promise.then(function(walls){
                    //call the textureTagging function.
                    require(['textureTagging'],function(createTextureWallMap){
                        /*promise.then(function(createTextureWallMap){
                            console.log('Inside the returned promise');
                            createTextureWallMap(walls.arr);
                        });*/
                        createTextureWallMap(walls.arr);
                    });
                    console.log(walls.arr);
                    /*
                    console.log('Rendering buildings now!!!');
                    for(var i=0 ; i<walls.arr.length ; i++){
                        //console.log(walls.arr[i]);
                        // start and end coords of the walls

                        var x1 = walls.arr[i].startCoords[0];
                        var y1 = walls.arr[i].startCoords[1];
                        var x2 = walls.arr[i].endCoords[0];
                        var y2 = walls.arr[i].endCoords[1];
                        var h = 3.5 * walls.arr[i].height;
                        //get the height of each wall from its polygon
                        scene.primitives.add(new Primitive({
                            geometryInstances : new GeometryInstance({
                                geometry : new WallGeometry({
                                    positions : Cartesian3.fromDegreesArrayHeights([
                                        x1, y1, h,
                                        x2, y2, h
                                    ]),
                                    vertexFormat : MaterialAppearance.MaterialSupport.TEXTURED.vertexFormat
                                })
                            }),
                            appearance : new MaterialAppearance({
                                material : new Material({
                                    fabric : {
                                        type : 'Image',
                                        uniforms : {
                                            //need to change the url for the coresponding wall ID
                                            image : 'images/Cesium_Logo_Color.jpg'
                                        }
                                    }
                                 }),
                                materialSupport : MaterialAppearance.MaterialSupport.TEXTURED
                            })
                        }));

                    }*/
                });
            });
        }
        return createBuildings;

});