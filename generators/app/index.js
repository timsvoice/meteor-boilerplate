'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
    // Make appname required argument
    this.argument('appname', { type: String, required: true });
  }

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the polished ' + chalk.red('generator-meteor-boilerplate') + ' generator!'
    ));    

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What would you like to call your app?',
      default: this.appname
    },{
      type: 'confirm',
      name: 'airbnbEslint',
      message: 'Would you like to configure this project with the AirBnB ESLint module?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someAnswer;
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
