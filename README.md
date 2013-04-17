# Keylauncher.js

Keylauncher is a library that allows you to embed 'secret' keyboard combinations into your website, that when
entered will trigger the loading of external javascript and css dependencies and, upon loading these dependencies,
execute a block of application launch code.

I use this library to embed small single purpose javascript widgets and applications inside of websites I am developing or maintaining.

An example: as an app which takes a screenshot of the current webpage with a bug on it, and submits a github issue with that data.

```coffeescript
# Allow your users to say 'sup'
KeyLauncher.onSequence "sup", ()->
  alert('sup')
  $('body').append "<h5>Now type ctrl+j</h5>"

# Specify dependencies to load before running the command
KeyLauncher.on "ctrl+j", ()->
  if _.isObject(Backbone)
    $('body').append "We loaded underscore, backbone, and zepto as well as my library"

    MyLibrary.doSomething()

, requires:
    "$": "//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js"
    "_": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"
    "Backbone": "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"
    "MyLibrary": "//github.com/datapimp/my-library.js"

```

