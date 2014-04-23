// angular post controller
function PostCtrl($scope, $resource) {
	var Post = $resource('http://localhost:1337/posts');
	
	$scope.posts = Post.get(function(response) {
		$scope.posts = response; 
	});
}

// var Post = $resource('http://localhost:1337/posts');

// var posts = Post.get(); 

// console.log(posts);