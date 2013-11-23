class App
  constructor: ->
    @useCase = new UseCase()
    @serverSide = new ServerSide(@useCase)
    @gui = new Gui(@useCase)
    # console.log("halo")

    After(@useCase, "start", => @serverSide.loadUsers())
    After(@serverSide, 'usersLoaded', (users) => @useCase.setUsers(users))
    After(@useCase, "setUsers", (users) => @gui.start(users))

  start: =>
    @useCase.start()

  users: =>
    #[new User("Jan Kowalski"), new User("Jan Nowak")]

class UseCase
  constustor: ->
    @users = []

  setUsers: (@users) =>

  start: =>

class Gui
  constructor: ->

  start: (users) =>
    element = @_createElementFor("#users", users: users)
    $("#main").append(element)

  _createElementFor: (templateId, data) =>
    source = $(templateId).html()
    template = Handlebars.compile(source)
    html = template(data)
    element = $(html)

class User
  constructor: (@name) ->

class ServerSide
  loadUsers: =>
    $.ajax(
          type: "GET"
          url: "http://backend-pikaj.shellyapp.com/users.json"
          success: (usersJson) =>
            console.log("success")
            console.log(usersJson)
            @usersLoaded(@usersFromJson(usersJson))
          error: =>
            console.log("fail")
          )

  usersFromJson: (json) => 
    json.map (s) -> new User s

  usersLoaded: (users) ->


app = new App()
app.start()