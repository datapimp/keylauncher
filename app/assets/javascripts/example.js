(function() {

  KeyLauncher.onSequence("sup", function() {
    $('.container-fluid').append("<h4>Sup...</h4>");
    $('.container-fluid').append("<p><strong>Now type ctrl+j</strong></p>");
    if ($('.example-wrapper').length === 0) {
      return $('.container-fluid').append("<div class='example-wrapper'></div>");
    }
  });

  KeyLauncher.on("ctrl+j", function() {
    var View, view;
    $('.example-wrapper').empty();
    if (_.isObject(Backbone)) {
      View = Backbone.View.extend({
        className: "modal fade hide",
        render: function() {
          this.$el.html("<div class='modal-body'>We delayed loading potentially expensive dependencies to run this command until if and only if the key sequence or command was triggered...Now, here is a Backbone.View getting rendered on demand</div>");
          return this;
        }
      });
      view = new View();
      $('body').append(view.render().$el);
      return view.$el.modal('show');
    }
  }, {
    requires: {
      "$": "http://cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js",
      "_": "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js",
      "Backbone": "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"
    },
    before: function() {
      return alert('before we run this, we can hook in and do our own setup tasks...');
    }
  });

}).call(this);
