// Generated by CoffeeScript 1.4.0
(function() {
  var App, Gui, ServerSide, UseCase, User, app,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App = (function() {

    function App() {
      this.users = __bind(this.users, this);

      this.start = __bind(this.start, this);

      var _this = this;
      this.useCase = new UseCase();
      this.serverSide = new ServerSide(this.useCase);
      this.gui = new Gui(this.useCase);
      After(this.useCase, "start", function() {
        return _this.serverSide.loadUsers();
      });
      After(this.serverSide, 'usersLoaded', function(users) {
        return _this.useCase.setUsers(users);
      });
      After(this.useCase, "setUsers", function(users) {
        return _this.gui.start(users);
      });
    }

    App.prototype.start = function() {
      return this.useCase.start();
    };

    App.prototype.users = function() {};

    return App;

  })();

  UseCase = (function() {

    function UseCase() {
      this.start = __bind(this.start, this);

      this.setUsers = __bind(this.setUsers, this);

    }

    UseCase.prototype.constustor = function() {
      return this.users = [];
    };

    UseCase.prototype.setUsers = function(users) {
      this.users = users;
    };

    UseCase.prototype.start = function() {};

    return UseCase;

  })();

  Gui = (function() {

    function Gui() {
      this._createElementFor = __bind(this._createElementFor, this);

      this.start = __bind(this.start, this);

    }

    Gui.prototype.start = function(users) {
      var element;
      element = this._createElementFor("#users", {
        users: users
      });
      return $("#main").append(element);
    };

    Gui.prototype._createElementFor = function(templateId, data) {
      var element, html, source, template;
      source = $(templateId).html();
      template = Handlebars.compile(source);
      html = template(data);
      return element = $(html);
    };

    return Gui;

  })();

  User = (function() {

    function User(name) {
      this.name = name;
    }

    return User;

  })();

  ServerSide = (function() {

    function ServerSide() {
      this.usersFromJson = __bind(this.usersFromJson, this);

      this.loadUsers = __bind(this.loadUsers, this);

    }

    ServerSide.prototype.loadUsers = function() {
      var _this = this;
      return $.ajax({
        type: "GET",
        url: "http://backend-pikaj.shellyapp.com/users.json",
        success: function(usersJson) {
          console.log("success");
          console.log(usersJson);
          return _this.usersLoaded(_this.usersFromJson(usersJson));
        },
        error: function() {
          return console.log("fail");
        }
      });
    };

    ServerSide.prototype.usersFromJson = function(json) {
      return json.map(function(s) {
        return new User(s);
      });
    };

    ServerSide.prototype.usersLoaded = function(users) {};

    return ServerSide;

  })();

  app = new App();

  app.start();

}).call(this);
