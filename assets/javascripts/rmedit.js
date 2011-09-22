// ==UserScript==
// @name redmine wiki edit
// @namespace http://evolvingweb.ca
// @description Adds double click automatic edit to redmine.
// @match https://rm.ewdev.ca/*
// @match http://rm.ewdev.ca/*
// ==/UserScript==


var s=document.createElement('script');

if (window.location.protocol == 'https:') {
  s.src = 'https';
}
else {
  s.src = 'http:';
}

s.src += '//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js' ;

s.onload = function() {
  var s = document.createElement('script');
  s.appendChild(document.createTextNode("(" + ready.toString() + ")(jQuery)"));
  document.head.appendChild(s);
};

document.getElementsByTagName('head')[0].appendChild(s);

function ready($) {

  $('.wiki').dblclick(function test() {
  	var killHash = /#.*$/;
  	jQuery.noConflict();
  	document.location += document.location.replace(killHash, '') + '/edit';
  });

}

