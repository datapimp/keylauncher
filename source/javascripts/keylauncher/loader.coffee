window.KeyLauncher ||= {}
window.KeyLauncher.loaders ||= {}

window.loadedScripts = {}
window.scriptTimers = {}

KeyLauncher.loaders.stylesheet = (url, options={}, callback)->
  ss = document.createElement("link")
  ss.type = "text/css"
  ss.rel = "stylesheet"
  ss.href = url
  document.getElementsByTagName("head")[0].appendChild(ss);
  callback.call(@)

KeyLauncher.loaders.script = (url, options={}, callback) ->
  console.log "loaders script", url
  loaded = loadedScripts
  timers = scriptTimers

  if typeof(options) is "function" and !callback?
    callback = options
    options = {}

  head= document.getElementsByTagName('head')[0];
  script = document.createElement("script")
  script.src = url
  script.type = "text/javascript"

  that = @
  onLoad = ()->
    if typeof(callback) is "function"
      callback.call(that, url, options, script)

    try
      head.removeChild(script)
    catch e
      true

    loaded[url] = true

  if options.once is true && loaded[url]
    return false

  head.appendChild(script)

  script.onreadystatechange = ()->
    if script.readyState is "loaded" or script.readyState is "complete"
      onLoad()

  script.onload = onLoad

  if navigator?.userAgent.match(/WebKit/)
    timers[url] = setInterval ()->
      onLoad()
      console.log "wtf", url, timers[url]
      clearInterval(timers[url])
    , 500
