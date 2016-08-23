angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Questions', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})


//import questions from JSON service
.controller('QuestionsCtrl', function($scope, $http) {
   // this line won't work. See comment

  $http.get('http://fdi.mediafrontier.ch.php56-30.ord1-1.websitetestlink.com/v2/node/ff548a09-089f-4289-8419-f76492f69e0a')
    .success(function(data, status, headers, config){
      console.log('data success');
      console.log(data); // for browser console, outputs all data from JSON
      $scope.result = data.webform.components; // for UI, outputs only the COMPONENTS object from JSON
      // for each question, split the "items" string into separate values
      angular.forEach(data.webform.components, function(value){
            if(value.type == "select")
             console.log(value.extra.items.split('\r\n'));
       })
    })

    .error(function(data, status, headers, config){
      console.log('data error');
    })
    .then(function(result){
      things = result.data;
    });
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
