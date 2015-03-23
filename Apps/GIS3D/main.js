/*global require*/
require({
    baseUrl : '.',
    paths : {
        domReady : '../../ThirdParty/requirejs-2.1.9/domReady',
        Cesium : '../../Source',
        js: './js',
        jquery: ['http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min',
                 './js/jquery.min']
        //shp : '../js/shp.min.js'
    }
}, ['renderFileData'], function() {

    console.log('renderFileData is loaded or has shown error\n');
    //load the scripts(they will be functions) like this:
    // myfunction.js : define(['Cesium/core/define','shp'],function(define,shp)
    //   { Do something here, or return something to this});
    // require([myfunction]);

    //require(['renderFileData']);

});