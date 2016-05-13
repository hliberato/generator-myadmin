'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var shell = require('shelljs');

module.exports = yeoman.Base.extend({
  
  prompting: function () {
    
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Focusnetworks Myadmin') + ' generator!'
    ));
    
    // Versions
    if(shell.which('ruby')){
      shell.exec('ruby -v');
    }else{
      this.log(chalk.red('Error: Command Ruby not found. Install Ruby before proceed.'));
      process.exit(1);
    }
    
    if(shell.which('rails')){
      shell.exec('rails -v');
    }else{
      this.log(chalk.red('Error: Command Rails not found. Install Rails before proceed.'));
      process.exit(1);
    }
    
    // Getting user choices
    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      default : this.appname
    },{
      type: 'checkbox',
      name: 'models',
      message: 'Choose which models do you want to install:',
      choices: [
        'User',
        'News',
        'Product',
        'Event',
        'Course',
        'Survey',
        'Newsletter',
        'Contact',
        'Sector',
        'Level',
        'Sponsor',
        'Advertisings',
        'Document',
        'Report',
        'Resume',
        'File',
        "Store",
        'Gale
        ry',
        'Pages',
        'FAQ',
        'About'
      ]
    }];
    
    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.name or models;
      this.props = props;
    }.bind(this));
    
  },
  
  configuring: function () {
    
    this.log(chalk.green('Generating the Rails app...'));
    shell.exec('rails new ' + this.props.name + ' -d mysql', {async:false});
    
    this.log(chalk.green('Installing my_admin gem...'));
    shell.exec('gem install my_admin', {async:false});
    
    this.log(chalk.green('Installing paperclip gem...'));
    shell.exec('gem install paperclip', {async:false});
    
  },
  
  writing: function () {
    
    this.log(chalk.green('Editing Gemfile...'));
    this.fs.copy(
      this.destinationPath(this.props.name+'/Gemfile'),
      this.destinationPath(this.props.name+'/Gemfile'),
      {process: function(content) {
        var gems = new RegExp('source \'https://rubygems.org\'', 'g');
        var mysql = new RegExp('gem \'mysql2\'', 'g');
        var newContent = content.toString().replace(gems,
          'source \'https://rubygems.org\'\n\ngem \'my_admin\'\ngem \'paperclip\', \'~> 4.3\'').replace(mysql,
          'gem \'mysql2\', \'~> 0.3.20\'');
        return newContent;
        }
      }
    );
    
    this.log(chalk.green('Gemfile edited...'));
    
    /*this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );*/    
    
  },
  
  install: function () {
    
    shell.cd(this.props.name);
    
    this.log(chalk.green('Executing bundle install...'));
    shell.exec('bundle install', {async:false});
    
    this.log(chalk.green('Executing my_admin install...'));
    shell.exec('rails g my_admin:install', {async:false});
    
  },

  end: function () {
    
    this.log('Seguinte, agora vou rodar os seguintes comandos:')
    this.log('rails new {{nome-do-projeto}} -d mysql');
    this.log('gem install my_admin');
    this.log('adicionar linha gem my_admin');
    this.log('bundle install');
    this.log('rails g my_admin:install');
    this.log('Depois, vou criar todos os modelos selecionados.');
    this.log('E então, você vai ter que ir até config/database.yml e editar login e senha do seu banco de dados.');
    this.log('Vambora?!');
    //this.installDependencies();
    
  }
});
