# Allow your users to say what up
KeyLauncher.onSequence "sup", ()->
  $('.container-fluid').append "<h4>Sup...</h4>"
  $('.container-fluid').append "<p><strong>Now type ctrl+j</strong></p>"

  if $('.example-wrapper').length is 0
    $('.container-fluid').append "<div class='example-wrapper'></div>"

# Specify dependencies to load before running the command
KeyLauncher.on "ctrl+j", ()->
  $('.example-wrapper').empty()

  if _.isObject(Backbone)
    $('.example-wrapper').append "<p>We delayed loading underscore, backbone, and zepto, and other potentially heavy dependencies until if and only if the key command is run.</p>"

    View = Backbone.View.extend
      className: "modal fade hide"
      render: ()->
        @$el.html("<div class='modal-body'>Now, here is a Backbone.View getting rendered on demand</div>")
        @

    view = new View()
    $('body').append( view.render().$el )
    view.$el.modal('show')

,
requires:
    "$": "http://cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js"
    "_": "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"
    "Backbone": "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"
before: ()->
  alert 'before we run this, we can hook in and do our own setup tasks...'
