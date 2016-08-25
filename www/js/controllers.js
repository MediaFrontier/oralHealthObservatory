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
      $scope.allanswers = [];
      $scope.answerandkey = [];
      $scope.jsoncounter = [];
      $scope.appquestionnaire = [];
      console.log($scope.allanswers);
      console.log($scope.answerandkey);
      console.log($scope.jsoncounter);
      console.log($scope.appquestionnaire);
      // for each question, split the "items" string into separate values

    angular.forEach($scope.result, function(value){
        if(value.type == "select") {
        $scope.allanswers.push (value.extra.items.split('\r\n'));
        }
        else { $scope.allanswers.push ("N");
        }


   });




   for (var itemIndex = 0; itemIndex < $scope.allanswers.length; itemIndex++) {
         var itemSetValues = $scope.allanswers[itemIndex];

         for (var setItemIndex = 0; setItemIndex < itemSetValues.length; setItemIndex++){
           if ($scope.allanswers[itemIndex][setItemIndex].length > 1) {
           $scope.answerandkey.push (itemIndex,itemSetValues[setItemIndex].split('|') );
         }
            else {
              $scope.answerandkey.push (itemIndex, "N")
            }

           //Creates array of answers with question number, question order/rank and answer with key and value in an array
         }
   };


   var cid = 'cid'; //Component id, unique identifier for each questionnaire component
   var weight = 'weight'; //The order in which each component should appear in
   var form_key = 'form_key'; //machine-readable name for question
   var type = 'type'; //Type of question ie. select, number
   var values = 'values'; //blank array, where the user input will write to
   var name = 'name'; //Question text
   var pid = 'pid'; //Identifier for components that are part of a fieldset
   var nid = 'nid'; //Conditional identifier from drupal
   var min = 'min'; //If the question type is a number, minimum value allowed for user input
   var max = 'max'; //If the question type is a number, maximum value allowed for user input
   var multiple = 'multiple'; //Whether or not multiple selections are allowed

   var answerIndex = 0;

   angular.forEach($scope.result, function(value){

      /** loop through array by CID , needs splice process

      var array = [0,["male", "Male"],0,["female","Female"],1,["y","Y"],1,["n","N"]];

      var outputs = [];

      var loopcid = 1;

      for (itemIndex = 0; itemIndex < array.length; itemIndex++) {

      if (array[itemIndex] == loopcid){
      outputs.push(array[itemIndex+1][1]);
      }

      **/

       $scope.appquestionnaire.push ({
         name : value.name,
         weight : value.weight,
         pid : value.pid,
         nid : value.nid,
         min : value.extra.min,
         max : value.extra.max,
         multiple : value.extra.multiple,
         form_key : value.form_key,
         cid : value.cid,
         type : value.type,
         values : []
       });


  });

  for (var answerIndex = 0; answerIndex < $scope.answerandkey.length; answerIndex++){

    var answerSetValue = $scope.answerandkey[answerIndex + 1];
    if ($scope.answerandkey[answerIndex].length = 1){

      for (var answerItemIndex = 0; answerItemIndex < answerSetValue.length; answerItemIndex++){
        answerSetValue[2].push ($scope.appquestionnaire[1]);
      }
    }
  }


/**
$scope.jsonquestionsclean = data;

angular.forEach($scope.jsonquestionsclean.webform.components, function(value){
    $scope.jsoncounter.push (1);
});

for (var jsonIndex = 0; jsonIndex < $scope.jsoncounter.length; jsonIndex++) {
   delete $scope.jsonquestionsclean.webform.components[jsonIndex + 1].extra.items;
};

**/

/** FIND A WAY TO WRITE TO OBJECT IN JSON
for (var insertIndex = 0; insertIndex < $scope.answerandkey.length; insertIndex++) {
  if ($scope.answerandkey[insertIndex].length = 1) {

  }

};
**/

console.log($scope.jsonquestionsclean);

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
