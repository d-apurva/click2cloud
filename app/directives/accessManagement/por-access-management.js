angular.module('click2cloud').component('porAccessManagement', {
  templateUrl: 'app/directives/accessManagement/porAccessManagement.html',
  controller: 'porAccessManagementController',
  bindings: {
    accessControlledEntity: '<',
    updateAccess: '&'
  }
});
