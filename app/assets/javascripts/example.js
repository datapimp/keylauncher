(function() {

  KeyLauncher.onSequence("sup", function() {
    alert('sup');
    $('body').append("<h5>Now type ctrl+j</h5>");
    if ($('.example-wrapper').length === 0) {
      return $('body').append("<div class='example-wrapper'></div>");
    }
  });

  KeyLauncher.on("ctrl+j", function() {
    var View, view;
    $('.example-wrapper').empty();
    if (_.isObject(Backbone)) {
      $('.example-wrapper').append("<p>We loaded underscore, backbone, and zepto</p>");
      View = Backbone.View.extend({
        render: function() {
          this.$el.html("Here is a Backbone.View getting rendered on demand");
          return this;
        }
      });
      view = new View();
      return $('.example-wrapper').append(view.render().el);
    }
  }, {
    requires: {
      "$": "http://cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js",
      "_": "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js",
      "Backbone": "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"
    },
    before: function() {
      if (typeof Backbone === "undefined") {
        return $('.example-wrapper').empty().append("<p>Backbone isn't defined, we're going to load it before doing anything...</p>");
      }
    }
  });

}).call(this);
