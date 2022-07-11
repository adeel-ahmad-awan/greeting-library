// create new execution context
// so that all the variables are safe and beign exposing on the global object

// use iife
(function (global, $) {
  var Greeter = function (firstname, lastname, language) {
    return new Greeter.init(firstname, lastname, language)
  }

  var supportedLanguage = ['en', 'es'];

  var greetings = {
    en: 'Hello',
    es: 'Hola',    
  };

  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos',    
  }; 

  var loggedMessages = {
    en: 'Logged in (english)',
    es: 'Logged in (spanish)'
  }


  Greeter.prototype = {
    
    // get full name
    fullName: function () {
      return this.firstname + ' ' + this.lastname;
    },

    // check if the language provided is supported by the library
    validate: function () {
      if (supportedLanguage.indexOf(this.language) === -1) {
        throw 'Invalid language';
      }
    },

    // informal greeting
    greetings: function () {
      return greetings[this.language] + ' ' + this.firstname + '!';
    },

    // formal greeting
    formalGreetings: function () {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },

    greet: function (formal) {
      var msg;

      if (formal) {
        msg = this.formalGreetings();
      } else {
        msg = this.greetings();
      }

      if (console) {
        console.log(msg)
      }

      // to make method chainable
      return this;
    },

    log: function () {
      if (console) {
        console.log(loggedMessages[this.language] + ': ' + this.fullName());
      }
      return this;
    },

    setLang: function (lang) {
      this.language = lang;
      this.validate();
      return this;
    },

    HTMLGreeting: function (selector, formal) {
      if (!$) {
        throw "jQuery is required";
      }

      if (!selector) {
        throw "selector is missing";
      }

      var msg;

      if (formal) {
        msg = this.formalGreetings();
      } else {
        msg = this.greetings();
      }

      $(selector).html(msg);
      // to make method chainable
      return this;

    },


  }



  Greeter.init = function (firstname, lastname, language) {
    var self = this
    self.firstname = firstname|| '';
    self.lastname = lastname|| '';
    self.language = language || 'en';
    self.validate()
  }

  Greeter.init.prototype = Greeter.prototype;

  global.Greeter = global.G$ = Greeter;

}(window, jQuery))