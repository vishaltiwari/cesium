/*global define*/
define(['js/shp',
        'FileData',
        'lie'],
        function(shp,data,Promise){
    "use strict";
    //This function takes a polygon geojson data, and returns an array of walls.as [{wallId : [lat,log]}].
    //To change the property used for height change in the height variable.
        //important variables
        var count=0;
        var obj= {};
        var wallsArr=[];
        var wall;

        var promise = new Promise(function(resolve,reject){
            if(data.type === 'shp'){
                shp(data.path).then(function(geojson){

                    console.log(geojson);
                    var geojsonObj = geojson.features;

                    console.log(geojsonObj.length);

                    for(var k=0 ;k<geojsonObj.length ; k++ ){
                        var geom = geojsonObj[k].geometry.coordinates;
                        for(var q=0 ; q<geom.length ; q++){
                            for(var p=0 ; p<geom[q].length-1 ; p++){
                                //var newCoords = convert(geom[q][p]);
                                //geojsonObj[k].geometry.coordinates[q][p] = newCoords;
                                //console.log('coordinates are:' + geom[q][p]);

                                //Change here to use the corresponding property for height of wall
                                var height = geojsonObj[k].properties.Stories;
                                wall = {id: count,
                                        height : height,
                                        startCoords : geom[q][p],
                                        endCoords : geom[q][p+1]};

                                //wallsArr[count] = wall;
                                wallsArr.push(wall);
                                //console.log('curr size of arr:',wallsArr.length);
                                ++count;
                            }
                        }
                        //console.log('geom is:' + geom);
                    }
                    //return {'arr': wallsArr};
                    resolve({'arr': wallsArr});
                });
            }
            else{
                reject(Error('Its broken'));
            }
        });
        return promise;
});