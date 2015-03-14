/*global define*/
define(['require', 'FileData'],function(require,data){
    "use strict";

    if(data.type === 'shp'){
        require(['loadShapefile'],function(obj){
            return obj;
        });
    }
    else{
        console.log('None of the supported formats\n');
    }

});