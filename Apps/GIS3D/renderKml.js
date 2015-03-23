/*global define*/
define(['Cesium/DataSources/KmlDataSource'],
        function(kmlDataSource){
          "use strict";

          function renderKml(viewer,data){
              if(data.type === 'kml'){
                  console.log('reading a kml file');
                  viewer.homeButton.viewModel.command();
                  viewer.dataSources.add(kmlDataSource.load(data.path));
                  /*var promise = kmlDataSource.load(data.path);
                  promise.then(function(dataSource){
                      viewer.homeButton.viewModel.command();
                      viewer.dataSource.add(dataSource);
                      viewer.zoomTo(dataSource);
                  });*/
              }
              else{
                  console.log('Not a kml\n');
              }
          }
          return renderKml;

});