module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		nodeunit: {
			server: ['test/server/*.js']
		}
	}); 

	grunt.loadNpmTasks('grunt-contrib-nodeunit'); 
	grunt.loadNpmTasks('grunt-contrib-watch'); 

	grunt.registerTask('test', ['nodeunit']); 
	grunt.registerTask('default', ['nodeunit']); 
};
