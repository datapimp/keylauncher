# KeyLauncher.Launcher is an internal class that sets up the dependencies
# and then runs the specified function if they are all loaded
class window.KeyLauncher.Launcher
  _dependencies: {}

  constructor: (@options={})->
    @fn = options.fn 
    @command = options.command

    for dependency in @options.requires
      @_dependencies[dependency] = loaded: false

  # The run method gets triggered when the keycommand
  # is detected, it will ensure all of the dependencies
  # are loaded and once it is comfortable they are, then
  # it will run the user specified method and launch the 
  # application.
  run: ()->
    return @onReady() if @isReady()
    
    for dependency, status of @_dependencies when status.loaded isnt true
      KeyLauncher.util.loadScript dependency, =>
        @_dependencies[dependency].loaded = true

  requires: (dependency)->
    @_dependencies[dependency] = 
      loaded: false

  #### Private Methods    

  isReady: ()->
    ready = true

    for dependency, status of @_dependencies
      if status.loaded is false
        ready = false

    ready

  onDependencyLoad: (dependency)->
    @onReady() if @isReady()

  onReady: ()->
    @fn.call(window, @)