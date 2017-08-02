angular.module('click2cloud').component('porContainerList', {
  templateUrl: 'app/directives/containerList/porContainerList.html',
  controller: 'porContainerListController',
  bindings: {
    'containers': '<'
  }
});
