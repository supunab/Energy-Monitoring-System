module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({

        clean: ["dist"],

        babel: {
            options: {
                sourceMap: true,
                modules: "common"
            },
            dist: {
                files: {
                    "middleware/*.js": "dist/middleware",
                    "model/*.js": "dist/model",
                    "orm/*.js": "dist/orm",
                    "./*.js": "dist/",
                    "tests/*.js": "dist/tests",
                    $FilePathRelativeToProjectRoot$ --out - dir dist --source - maps--presets es2015
                }
            },
            distSpecs: {
                files: [{
                    expand: true,
                    cwd: 'spec',
                    src: ['**/*.js'],
                    dest: 'dist/spec',
                    ext:'.js'
                }]
            }
        },

    });

    grunt.registerTask('default', ['clean']);
};