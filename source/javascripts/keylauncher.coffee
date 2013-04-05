#= require ./keylauncher/domready.js
#= require ./keylauncher/keymaster.js
#= require ./keylauncher/loader.js
#= require ./keylauncher/launcher.js
#= require_self

KeyLauncher.VERSION = "0.0.1"

KeyLauncher.on = (keycommand, launchFn=->, options={})->
  throw "Must specify a valid key command" unless keycommand?
  
  launcher = new KeyLauncher.Launcher
    command: keycommand 
    fn: launchFn || ->
    requires: options.requires || []

  key(keycommand, launcher.run) 
