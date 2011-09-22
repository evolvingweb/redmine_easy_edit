// ==UserScript==
// @name redmine wiki edit
// @namespace http://evolvingweb.ca
// @description Adds double click automatic edit to redmine.
// @match https://rm.ewdev.ca/*
// @match http://rm.ewdev.ca/*
// ==/UserScript==


(function ($) {
 	
// 	Click handler for wiki pages.
  $('.wiki').not('.editable').dblclick(function () {
  	var loc = document.location.href;
// Kill everything after the hashmark if it exists.
  	loc = loc.replace(/#.*$/, '');
//    if the url ends in wiki, then we're on a front page, so the edit page is .../wiki/Wiki/edit
    var wiki = /\/wiki$/;
    if (wiki.test(loc)) {
      loc += '/Wiki';
    }
    // add edit and send in the location
    loc += '/edit';
    document.location = loc;
  });
//  subtask editing
  $('#issue_tree').dblclick(function(e) {
  	document.location = $('#issue_tree .contextual a').attr('href');
  	e.stopPropagation();
  });
//  issue update bubbles
  $('.wiki.editable').dblclick(function () {
  	$(this).find('.contextual a:eq(1)').click();
  });
// update issue 
  $('.issue.details').dblclick(function () {
  	$('#content .contextual a:eq(0)').click();
  	$('#update .tabular legend a:eq(0)').click();
  });
  $('#relations').dblclick(function (e) {
  	$(this).find('.contextual a:eq(0)').click();
  	e.stopPropagation();
  });

})(jQuery);