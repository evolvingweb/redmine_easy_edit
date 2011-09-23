jQuery(function ($) {
 	
	var highlightOnClick = function(highlightSet) {
		var that = this;
		if (this.effectRunning) {
			return;
		}
		this.effectRunning = true;
		
		if (!highlightSet) {
			highlightSet = $(this);
		}
		highlightSet.effect("highlight", {}, 2000, function () {that.effectRunning = false;});
	};
	
// 	Click handler for wiki pages.
  $('body.controller-wiki .wiki').dblclick(function () {
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
  })
//  subtask editing
  $('body.controller-issues #issue_tree').dblclick(function(e) {
  	var element = $(this).find('.contextual a:eq(0)');
  	if (element.attr('onclick')) {
  		element.click();
  	}
  	else {
  		document.location = element.attr('href');
  	}
//  	e.stopPropagation();
  })
  .click(function () {highlightOnClick.call(this);});
//  issue comments
  
  $('body.controller-issues .wiki.editable')
    .dblclick(function () {
  		$(this).find('.contextual a:eq(1)').click();
    })
    .click(function () {highlightOnClick.call(this);});
// update issue 
  $('body.controller-issues .issue.details .attributes')
  	.dblclick(function () {
	  	$('#content .contextual a:eq(0)').click();
	  })
	  .click(function () {highlightOnClick.call(this);});
  // Edit description
  var set = $('body.controller-issues .issue.details .wiki').prev().andSelf();
  	set.dblclick(function (e) {
		  	$('#content .contextual a:eq(0)').click();
		  	$('#update .tabular legend a:eq(0)').click();
		  })
		  .click(function () {highlightOnClick.call(this, set);});
  // Related issues
  $('body.controller-issues #relations').dblclick(function (e) {
  	$(this).find('.contextual a:eq(0)').click();
//  	e.stopPropagation();
  })
  .click(function () {highlightOnClick.call(this);});
});

