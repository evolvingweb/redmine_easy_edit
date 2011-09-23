jQuery(function ($) {
 	
	var highlightOnClick = function(highlightSet) {
  	// For Alex's irreversible habits...
  	if (event && ! event.ctrlKey) {
  		return;
  	}
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
  $('body.controller-wiki .wiki').dblclick(function (event) {
  	// For Alex's irreversible habits...
  	if (! event.ctrlKey) {
  		return;
  	}
  	var temporaryLocation = document.location.href;
// Kill everything after the hashmark if it exists.
  	temporaryLocation = temporaryLocation.replace(/#.*$/, '');
//    if the url ends in wiki, then we're on a front page, so the edit page is .../wiki/Wiki/edit
    var wiki = /\/wiki$/;
    if (wiki.test(temporaryLocation)) {
      temporaryLocation += '/Wiki';
    }
    // add edit and send in the location
    temporaryLocation += '/edit';
    
    document.location = temporaryLocation;
  });
//  subtask editing
  $('body.controller-issues #issue_tree')
  	.dblclick(function(event) {
	  		// For Alex's irreversible habits...
	  	if (event && ! event.ctrlKey) {
	  		return;
	  	}
	  	var element = $(this).find('.contextual a:eq(0)');
	  	if (element.attr('onclick')) {
	  		element.click();
	  	}
	  	else {
	  		document.location = element.attr('href');
	  	}
	  })
	  .click(function (event) {highlightOnClick.call(this);});
//  issue comments
  
  $('body.controller-issues .wiki.editable')
    .dblclick(function (event) {
    	// For Alex's irreversible habits...
    	if (event && ! event.ctrlKey) {
    		return;
    	}
  		$(this).find('.contextual a:eq(1)').click();
    })
    .click(function (event) {highlightOnClick.call(this);});
// update issue 
  $('body.controller-issues .issue.details .attributes')
  	.dblclick(function (event) {
  		// For Alex's irreversible habits...
    	if (event && ! event.ctrlKey) {
    		return;
    	}
	  	$('#content .contextual a:eq(0)').click();
	  })
	  .click(function (event) {highlightOnClick.call(this);});
  // Edit description
  var set = $('body.controller-issues .issue.details .wiki').prev().andSelf();
  	set.dblclick(function (event) {
  		// For Alex's irreversible habits...
    	if (event && ! event.ctrlKey) {
    		return;
    	}
	  	$('#content .contextual a:eq(0)').click();
	  	$('#update .tabular legend a:eq(0)').click();
	  })
	  .click(function (event) {highlightOnClick.call(this, set);});
  // Related issues
  $('body.controller-issues #relations').dblclick(function (event) {
  	// For Alex's irreversible habits...
  	if (event && ! event.ctrlKey) {
  		return;
  	}
  	$(this).find('.contextual a:eq(0)').click();
  })
  .click(function (event) {highlightOnClick.call(this);});
});

