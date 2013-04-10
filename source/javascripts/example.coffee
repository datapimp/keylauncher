# Whenever the user types the word 'sync' in a non text input
KeyLauncher.onSequence "sync", ()->
  alert 'sync sequence detected'

# Basic delegate to keymaster
KeyLauncher.on "shift+command+j", ()->
  alert 'normal key commands work too'

# Specify dependencies to load before running the command
window.requiresLauncher = KeyLauncher.on "command+j", ()->
  if _.isObject(Backbone)
    $('body').append "We loaded underscore, backbone, and zepto"

, requires:[
  "//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js",
  "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js",
  "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"
]
