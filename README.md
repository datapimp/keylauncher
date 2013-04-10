# Keylauncher.js

Keylauncher is a library that allows you to embed 'secret' keyboard combinations into your website, that when
entered will trigger the loading of external javascript and css dependencies and, upon loading these dependencies,
execute a block of application launch code.

I use this library to embed small single purpose javascript widgets and applications inside of websites I am developing or maintaining.

An example: as an app which takes a screenshot of the current webpage with a bug on it, and submits a github issue with that data.

```coffeescript
# Whenever the user types the word 'sync' in a non text input
KeyLauncher.onSequence "sync", ()->
  alert 'sync sequence detected'

# Basic delegate to keymaster
KeyLauncher.on "shift+command+j", ()->
  alert 'normal key commands work too'

# Specify dependencies to load before running the command
KeyLauncher.on "command+j", ()->
  if _.isObject(Backbone)
    $('body').append "We loaded underscore, backbone, and zepto"

, requires:[
  "//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js",
  "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js",
  "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"
]
```

