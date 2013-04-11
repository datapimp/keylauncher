#= require ./keylauncher/domready.js
#= require ./keylauncher/keymaster.js
#= require ./keylauncher/loader.js
#= require ./keylauncher/launcher.js
#= require_self

KeyLauncher.VERSION = "0.0.3"

KeyLauncher.on = (keycommand, launchFn, options={})->
  throw "Must specify a valid key command" unless keycommand?

  launcher = new KeyLauncher.Launcher
    command: keycommand
    fn: launchFn || ->
    requires: options.requires || []

  key keycommand, ->
    launcher.run.call(launcher)

  launcher

_checkSequence = (event, handler)->
  previous = KeyLauncher.currentSequence || ''
  shortcut = handler.shortcut

  KeyLauncher.currentSequence = "#{ previous }#{ shortcut }"

  matches = for key, launcher of KeyLauncher.sequences when key.match(KeyLauncher.currentSequence)
    key

  unless matches.length > 0
    KeyLauncher.currentSequence = ''

  if matches.length is 1 and launcher = KeyLauncher.sequences[KeyLauncher.currentSequence]
    launcher.run.call(launcher)
    KeyLauncher.currentSequence = ''

KeyLauncher.onSequence = (sequence, launchFn, options={})->
  KeyLauncher.sequences ||= {}

  launcher = KeyLauncher.sequences[sequence] = new KeyLauncher.Launcher
    fn: launchFn || ->
    requires: options.requires || []

  for character in sequence.split('')
    key character, _checkSequence

  launcher

