/*
 * Adapted from http://stackoverflow.com/questions/5458655/jquery-scroll-textarea-to-given-position
 * Buggy, hacky but kinda works in initial testing.
 */
jQuery.fn.scrollToText = function(search) {
  // getting given textarea contents
  var text = jQuery(this).text();
  // number of charecter we want to show

  //EWHACK we're assuming the arg is a regexp
  var charNo = text.search(search);
  
  // this SPAN will allow up to determine given charecter position
  //EWHACK 
  var anch = '<span height="1px" id="anch">.</span>';
  // inserting it after the character into the text
  text = text.substring(0, charNo) + anch + text.substring(charNo);

  // creating a DIV that is an exact copy of textarea
  var copyDiv = jQuery('<div id="copy"></div>')
                  .append(text.replace(/\n/g, '<br />')) // making newlines look the same
                  .css('width', jQuery(this).attr('clientWidth')) // width without scrollbar
                  .css('font-size', jQuery(this).css('font-size'))
                  .css('font-family', jQuery(this).css('font-family'))
                  .css('padding', jQuery(this).css('padding'));

  // inserting new div after textarea - this is needed beacuse .position() wont work on invisible elements
  copyDiv.insertAfter(jQuery(this));
  // what is the position on SPAN relative to parent DIV?
  var pos = copyDiv.find('SPAN#anch').offset().top - copyDiv.find('SPAN#anch').closest('DIV').offset().top;

  // the text we are interested in should be at the middle of textearea when scrolling is done

  //EWHACK this line borks; is it necessary for us?
  //pos = pos - Math.round(jQuery(this).attr('clientHeight') / 2);
  if (pos > 100) {
    pos = pos - 100;
  }
 
  // now, we know where to scroll!
  jQuery(this).scrollTop(pos);
  // no need for DIV anymore
  copyDiv.remove();
};

jQuery(function ($) {
	var highlightOnClick = function(highlightSet) {
		var that = this;
  	// For Alex's irreversible habits...
  	if (event && ! (event.ctrlKey || event.metaKey)) {
  		return;
  	}
		// Make sure multiple clicks don't start a highlight/rehighlight queue.
		if (this.effectRunning) {
			return;
		}
		this.effectRunning = true;
		
		if (!highlightSet) {
			highlightSet = $(this);
		}
		highlightSet.effect("highlight", {}, 2000, function () {that.effectRunning = false;});
	};
	
//	Literally.
	var doWhatRedmineDoes = function (elements) {
		// For Alex's irreversible habits...
  	if (event && ! (event.ctrlKey || event.metaKey)) {
			return;
		}
		$(elements).each(
			function (index, element) {
		  	if ($(element).attr('onclick')) {
		  		$(element).click();
		  	}
		  	else {
		  		document.location = $(element).attr('href');  
		  	}		
			}
		)
	}
	
  var caretMove = function (term) {
    // Select appropriate heading
    var elem = $('body.controller-wiki textarea.wiki-edit');
    // Workaround for bug in jquery.caret
    if (elem.length) {
      elem.scrollToText(term);
      elem.caret(term);
    }
  };
  
  var caretSearch = $.cookie('redmine-easy-edit-caret-wiki-target');
  if (caretSearch) {
    $.cookie('redmine-easy-edit-caret-wiki-target', null, {'path' : '/'});

    caretSearch = new RegExp(caretSearch);
    caretMove(caretSearch);
  }

  var setCaretCookie = function (event) {
    var clickedElem = event.target;
    //if clicked on link, try acting on the parent heading
    if (clickedElem instanceof HTMLAnchorElement && 
        clickedElem.className == "wiki-anchor" && 
        clickedElem.parentElement instanceof HTMLHeadingElement) {
      clickedElem = clickedElem.parentElement;
    }
    //only act on clicked headings
    if (!clickedElem instanceof HTMLHeadingElement) {
      return false;
    }
    var wikiTarget =  clickedElem.localName + '\.\ +' + clickedElem.firstChild.textContent;
    $.cookie('redmine-easy-edit-caret-wiki-target', wikiTarget, {'path' : '/'});
  }

// 	Click handler for wiki pages.
  $('body.controller-wiki .wiki')
    .dblclick(function (event) {
        setCaretCookie(event);
        // console.log(event); 
        doWhatRedmineDoes('body.controller-wiki #content .contextual a:contains("Edit")');
        return false;
    }).click(function (event) {
      //prevent "wiki-anchor" links within heading from being control-clickable
      if(event.target.className == "wiki-anchor"  && (event.metaKey || event.ctrlKey)) {
        return false;
      }
    });

//  Subtask editing
  $('body.controller-issues #issue_tree')
  	.dblclick(function (event) {
	  	doWhatRedmineDoes($(this).find('.contextual a:contains("Add")'));
	  })
	  .click(function (event) {highlightOnClick.call(this);});
  
//  Issue comments
  $('body.controller-issues .wiki.editable')
    .dblclick(function (event) {
  		doWhatRedmineDoes($(this).find('.contextual a[title="Edit"]'));
    })
    .click(function (event) {highlightOnClick.call(this);});
  
// Update issue 
  $('body.controller-issues .issue.details .attributes')
  	.dblclick(function (event) {
	  	doWhatRedmineDoes('#content .contextual a:contains("Update")');
	  })
	  .click(function (event) {highlightOnClick.call(this);});
  

// Edit description
  var set = $('body.controller-issues .issue.details .wiki').prev().andSelf();
  	set.dblclick(function (event) {
	  	doWhatRedmineDoes('#content .contextual a:contains("Update"), #update .tabular legend a:contains("More")');
	  })
	  .click(function (event) {highlightOnClick.call(this, set);});
  	
// Related issues
  $('body.controller-issues #relations').dblclick(function (event) {
  	doWhatRedmineDoes($(this).find('.contextual a:contains("Add")'));
  })
  .click(function (event) {highlightOnClick.call(this);});
  
});

