KeyLauncher.onSequence "shake", ()->
  $('body').html '<iframe width="560" height="315" src="http://www.youtube.com/embed/3R8HGsbI4QY" frameborder="0" allowfullscreen></iframe>'
, requires:
  "$": "//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js"

# Basic delegate to keymaster
KeyLauncher.on "shift+command+j", ()->
  alert 'normal key commands work too'

# Specify dependencies to load before running the command
KeyLauncher.on "command+j", ()->
  if _.isObject(Backbone)
    $('body').append "We loaded underscore, backbone, and zepto"

, requires:
    "$": "//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js"
    "_": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"
    "Backbone": "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"
