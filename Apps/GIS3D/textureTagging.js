/*global define*/
define(['require',
        'jquery',
        'lie'],
        function(require,
                $,
                Promise){
        "use strict";
    //read the json file.
        function createTextureWallMap(walls){
            console.log('Texture Tagging function is called');
            $.getJSON("./images/data/data4.json",function(data){
                //console.log('This is inside the jquery function');
                //console.log(walls,data);
                //Algo for texture mapping.
                // For each point ray 'r' ./in data find all the walls that intersect
                console.log('walls:',walls,' rays:',data);

                var textureMap = [];
                var rays = data.features;
                for(var i=0 ; i<rays.length ; i++){

                    var direction = rays[i].direction;
                    var filename = rays[i].filename;
                    var x = rays[i].position[0];
                    var y = rays[i].position[1];

                    var flag=0;
                    var min_distance = -1;

                    for(var j=0 ; j<walls.length ; j++){
                        var wall = walls[j];
                        var a1 = wall.startCoords[0];
                        var a2 = wall.startCoords[1];

                        var b1 = wall.endCoords[0];
                        var b2 = wall.endCoords[1];

                        var cos_theta = Math.cos((Math.PI/180) * direction);
                        var sin_theta = Math.sin((Math.PI/180) * direction);

                        var denominator = (b2-a2)*sin_theta - (b1-a1)*cos_theta;

                        var t1 = ((b1-a1)*(y-a2) - (b2-a2)*(x-a1)) /denominator;
                        var t2 = ((x-a1)*cos_theta - (y-a2)*sin_theta) /denominator;

                        //If the ray and wall intersects, push them both to an array.
                        console.log('t1:',t1,' t2:',t2, '  wallid:',wall.id);
                        if(t1 >=0 && t2>=-1 && t2<=1){
                            //calculate the distance:
                            console.log('Yes, a match found');

                            var pointX = x+t1*cos_theta;
                            var pointY = y+t1*sin_theta;

                            console.log('ray origin',x,' ',y);
                            console.log('point of intersection:',pointX,' ',pointY);

                            var distance = Math.sqrt((x-pointX)*(x-pointX) + (y-pointY)*(y-pointY));
                            console.log('distance:',distance);
                            console.log('direction',direction);

                            var obj = {
                                    'rayId' : filename,
                                    'wallId': wall.id,
                                    'distance': distance
                            };

                            if(flag===1){
                                if(distance < min_distance){
                                    min_distance = distance;
                                    textureMap.pop();
                                    textureMap.push(obj);
                                }
                            }
                            else{
                                flag = 1;
                                min_distance = distance;
                                textureMap.push(obj);
                            }
                        }
                        //console.log('final mapped wall:',textureMap[wall.id]);
                    }
                    console.log(' i:',i,'\n\n');
                }
                console.log('Here is the wall to texture map',textureMap);
            }).fail(function(err){
                console.log('Not able to load json',err);
            });
        }
        return createTextureWallMap;
});