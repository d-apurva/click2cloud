angular.module('click2cloud').component('porTaskList', {
  templateUrl: 'app/directives/taskList/porTaskList.html',
  controller: 'porTaskListController',
  bindings: {
    'tasks': '<',
    'nodes': '<'
  }
});
