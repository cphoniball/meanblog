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
		karma: {
			unit: {
				configFile: 'karma.conf.js'
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
	grunt.loadNpmTasks('grunt-karma'); 

	grunt.registerTask('test-server', ['nodeunit']); 
	grunt.registerTask('test-client', ['karma']); 
	grunt.registerTask('default', ['watch']); 
};
