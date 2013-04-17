(function() {

  window.KeyLauncher.Launcher = (function() {

    Launcher.prototype._dependencies = {};

    function Launcher(options) {
      var dependency, source, _ref;
      this.options = options != null ? options : {};
      this.fn = options.fn;
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
      var state, type, url, _ref, _results,
        _this = this;
      this.called = false;
      if (this.isReady()) {
        return this.onReady();
      }
      _ref = this._dependencies;
      _results = [];
      for (url in _ref) {
        state = _ref[url];
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
      if (!this.called) {
        this.fn.call(window, this);
      }
      return setTimeout(function() {
        return _this.called = true;
      }, 20);
    };

    return Launcher;

  })();

}).call(this);
