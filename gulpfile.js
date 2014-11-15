var gulp = require('gulp')
	, jshint = require('gulp-jshint')
	, gutil = require('gulp-util')
	, path = require('path')
	, uglify = require('gulp-uglify')
	, concat = require('gulp-concat')
	, karma = require('gulp-karma')
	;	


/////////////////////>	Configuration

/**
 *	List of all the libs packages with their information
 *	Each entry in the array represent a package.
 *	This represent a standard situation, don't hesitate 
 *	to add or remove a package to reflect the application
 *	
 *	Each group have the following parameters:
 *	@param name <String> The name of the group. It will be used to name the generated output
 *	@param output <String> The path where to store the finale compressed output
 *	@param sourceMap <Boolean> Output the sourcemap or not (only in development).
 *	@param lint <Boolean> Lint the library.
 *	@param build <String> How to build the librairies. Available values: uglify, concat
 *	@param watch <String> or <Array> Lint the code.
 *	@param src <String> or <Array> List of all the file to include in the package
 **/
var libs = {
	name:				"klr",
	output:				"min/",
	sourceMap:			true,
	lint:				true,
	build:				'uglify',
	watch:				'src/**/*.js',
	src:				
	[
						 'src/klr.js'
						,'src/convertor/Abstract*.js'
						,'src/convertor/**/*.js'
	]
}

/**
 *	List all the jasmine tests
 *
 *	Each group have the followin parameters:
 *
 *	@param src <String> | <Array> list of the files to includes in the tests
 *
 **/
var tests ={
	src:
	[
						 'min/klr.min.js'
						,'tests/**.js'
	]
}

/////////////////////>	Tasks

///////////> Utils

/**
 *	Lint the libraries to detect flaws
 **/
gulp.task('lint', function()
{
	if ( !libs.lint || libs.lint == false )
		return;

	return gulp.src( libs.src )
				.pipe( jshint({strict:true}) )
				.pipe( jshint.reporter('default') )
	;
});

/**
 *	Test the library
 **/
gulp.task('test', function() 
{
  return gulp
  				.src( tests.src )
			    .pipe(
			    	karma({
			      		configFile: 'karma.conf.js',
			      		action: 'run'
			    	})
			    )
			    .on('error', function(err) {
			      // Make sure failed tests cause gulp to exit non-zero
			      throw err;
			    });
});

///////////> Dev

/**
 *	Process the javascript groups in the configuration section
 *	- concat the files
 *	- generate the sourcemap
 **/
gulp.task('libs.dev', [], function()
{
	map = libs.sourceMap == undefined ? false : libs.sourceMap;
	filename = libs.name+'.min.js';

	gulp.src( libs.src )
		.pipe( jshint() )
		.pipe( jshint.reporter('default') )
	    .pipe( uglify({ outSourceMap:map }) )
	   	.pipe( concat(filename) )
	   	.pipe( gulp.dest(libs.output) );		
});

/**
 *	Developpement mode 
 *
 *	- build the scripts (for dev)
 *	- Watch for changed to build the scripts and/or the styles
 **/
gulp.task('dev', ['libs.dev'], function ()
{
	if (libs.watch)
	{
		gutil.log( '[watch] [libs]' + libs.watch );
		gulp.watch(libs.watch, ['libs.dev', 'test']).on('change', function(file)
		{
			console.log( 'file changed %s', file.path );
		});
	}
});

///////////> Distribution

/**
 *	Process the javascript groups in the configuration section
 *	- concat all the libraries
 *	- uglify the concatenated files
 **/
gulp.task('libs', ['lint'], function()
{
	map = libs.sourceMap == undefined ? false : libs.sourceMap;

	gulp.src( libs.src )
     	.pipe( concat(libs.name+'.js') )
     	.pipe( uglify({}) )
     	.pipe( gulp.dest(libs.output) );
});

/**
 *	Prepare the project for distribution
 *	- launch the libs task
 *	- launch the styles task
 **/
gulp.task('dist', ['libs']);

/**
 *	Alias for the distribution
 **/	
gulp.task('prod', ['dist']);

///////////> Doc

gulp.task('default', function()
{
	console.log( 'Gulp build script for frontend development' );
	console.log( 'Version: 1.3' );
	console.log( '' );
	console.log( 'Available tasks:' );
	console.log( '' );
	console.log( ' gulp dev \t\t This is the task to launch on development, it will build the styles (for dev), build the scripts (for dev), Watch for changed to build the scripts and/or the styles' );
	console.log( ' gulp libs.dev \t\t Process the libraries groups in the configuration section, concat the files, uglify the files, generate the sourcemap' );
	console.log( '' );
	console.log( ' gulp dist \t\t This will build the scripts.min.js and the styles.css, based on the configuration on the top of the gulpfile.js. All the files will be minified and compressed.' );
	console.log( ' gulp libs \t\t Process the libraries groups in the configuration section, concat the files, ugligy the files' );
	console.log( '' );
});
