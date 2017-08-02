angular.module('click2cloud').component('porImageRegistry', {
  templateUrl: 'app/directives/imageRegistry/porImageRegistry.html',
  controller: 'porImageRegistryController',
  bindings: {
    'image': '=',
    'registry': '='
  }
});
