// TODO
// run meteor create this.appname
// need to remove created scaffolding in favor of our own


'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = yeoman.Base.extend({

  builder() {
    yeoman.Base.apply(this, arguments);
    // appname flag
    this.argument('appname', { type: String, required: false });
    // set appname from argument-defined appname or get the path
    this.appname = this.appname || path.basename(process.cwd());
    // standard packages for any meteor app
    this.packages = [
      'meteor-base',
      'mobile-experience',
      'mongo',
      'blaze-html-templates',
      'session',
      'jquery',
      'tracker',
      'standard-minifiers',
      'es5-shim',
      'ecmascript',
      'accounts-password',
      'useraccounts:core',
    ];
  },

  prompting() {
    const done = this.async();
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the polished ${chalk.red('Meteor 1.3 Boilerplate')} generator!`
        )
      );

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Name: What would you like to call your app?',
      default: this.appname,
    }, {
      type: 'list',
      name: 'rendering',
      message: 'Render Engine: Which rendering engine would you like to use?',
      choices: [
        'Blaze',
        'React',
        'Other',
      ],
      default: 'Blaze',
    }, {
      type: 'confirm',
      name: 'lint',
      message: 'ESLint: Would you like to configure this project with the AirBnB ESLint module?',
      default: true,
    }, {
      type: 'list',
      name: 'frontend',
      message: 'Frontend: Do you use any of these frontend frameworks??',
      choices: [
        'Foundation',
        'Nope',
      ],
      default: 'Foundation',
    }];

    this.prompt(prompts, answers => {
      this.answers = answers;
      // To access answers later use this.answers.someAnswer;
      done();
      return this.answers;
    });
  },

  scaffolding() {
    this.mkdir('client');
    this.mkdir('public');
    this.mkdir('server');
    this.mkdir('.meteor');

    this.mkdir('imports');
    this.mkdir('imports/api');
    this.mkdir('imports/ui');

    this.mkdir('imports/startup');
    this.mkdir('imports/startup/client');

    this.mkdir('imports/startup/server');
    this.mkdir('imports/startup/server/development');
    this.mkdir('imports/startup/server/production');
  },

  writing() {
    // context for template processing
    // const context = {
    //   appname: this.answers.name,
    // };

    this.copy(
      '.meteor/release',
      '.meteor/release'
    );
    this.copy(
      'package.json',
      'package.json'
    );
    this.copy(
      'client/main.js',
      'client/main.js'
    );
    this.copy(
      'server/main.js',
      'server/main.js'
    );
    this.copy(
      'imports/startup/client/index.js',
      'imports/startup/client/index.js'
    );
    this.copy(
      'imports/startup/client/routes.js',
      'imports/startup/client/routes.js'
    );
    this.copy(
      'imports/startup/client/accounts-config.js',
      'imports/startup/client/accounts-config.js'
    );
    this.copy(
      'imports/startup/server/index.js',
      'imports/startup/server/index.js'
    );
    this.copy(
      'imports/startup/server/fixtures.js',
      'imports/startup/server/fixtures.js'
    );
    this.copy(
      'imports/startup/server/development/settings.json',
      'imports/startup/server/development/settings.json'
    );
    this.copy(
      'imports/startup/server/production/settings.json',
      'imports/startup/server/production/settings.json'
    );
  },

  meteorPackages() {
    // install a rendering engine
    switch (this.answers.rendering) {
      case 'Blaze':
        this.packages.push('kadira:blaze-layout');
        break;
      case 'React':
        this.packages.push('kadira:react-layout');
        break;
      case 'Other':
        this.log('No Rendering Engine included');
        break;
      default:
        this.log('No Rendering Engine included');
        break;
    }
    // add flowrouter and collection2
    this.packages.push('kadira:flow-router', 'aldeed:collection2');
    // add selected packages to Meteor
    this.write('.meteor/packages', this.packages.join('\n'));
  },

  installNpm() {
    // Install a front end framework
    switch (this.answers.frontend) {
      case 'Foundation':
        this.npmInstall('foundation-sites', { save: true });
        break;
      case 'Nope':
        this.log('No frontend framework installed');
        break;
      default:
        this.log('No frontend framework installed');
    }
    // install linter if selected
    if (this.answers.lint) {
      this.npmInstall(['eslint', 'eslint-config-airbnb'], { saveDev: true });
    }
    // install react linter is selected
    if (this.answers.rendering === 'React') {
      this.npmInstall(['eslint-plugin-react'], { saveDev: true });
    }
    // install npm dependencies
    this.npmInstall();
  },

});
