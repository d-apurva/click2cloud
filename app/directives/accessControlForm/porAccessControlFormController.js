angular.module('click2cloud')
.controller('porAccessControlFormController', ['$q', 'UserService', 'Notifications', 'Authentication', 'ResourceControlService',
function ($q, UserService, Notifications, Authentication, ResourceControlService) {
  var ctrl = this;

  ctrl.availableTeams = [];
  ctrl.availableUsers = [];

  function setOwnership(resourceControl, isAdmin) {
    if (isAdmin && resourceControl.Ownership === 'private') {
      ctrl.formData.Ownership  = 'restricted';
    } else {
      ctrl.formData.Ownership  = resourceControl.Ownership;
    }
  }

  function setAuthorizedUsersAndTeams(authorizedUsers, authorizedTeams) {
    angular.forEach(ctrl.availableUsers, function(user) {
      var found = _.find(authorizedUsers, { Id: user.Id });
      if (found) {
        user.selected = true;
      }
    });

    angular.forEach(ctrl.availableTeams, function(team) {
      var found = _.find(authorizedTeams, { Id: team.Id });
      if (found) {
        team.selected = true;
      }
    });
  }

  function initComponent() {
    $('#loadingViewSpinner').show();

    var userDetails = Authentication.getUserDetails();
    var isAdmin = userDetails.role === 1 ? true: false;
    ctrl.isAdmin = isAdmin;

    if (isAdmin) {
      ctrl.formData.Ownership = 'administrators';
    }

    $q.all({
      availableTeams: UserService.userTeams(userDetails.ID),
      availableUsers: isAdmin ? UserService.users(false) : []
    })
    .then(function success(data) {
      ctrl.availableUsers = data.availableUsers;

      var availableTeams = data.availableTeams;
      ctrl.availableTeams = availableTeams;
      if (!isAdmin && availableTeams.length === 1) {
        ctrl.formData.AuthorizedTeams = availableTeams;
      }

      return $q.when(ctrl.resourceControl && ResourceControlService.retrieveOwnershipDetails(ctrl.resourceControl));
    })
    .then(function success(data) {
      if (data) {
        var authorizedUsers = data.authorizedUsers;
        var authorizedTeams = data.authorizedTeams;
        setOwnership(ctrl.resourceControl, isAdmin);
        setAuthorizedUsersAndTeams(authorizedUsers, authorizedTeams);
      }
    })
    .catch(function error(err) {
      Notifications.error('Failure', err, 'Unable to retrieve access control information');
    })
    .finally(function final() {
      $('#loadingViewSpinner').hide();
    });
  }

  initComponent();
}]);
