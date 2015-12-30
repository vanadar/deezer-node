module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nwjs:{
            options: {
                platforms: ['linux'],
                buildDir: './bin',
                // must write the version (its not using the one given in the package.json but a pre-release)
                version: 'v0.12.3'
            },
            src: ['package.json', './src/**/*', 'node_modules/**/**']
        }
    });

    // Load the plugin that provides the "gyp" task.
    grunt.loadNpmTasks('grunt-nw-gyp');

    // Load the plugin that provides the "nwjs" task.
    grunt.loadNpmTasks('grunt-nw-builder');

    grunt.registerTask('default', ['nwjs']);
};