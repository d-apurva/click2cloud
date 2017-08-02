angular.module('click2cloud').component('porServiceList', {
  templateUrl: 'app/directives/serviceList/porServiceList.html',
  controller: 'porServiceListController',
  bindings: {
    'services': '<',
    'nodes': '<'
  }
});
