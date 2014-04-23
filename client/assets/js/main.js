var app = angular.module('meanblog', ['ngResource']); 

app.controller('PostCtrl', function($scope) {
	$scope.posts = 'Here is a post listing sample'; 
}); 