var app = angular.module('meanblog', ['ngResource']); 

app.config(['$resourceProvider', function($resourceProvider) { // configure resource factory/provider here

}]); 

app.controller('PostCtrl', function($scope ,$resource) {
	var Posts = $resource('http://localhost:1337/posts/:id', {}, {
		update: {
			method: 'PUT'
		}
	}); 

	$scope.showPosts = false;
	$scope.posts; 

	$scope.loadPosts = function() {
		$scope.posts = 	Posts.query(function() {
			$scope.showPosts = true; 
		});
	};

	$scope.deletePost = function(id) {
		var deletedPost = Posts.delete({id: id}, function() {
			$scope.posts = Posts.query();
		});
	};

	$scope.createPost = function(post) {
		Posts.save({
			title: post.title, 
			content: post.content, 
			tags: post.tags
		}, function() {
			$scope.posts = Posts.query(); 
		}); 
	};
	
}); 