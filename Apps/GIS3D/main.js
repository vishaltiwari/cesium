/*global require*/
require({
    baseUrl : './modules',
    paths : {
        domReady : '../../../ThirdParty/requirejs-2.1.9/domReady',
        Cesium : '../../../Source',
        js: '../js'
        //shp : '../js/shp.min.js'
    }
}, ['LoadFileFormat'], function() {
    //load the scripts(they will be functions) like this:
    // myfunction.js : define(['Cesium/core/define','shp'],function(define,shp)
    //   { Do something here, or return something to this});
    // require([myfunction]);
});