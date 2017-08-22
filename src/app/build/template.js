/*TMODJS:{"version":"1.0.0"}*/
!function(){function a(a,b){return(/string|function/.test(typeof b)?h:g)(a,b)}function b(a,c){return"string"!=typeof a&&(c=typeof a,"number"===c?a+="":a="function"===c?b(a.call(a)):""),a}function c(a){return l[a]}function d(a){return b(a).replace(/&(?![\w#]+;)|[<>"']/g,c)}function e(a,b){if(m(a))for(var c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)}function f(a,b){var c=/(\/)[^\/]+\1\.\.\1/,d=("./"+a).replace(/[^\/]+$/,""),e=d+b;for(e=e.replace(/\/\.\//g,"/");e.match(c);)e=e.replace(c,"/");return e}function g(b,c){var d=a.get(b)||i({filename:b,name:"Render Error",message:"Template not found"});return c?d(c):d}function h(a,b){if("string"==typeof b){var c=b;b=function(){return new k(c)}}var d=j[a]=function(c){try{return new b(c,a)+""}catch(d){return i(d)()}};return d.prototype=b.prototype=n,d.toString=function(){return b+""},d}function i(a){var b="{Template Error}",c=a.stack||"";if(c)c=c.split("\n").slice(0,2).join("\n");else for(var d in a)c+="<"+d+">\n"+a[d]+"\n\n";return function(){return"object"==typeof console&&console.error(b+"\n\n"+c),b}}var j=a.cache={},k=this.String,l={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},m=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},n=a.utils={$helpers:{},$include:function(a,b,c){return a=f(c,a),g(a,b)},$string:b,$escape:d,$each:e},o=a.helpers=n.$helpers;a.get=function(a){return j[a.replace(/^\.\//,"")]},a.helper=function(a,b){o[a]=b},"function"==typeof define?define(function(){return a}):"undefined"!=typeof exports?module.exports=a:this.template=a,/*v:1*/
a("index",'<!doctype html> <html class="no-js" lang=""> <head> <meta charset="utf-8"> <meta name="description" content=""> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>Roof Diagram</title> <link rel="apple-touch-icon" href="apple-touch-icon.png">    <link rel="stylesheet" href="/bower_components/jointjs/dist/joint.css" /> <link rel="stylesheet" href="/bower_components/animate.css/animate.css" /> <link rel="stylesheet" href="/bower_components/growl/stylesheets/jquery.growl.css" />    <link rel="stylesheet" type="text/css" href="lib/rappid/rappid.min.css"> <link rel="stylesheet" href="styles/main.css">   <script src="/bower_components/modernizr/modernizr.js"></script>  </head> <body> </body>   <script src="/bower_components/jquery/dist/jquery.js"></script> <script src="/bower_components/bootstrap/dist/js/bootstrap.js"></script> <script src="/bower_components/lodash/lodash.js"></script> <script src="/bower_components/graphlib/dist/graphlib.core.js"></script> <script src="/bower_components/dagre/dist/dagre.core.js"></script> <script src="/bower_components/dagre/dist/dagre.core.min.js"></script> <script src="/bower_components/backbone/backbone.js"></script> <script src="/bower_components/jointjs/dist/joint.js"></script> <script src="/bower_components/jquery-mousewheel/jquery.mousewheel.js"></script> <script src="/bower_components/growl/javascripts/jquery.growl.js"></script> <script src="/bower_components/jquery.hotkeys/jquery.hotkeys.js"></script> <script src="/bower_components/bootbox.js/bootbox.js"></script> <script src="/bower_components/validator/dist/validator.js"></script>    <script src="lib/rappid/rappid.js"></script> <script src="lib/jquery.wheelmenu/jquery.wheelmenu.js"></script> <script type="text/javascript" src="lib/ui.js"></script> <script src="lib/qwebchannel.js"></script> <script src="scripts/enventCenter.js"></script>   <script src="scripts/port.model.js"></script> <script src="scripts/link.model.js"></script> <script src="scripts/infomationflow.model.js"></script> <script src="scripts/assembly.model.js"></script> <script src="scripts/netswitch.model.js"></script> <script src="scripts/ditchs.model.js"></script> <script src="scripts/ditchs.js"></script> <script type="text/javascript" src="scripts/goose.js"></script> <script type="text/javascript" src="scripts/netswitch.js"></script> <script type="text/javascript" src="scripts/paper.js"></script> <script type="text/javascript" src="scripts/assembly.js"></script> <script type="text/javascript" src="scripts/infomationflow.js"></script> <script type="text/javascript" src="scripts/mainclink.js"></script> <script type="text/javascript" src="scripts/main.js"></script>  </html> '),/*v:1*/
a("lib/jquery.wheelmenu/demo",'<!doctype html> <html> <head> <meta charset="utf-8"> <title>jQuery Wheel Menu by Pete R. | The Pete Design</title> <meta name="title" content="jQuery Wheel Menu by Pete R. | The Pete Design" /> <meta name="description" content="Add a fully customizable Path-like wheel menu button to your website. Created by Pete R., Founder of BucketListly" /> <link rel="image_src" href="http://www.thepetedesign.com/images/wheelmenu_image.png" /> <meta content="http://www.thepetedesign.com/demos/jquery_wheelmenu_demo.html" property="og:url" /> <meta content="http://www.thepetedesign.com/images/wheelmenu_image.png" property="og:image" /> <meta name="author" content="Pete R."> <link rel="canonical" href="http://www.thepetedesign.com/demos/jquery_wheelmenu_demo.html" /> <link href=\'http://fonts.googleapis.com/css?family=Open+Sans:700\' rel=\'stylesheet\' type=\'text/css\'> <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script> <script type="text/javascript" src="jquery.wheelmenu.js"></script> <style> html { height: 100%; } body { background: #f4eedf; padding: 0; text-align: center; font-family: \'open sans\'; position: relative; margin: 0; height: 100%; } .wrapper { height: auto !important; height: 100%; margin: 0 auto; overflow: hidden; } a { text-decoration: none; } h1, h2 { width: 100%; float: left; } h1 { margin-top: 100px; color: #555; margin-bottom: 5px; } h2 { color: #999; font-weight: 100; margin-top: 0; margin-bottom: 10px; } .pointer { color: #34495e; font-family: \'Pacifico\', cursive; font-size: 22px; margin-top: -15px; } .wheel-button, .wheel-button:visited { line-height: 35px; font-weight: bold; font-size: 36px; background: #df4727; padding: 10px 11px; text-align: center; border-radius: 50px; width: 35px; height: 35px; color: white; display: block; margin: 70px auto 20px; border: 3px solid #92311e; box-shadow: 0 1px 2px rgba(0,0,0,0.25); -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.25); -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.25); } .wheel-button:hover{ color: white; } .wheel-button.ne { border-color: white; background: #1ABC9C; color: #34FFFF; position: absolute; bottom: 10px; left: 10px; } .wheel-button.nw { border-color: white; background-color: #E67E22; color: #FFFC44; position: absolute; bottom: 10px; right: 10px; } .wheel-button span, .wheel span{ position: relative; -moz-transition: all 1s ease; -webkit-transition: all 1s ease; -o-transition: all 1s ease; transition: all 1s ease; display: block; } .wheel-button.active span{ transform: rotate(135deg); -ms-transform: rotate(135deg); /* IE 9 */ -webkit-transform: rotate(135deg); /* Safari and Chrome */ } .wheel li a, .wheel li a:visited{ background: rgba(0,0,0,0.65); border-radius: 50px; font-weight: bold; padding: 10px; text-align: center; width: 20px; height: 20px; border: 1px solid black; box-shadow: 0 1px 2px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.5); -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.5); -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.5); color: white; -moz-transition: all 0.25s ease; -webkit-transition: all 0.25s ease; -o-transition: all 0.25s ease; transition: all 0.25s ease; } .wheel li a:hover{ background: rgba(0,0,0,0.8); } .main { float: left; width: 100%; margin: 0 auto; } .reload, .btn{ display: inline-block; border: 4px solid #FFF; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; background: rgba(255,255,255, 0.75); display: inline-block; line-height: 100%; padding: 0.7em; text-decoration: none; opacity: 0.7; color: #555; width: 100px; line-height: 140%; font-size: 17px; font-family: open sans; font-weight: bold; } .reload:hover, .btn:hover { background: white; } .btn { width: 200px; } .btns { width: 230px; margin: 50px auto; } .credit { text-align: center; color: #999; padding: 10px; margin: 0 0 40px 0; background: rgba(255,255,255,0.25); float: left; width: 100%; } .credit a { color: #555; text-decoration: none; font-weight: bold; } </style> <link rel="stylesheet" type="text/css" href="wheelmenu.css" /> <script> $(document).ready(function(){ $(".wheel-button").wheelmenu({ trigger: "hover", animation: "fly", animationSpeed: "fast" }); }); </script> </head> <body> <div class="wrapper"> <h1>jQuery Wheel Menu by Pete R.</h1> <h2>Add a fully customisable Path-like wheel menu button to your website</h2> <p class="credit">Created by <a href="http://www.thepetedesign.com">Pete R.</a>, Founder of <a href="http://www.bucketlistly.com" target="_blank">BucketListly</a></p> <div class="main"> <a href="#wheel" class="wheel-button"> <span>+</span> </a> <div class="pointer">Hover me</div> <ul id="wheel" data-angle="all"> <li class="item"><a href="#home">A</a></li> <li class="item"><a href="#home">B</a></li> <li class="item"><a href="#home">C</a></li> <li class="item"><a href="#home">D</a></li> <li class="item"><a href="#home">E</a></li> <li class="item"><a href="#home">F</a></li> <li class="item"><a href="#home">G</a></li> <li class="item"><a href="#home">H</a></li> <li class="item"><a href="#home">I</a></li> <li class="item"><a href="#home">J</a></li> </ul> <div class="btns"> <a class="reload btn" href="https://github.com/peachananr/wheel-menu">Download on Github</a> </div> <a href="#wheel2" class="wheel-button ne"> <span>+</span> </a> <ul id="wheel2" data-angle="NE" class="wheel"> <li class="item"><a href="#home">A</a></li> <li class="item"><a href="#home">B</a></li> <li class="item"><a href="#home">C</a></li> <li class="item"><a href="#home">D</a></li> </ul> <a href="#wheel3" class="wheel-button nw"> <span>+</span> </a> <ul id="wheel3" data-angle="NW" class="wheel"> <li class="item"><a href="#home">A</a></li> <li class="item"><a href="#home">B</a></li> <li class="item"><a href="#home">C</a></li> <li class="item"><a href="#home">D</a></li> </ul> </div> <a href="https://github.com/peachananr/wheel-menu"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a> </div> </body> </html> ')}();