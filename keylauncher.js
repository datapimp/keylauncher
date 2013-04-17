//     keymaster.js
//     (c) 2011-2012 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.
(function(e){function a(e,t){var n=e.length;while(n--)if(e[n]===t)return n;return-1}function f(e,t){var i,o,f,l,c;i=e.keyCode,a(u,i)==-1&&u.push(i);if(i==93||i==224)i=91;if(i in r){r[i]=!0;for(f in s)s[f]==i&&(h[f]=!0);return}if(!h.filter.call(this,e))return;if(!(i in n))return;for(l=0;l<n[i].length;l++){o=n[i][l];if(o.scope==t||o.scope=="all"){c=o.mods.length>0;for(f in r)if(!r[f]&&a(o.mods,+f)>-1||r[f]&&a(o.mods,+f)==-1)c=!1;(o.mods.length==0&&!r[16]&&!r[18]&&!r[17]&&!r[91]||c)&&o.method(e,o)===!1&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0))}}}function l(e){var t=e.keyCode,n,i=a(u,t);i>=0&&u.splice(i,1);if(t==93||t==224)t=91;if(t in r){r[t]=!1;for(n in s)s[n]==t&&(h[n]=!1)}}function c(){for(t in r)r[t]=!1;for(t in s)h[t]=!1}function h(e,t,r){var i,u,a,f;r===undefined&&(r=t,t="all"),e=e.replace(/\s/g,""),i=e.split(","),i[i.length-1]==""&&(i[i.length-2]+=",");for(a=0;a<i.length;a++){u=[],e=i[a].split("+");if(e.length>1){u=e.slice(0,e.length-1);for(f=0;f<u.length;f++)u[f]=s[u[f]];e=[e[e.length-1]]}e=e[0],e=o[e]||e.toUpperCase().charCodeAt(0),e in n||(n[e]=[]),n[e].push({shortcut:i[a],scope:t,method:r,key:i[a],mods:u})}}function p(e){if(typeof e=="string"){if(e.length!=1)return!1;e=e.toUpperCase().charCodeAt(0)}return a(u,e)!=-1}function d(){return u}function v(e){var t=(e.target||e.srcElement).tagName;return t!="INPUT"&&t!="SELECT"&&t!="TEXTAREA"}function m(e){i=e||"all"}function g(){return i||"all"}function y(e){var t,r,i;for(t in n){r=n[t];for(i=0;i<r.length;)r[i].scope===e?r.splice(i,1):i++}}function b(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,function(){n(window.event)})}function E(){var t=e.key;return e.key=w,t}var t,n={},r={16:!1,18:!1,17:!1,91:!1},i="all",s={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,command:91},o={backspace:8,tab:9,clear:12,enter:13,"return":13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,"delete":46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220},u=[];for(t=1;t<20;t++)s["f"+t]=111+t;for(t in s)h[t]=!1;b(document,"keydown",function(e){f(e,i)}),b(document,"keyup",l),b(window,"focus",c);var w=e.key;e.key=h,e.key.setScope=m,e.key.getScope=g,e.key.deleteScope=y,e.key.filter=v,e.key.isPressed=p,e.key.getPressedKeyCodes=d,e.key.noConflict=E,typeof module!="undefined"&&(module.exports=key)})(this);
(function() {
  var _base;

  window.KeyLauncher || (window.KeyLauncher = {});

  (_base = window.KeyLauncher).loaders || (_base.loaders = {});

  window.loadedScripts = {};

  window.scriptTimers = {};

  KeyLauncher.loaders.stylesheet = function(url, options, callback) {
    var ss;
    if (options == null) {
      options = {};
    }
    ss = document.createElement("link");
    ss.type = "text/css";
    ss.rel = "stylesheet";
    ss.href = url;
    document.getElementsByTagName("head")[0].appendChild(ss);
    return callback.call(this);
  };

  KeyLauncher.loaders.script = function(url, options, callback) {
    var head, loaded, onLoad, script, that, timers;
    if (options == null) {
      options = {};
    }
    loaded = loadedScripts;
    timers = scriptTimers;
    if (typeof options === "function" && !(callback != null)) {
      callback = options;
      options = {};
    }
    head = document.getElementsByTagName('head')[0];
    script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    that = this;
    onLoad = function() {
      if (typeof callback === "function") {
        callback.call(that, url, options, script);
      }
      try {
        head.removeChild(script);
      } catch (e) {
        true;
      }
      return loaded[url] = true;
    };
    if (options.once === true && loaded[url]) {
      return false;
    }
    head.appendChild(script);
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        return onLoad();
      }
    };
    script.onload = onLoad;
    if (typeof navigator !== "undefined" && navigator !== null ? navigator.userAgent.match(/WebKit/) : void 0) {
      return timers[url] = setInterval(function() {
        onLoad();
        return clearInterval(timers[url]);
      }, 10);
    }
  };

}).call(this);
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
(function() {
  var _checkSequence;

  KeyLauncher.VERSION = "0.0.4";

  KeyLauncher.on = function(keycommand, launchFn, options) {
    var launcher;
    if (options == null) {
      options = {};
    }
    if (keycommand == null) {
      throw "Must specify a valid key command";
    }
    launcher = new KeyLauncher.Launcher({
      command: keycommand,
      fn: launchFn || function() {},
      before: options.before,
      requires: options.requires || []
    });
    key(keycommand, function() {
      return launcher.run.call(launcher);
    });
    return launcher;
  };

  _checkSequence = function(event, handler) {
    var key, launcher, matches, previous, shortcut;
    previous = KeyLauncher.currentSequence || '';
    shortcut = handler.shortcut;
    KeyLauncher.currentSequence = "" + previous + shortcut;
    matches = (function() {
      var _ref, _results;
      _ref = KeyLauncher.sequences;
      _results = [];
      for (key in _ref) {
        launcher = _ref[key];
        if (key.match(KeyLauncher.currentSequence)) {
          _results.push(key);
        }
      }
      return _results;
    })();
    if (!(matches.length > 0)) {
      KeyLauncher.currentSequence = '';
    }
    if (matches.length === 1 && (launcher = KeyLauncher.sequences[KeyLauncher.currentSequence])) {
      launcher.run.call(launcher);
      return KeyLauncher.currentSequence = '';
    }
  };

  KeyLauncher.onSequence = function(sequence, launchFn, options) {
    var character, launcher, _i, _len, _ref;
    if (options == null) {
      options = {};
    }
    KeyLauncher.sequences || (KeyLauncher.sequences = {});
    launcher = KeyLauncher.sequences[sequence] = new KeyLauncher.Launcher({
      fn: launchFn || function() {},
      requires: options.requires || [],
      before: options.before
    });
    _ref = sequence.split('');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      character = _ref[_i];
      key(character, _checkSequence);
    }
    return launcher;
  };

}).call(this);
