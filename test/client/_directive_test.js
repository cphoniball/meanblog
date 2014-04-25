describe('Hello World', function() { // define a test suite, or a group of specs.. specs are testing individual components 
	
	var element; 
	var $scope; 

	beforeEach(module('meanblog')); // inject module before each test
	beforeEach(inject(function($compile, $rootScope) { // runs before each spec in the suite - note you can next these 
		$scope = $rootScope; 
		element = angular.element("<div eh-simple>{{2 + 2}}</div>"); 
		element = $compile(element)($rootScope); 
	})); 

	it('should equal 4', function() { // this is a spec 
		$scope.$digest(); 
		expect(element.html()).toBe('4'); 
	}); 

	describe('ehSimple', function() {
		it('should add a class of plain', function() {
			expect(element.hasClass('plain')).toBe(true); 
		});
	}); 	
}); 

