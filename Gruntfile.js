var autoprefixer = require('autoprefixer-core');

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		less: {
			dist: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= pkg.name %>.css.map',
					sourceMapFilename: 'dist/<%= pkg.name %>.css.map'
				},
				files: {
					'dist/<%= pkg.name %>.css': 'less/main.less'
				}
			}
		},

		postcss: {
			options: {
				processors: [
					autoprefixer({ browsers: ['last 2 version'] }).postcss
				]
			},
			dist: { src: 'dist/*.css' }
		},

		cssmin: {
			dist: {
				expand: true,
				cwd: 'dist/',
				src: ['*.css', '!*.min.css'],
				dest: 'dist/',
				ext: '.min.css'
			}
		},

		watch: {
			scripts: {
				files: ['**/*.less'],
				tasks: ['less', 'postcss', 'cssmin']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['less', 'postcss', 'cssmin']);
};
