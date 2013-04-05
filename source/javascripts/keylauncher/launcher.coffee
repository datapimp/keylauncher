class window.KeyLauncher.Launcher
  _dependencies: {}

  constructor: (@options={})->
    @fn = options.fn 
    @command = options.command
    
    for dependency in @options.requires
      @_dependencies[dependency] = loaded: false

  requires: (dependency)->
    @_dependencies[dependency] = 
      loaded: false

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