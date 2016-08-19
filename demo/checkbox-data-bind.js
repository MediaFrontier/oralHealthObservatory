<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Example - example-checkbox-input-directive-production</title>


  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>



</head>
<body ng-app="checkboxExample">
  <script>
  angular.module('checkboxExample', [])
    .controller('ExampleController', ['$scope', function($scope) {
      $scope.checkboxModel = {
       value1 : true,
       value2 : ''
     };
    }]);
</script>
<form name="myForm" ng-controller="ExampleController">

  <label>Value2:
    <input type="checkbox" ng-model="checkboxModel.value2"
           ng-true-value="'item'" ng-false-value="''">
   </label><br/>

  <tt>Key2 = {{checkboxModel.value2}}</tt><br/>
 </form>
</body>
</html>

<!--
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
-->
