(function() {

  KeyLauncher.onSequence("sup", function() {
    alert('sup');
    return $('body').append("<h5>Now type ctrl+j</h5>");
  });

  KeyLauncher.on("ctrl+j", function() {
    if (_.isObject(Backbone)) {
      return $('body').append("We loaded underscore, backbone, and zepto");
    }
  }, {
    requires: {
      "$": "//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js",
      "_": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js",
      "Backbone": "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"
    }
  });

}).call(this);
