# KeyLauncher.Launcher is an internal class that sets up the dependencies
# and then runs the specified function if they are all loaded
class window.KeyLauncher.Launcher
  _dependencies: {}

  constructor: (@options={})->
    @fn = options.fn
    @before = options.before
    @command = options.command

    for dependency, source of @options.requires
      @_dependencies[source] =
        loaded: false
        provides: dependency


  # The run method gets triggered when the keycommand
  # is detected, it will ensure all of the dependencies
  # are loaded and once it is comfortable they are, then
  # it will run the user specified method and launch the
  # application.
  run: ()->
    @ran = false

    @before?.call?(@)

    return @onReady() if @isReady()

    for url, state of @_dependencies
      try
        state.loaded = eval(state.provides)?
      catch e
        state.loaded = false

      if state.loaded isnt true
        type = if url.match(/\.css/) then "stylesheet" else "script"
        KeyLauncher.loaders[type](url,(loaded)=> @onDependencyLoad(loaded) )

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

  onDependencyLoad: (loaded)->
    @_dependencies[loaded].loaded = true
    @onReady() if @isReady()

  onReady: ()->
    return unless @isReady() and @ran is false

    do =>
      @fn.call(@)
      @ran = true
