# Allow your users to say what up
KeyLauncher.onSequence "sup", ()->
  alert('sup')
  $('body').append "<h5>Now type ctrl+j</h5>"

# Specify dependencies to load before running the command
KeyLauncher.on "ctrl+j", ()->
  if _.isObject(Backbone)
    $('body').append "We loaded underscore, backbone, and zepto"

, requires:
    "$": "http://cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js"
    "_": "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"
    "Backbone": "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"
