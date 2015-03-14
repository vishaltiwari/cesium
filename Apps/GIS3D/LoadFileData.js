/*global define*/
define(['require', 'FileData','loadShapefile'],function(require,data,loadShapefile){
    "use strict";

    console.log('It has gone in this modules\n');
    console.log('data: type: ' + data.type + ' path: ' + data.path );
    if(data.type === 'shp'){
        var obj = loadShapefile(data);
        console.log('object returned by loadshp function '+obj);
        return obj;
        /*define(['loadShapefile'],function(obj){
            console.log('This is in loadShapefile'+obj);
            return obj;
        });*/
    }
    else{
        console.log('None of the supported formats\n');
    }

});