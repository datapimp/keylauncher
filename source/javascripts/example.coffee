launcher = KeyLauncher.on 'command+j', ()->
  alert "is jquery loaded? #{ typeof(jQuery) is undefined }"
, requires:[
  "http://code.jquery.com/jquery-1.9.1.min.js"  
]
