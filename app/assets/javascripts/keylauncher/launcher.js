(function() {

  window.KeyLauncher.Launcher = (function() {

    Launcher.prototype._dependencies = {};

    function Launcher(options) {
      var dependency, source, _ref;
      this.options = options != null ? options : {};
      this.fn = options.fn;
      this.before = options.before;
      this.command = options.command;
      _ref = this.options.requires;
      for (dependency in _ref) {
        source = _ref[dependency];
        this._dependencies[source] = {
          loaded: false,
          provides: dependency
        };
      }
    }

    Launcher.prototype.run = function() {
      var state, type, url, _ref, _ref1, _results,
        _this = this;
      this.ran = false;
      if ((_ref = this.before) != null) {
        if (typeof _ref.call === "function") {
          _ref.call(this);
        }
      }
      if (this.isReady()) {
        return this.onReady();
      }
      _ref1 = this._dependencies;
      _results = [];
      for (url in _ref1) {
        state = _ref1[url];
        try {
          state.loaded = eval(state.provides) != null;
        } catch (e) {
          state.loaded = false;
        }
        if (state.loaded !== true) {
          type = url.match(/\.css/) ? "stylesheet" : "script";
          _results.push(KeyLauncher.loaders[type](url, function(loaded) {
            return _this.onDependencyLoad(loaded);
          }));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Launcher.prototype.requires = function(dependency) {
      return this._dependencies[dependency] = {
        loaded: false
      };
    };

    Launcher.prototype.isReady = function() {
      var dependency, ready, status, _ref;
      ready = true;
      _ref = this._dependencies;
      for (dependency in _ref) {
        status = _ref[dependency];
        if (status.loaded === false) {
          ready = false;
        }
      }
      return ready;
    };

    Launcher.prototype.onDependencyLoad = function(loaded) {
      this._dependencies[loaded].loaded = true;
      if (this.isReady()) {
        return this.onReady();
      }
    };

    Launcher.prototype.onReady = function() {
      var _this = this;
      if (!(this.isReady() && this.ran === false)) {
        return;
      }
      return (function() {
        _this.fn.call(_this);
        return _this.ran = true;
      })();
    };

    return Launcher;

  })();

}).call(this);
