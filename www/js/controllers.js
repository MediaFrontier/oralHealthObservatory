angular.module('starter.controllers', ['ngSanitize'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $sce) {

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


//import questions from JSON service
.controller('QuestionsCtrl', function($scope, $http, $localStorage, $sessionStorage) {

  $http.get('http://fdi.mediafrontier.ch.php56-30.ord1-1.websitetestlink.com/v2/node/ff548a09-089f-4289-8419-f76492f69e0a')
    .success(function(data, status, headers, config){
      console.log('data success');
      console.log(data); // for browser console, outputs all data from JSON
      $scope.result = data.webform.components; // for UI, outputs only the COMPONENTS object from JSON
      $scope.allanswers = [];
      $scope.answerandkey = [];
      $scope.appquestionnaire = [];
      console.log($scope.appquestionnaire); //Parsed JSON for use in template
      // for each question, split the "items" string into separate values

    angular.forEach($scope.result, function(value){
        if(value.type == "select") {
        $scope.allanswers.push (value.extra.items.split('\r\n'));
        }
        else { $scope.allanswers.push ("N");
        }
   });

   //Split the answers a second time by "|" and creates array of cid followed by answers and keys in index order
   for (var itemIndex = 0; itemIndex < $scope.allanswers.length; itemIndex++) {
         var itemSetValues = $scope.allanswers[itemIndex];

         for (var setItemIndex = 0; setItemIndex < itemSetValues.length; setItemIndex++){
           if ($scope.allanswers[itemIndex][setItemIndex].length > 1) {
           $scope.answerandkey.push (itemIndex,itemSetValues[setItemIndex].split('|') );
         }
            else {
              $scope.answerandkey.push (itemIndex, "N")
            }
         }
   };

   //Creates array of answers with question number, question order/rank and answer with key and value in an array
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

  // var answerIndex = 0; //

   //pull answers and slice into "values" array
   var outputs = []; //empty array to hold answers
   var loopcid = 0; //variable that matches the position of the loop to the values of which the cid's need to be pulled out
   var outputsposition = 0; //position of the start value which corresponds to the cid in the array

   angular.forEach($scope.result, function(value){

      //loop through array by CID , splice process
      var outputslength = outputs.length //the current length of the output

      for (itemIndex = 0; itemIndex < $scope.answerandkey.length; itemIndex++) {


      if ($scope.answerandkey[itemIndex] == loopcid){
      outputs.push($scope.answerandkey[itemIndex+1][1]);
      outputsposition++;
      }

  }

  loopcid++;

      //end splice/loop

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
         values : outputs.slice(outputslength, outputsposition) //the slice of values (answers) for each question
       });
  });

  var questionnaireObject = $scope.appquestionnaire;

  // Put the object into storage
  localStorage.setItem('questionnaireObject', JSON.stringify(questionnaireObject));


  })
    .error(function(data, status, headers, config){
      console.log('connection failed, use local copy');

      // Retrieve the object from storage
      var retrievedObject = localStorage.getItem('questionnaireObject');
      console.log('retrievedObject: ', JSON.parse(retrievedObject));
    })
    .then(function(result){
      things = result.data;
    });

})

.controller('LocalDataCtrl', function($scope, $localStorage, $sessionStorage) {
// logs locally stored data
var retrievedObject = localStorage.getItem('questionnaireObject');
console.log('retrievedObject: ', JSON.parse(retrievedObject));
$scope.retrievedlocalquestionnaire = JSON.parse(retrievedObject);
})


.controller('QuestionTemplateCtrl',[ '$scope', '$sce', function($scope, $localStorage, $sessionStorage, $sce) {

// logs locally stored data
var retrievedObject = localStorage.getItem('questionnaireObject');
$scope.retrievedlocalquestionnaire = JSON.parse(retrievedObject);
console.log($scope.retrievedlocalquestionnaire);


var questionnaire = []; //empty array to hold HTML markup


var localquestionnaire = $scope.retrievedlocalquestionnaire;

//sorts questions by weight as defined by admin in drupal
localquestionnaire.sort(function(a, b) {
    return parseFloat(a.weight) - parseFloat(b.weight);
});
$scope.localquestionnaire = localquestionnaire;
//loops through components and prints html markup

/**
for (questionIndex = 0; questionIndex < $scope.retrievedlocalquestionnaire.length; questionIndex++){
  if (localquestionnaire[questionIndex].type == 'select'){
    var name = '<h1>'+localquestionnaire[questionIndex].name+'</h1>';
    var cid = '<h2>'+localquestionnaire[questionIndex].cid+'</h2>';

    questionnaire.push('<ion-list-item>',name, cid);

    var values = localquestionnaire[questionIndex].values;

    for (questionViewValuesIndex = 0; questionViewValuesIndex < values.length; questionViewValuesIndex++){

      var inputsHTML = '<input type="checkbox" ng-model="localquestionnaire['+questionIndex+'].values"'+
      'ng-true-value="'+values[questionViewValuesIndex]+'"'+'>';

      questionnaire.push(inputsHTML,values[questionViewValuesIndex],'</input>');
    }

    questionnaire.push('</ion-list-item>');


  }
}
  $scope.questionnaire = questionnaire.join('');
  localStorage.setItem('questionnaireHTMLObject', JSON.stringify($scope.questionnaire));
**/


console.log(angular.version);


}]);

/**
.controller('ExampleController', ['$scope', '$sce', function($scope, $sce) {
  var retrievedHTMLObject = localStorage.getItem('questionnaireHTMLObject');
  $scope.retrievedlocalHTMLquestionnaire = JSON.parse(retrievedHTMLObject);

  $scope.snippet = $scope.retrievedlocalHTMLquestionnaire ;
  $scope.deliberatelyTrustDangerousSnippet = function() {
    return $sce.trustAsHtml($scope.snippet);
  };
}])
**/
