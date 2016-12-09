module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({

        clean: ["dist"],

        babel: {
            options: {
                sourceMap: false,
                modules: "common"
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['**/*.js'],
                    dest: 'dist/src',
                    ext:'.js'
                }]
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