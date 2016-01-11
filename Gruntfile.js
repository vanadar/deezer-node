module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nwjs:{
            options: {
                platforms: ['linux'],
                buildDir: './build',
                // must write the version (its not using the one given in the package.json but a pre-release)
                version: 'v0.12.3'
            },
            src: ['package.json', './src/**', 'node_modules/**',
                '!./node_modules/*grunt*/**', '!./node_modules/nw-builder/**', '!./node_modules/node-pre-gyp/**',
                '!./node_modules/**/*.bin',
                '!./node_modules/**/*.c', '!./node_modules/**/*.h',
                '!./node_modules/**/Makefile', '!./node_modules/**/*.h',
                '!./**/test*/**', '!./**/doc*/**', '!./**/example*/**',
                '!./**/demo*/**', '!./**/bin/**', '!./**/build/**', '!./**/.*/**',
            ]
        }
    });

    // Load the plugin that provides the "gyp" task.
    //grunt.loadNpmTasks('grunt-nw-gyp');

    // Load the plugin that provides the "nwjs" task.
    grunt.loadNpmTasks('grunt-nw-builder');

    grunt.registerTask('default', ['nwjs']);
};