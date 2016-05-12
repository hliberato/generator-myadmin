'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Focusnetworks Myadmin') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Qual o nome do seu projeto?',
      default: ''
    },
    {
      type: 'checkbox',
      name: 'someAnswer',
      message: 'Quais modelos default gostaria de adicionar?',
      choices: ['faq', 'news', 'user']
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    console.log('Seguinte, agora vou rodar os seguintes comandos:')
    console.log('rails new {{nome-do-projeto}} -d mysql');
    console.log('gem install my_admin');
    console.log('adicionar linha gem my_admin');
    console.log('bundle install');
    console.log('rails g my_admin:install');
    console.log('Depois, vou criar todos os modelos selecionados.');
    console.log('E então, você vai ter que ir até config/database.yml e editar login e senha do seu banco de dados.');
    console.log('Vambora?!');
    //this.installDependencies();
  }
});
