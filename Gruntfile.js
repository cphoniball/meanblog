module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			styles: {
				files: 'client/assets/sass/*.sass', 
				tasks: ['sass']
			}
		},
		sass: {
			main: {
				files: {
					'client/assets/css/main.css': 'client/assets/sass/main.sass'
				}
			}
		},
		nodeunit: {
			options: {
				reporter: 'verbose'
			},
			server: ['test/server/*.js']
		}
	}); 

	grunt.loadNpmTasks('grunt-contrib-nodeunit'); 
	grunt.loadNpmTasks('grunt-contrib-sass'); 
	grunt.loadNpmTasks('grunt-contrib-watch'); 

	grunt.registerTask('test', ['nodeunit']); 
	grunt.registerTask('default', ['watch']); 
};
