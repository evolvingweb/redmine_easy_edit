/*
 * Adapted from http://stackoverflow.com/questions/5458655/jquery-scroll-textarea-to-given-position
 * Buggy, hacky but kinda works in initial testing.
 */
jQuery.fn.scrollToText = function(charNo) {
  // getting given textarea contents
  var text = jQuery(this).text();
  // number of charecter we want to show

  //EWHACK we're assuming the arg is a regexp
  //var charNo = text.search(search);
  //console.log(this);
  //console.log(this.text());
  //console.log(search);
  //console.log(charNo);
  
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

/*
 * Performs a fuzzy search on set based on pattern, suggested starting location.
 * @see http://neil.fraser.name/software/diff_match_patch/svn/trunk/demos/demo_match.html
 * @see http://neil.fraser.name/software/diff_match_patch/svn/trunk/javascript/diff_match_patch_uncompressed.js
 */
jQuery.fn.ewDmp = function (pattern,options) {
  if ( ! this.length > 0 || !pattern ) { 
    return -1;
  }

  var dmp = new diff_match_patch();
  var text = this.text();

  if (options.suggestedLocation) {
    options.suggestedLocation = Math.round( options.suggestedLocation * text.length );
  }
  // console.log("SUGG "+options.suggestedLocation);

  var settings = { 
    distance: 1000.0, 
    threshold: 0.8,
    suggestedLocation: 100,
  }
  jQuery.extend( settings, options );
    
  dmp.Match_Distance = settings.distance;
  dmp.Match_Threshold = settings.threshold;
  //dmp.Match_MaxBits == 32 ; //at least for Chrome

  var match = dmp.match_main(text, pattern, settings.suggestedLocation);

  if (match == -1) {
    // console.log("Failed to find match");
    return -1;
  } else {
    var endMatch = text.indexOf("\n", match);
    if (endMatch == -1) { 
      endMatch = text.length + 1;
    }
    // var quote = text.substring(match, endMatch - 1);
    // quote = quote.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // quote = quote.replace(/\n/g, '&para;');
    // console.log( 'Match found at character ' + match + ': &nbsp; <CODE>' + quote + '</' + 'CODE>');
  }
  return {start:match, end:endMatch};
}


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
	
  var caretMove = function () {
    var cookieData = $.cookie('redmine-easy-edit-caret-wiki-target');
    //console.log("CARET SEARCH: ");
    //console.log(cookieData);
    if (!cookieData) {
      return;
    }
    $.cookie('redmine-easy-edit-caret-wiki-target', null, {'path' : '/'});
    cookieData = JSON.parse(cookieData);
    //cookieData = new RegExp(cookieData.titleRegex);
    // console.log(cookieData);

    // Select appropriate heading
    var elem = $('body.controller-wiki textarea.wiki-edit').first();
    // Workaround for bug in jquery.caret
    if (elem.length) {
      var match = elem.ewDmp(cookieData.matchPattern, {suggestedLocation: cookieData.matchSuggestedLocation});
      // console.log("A"); console.log(match);
      if (match.start != -1) {
        elem.scrollToText(match.start);
        elem.caret(match.start, match.end);
      }
    }
  };

  //TODO: move this somewhere better since it's top level!!
  caretMove();
  

  var setCaretCookie = function (event) {
    var determineParentHeader = function (clickedElem) {
      if ( $(clickedElem).is('a.wiki-anchor') && $(clickedElem).parent().is(':header')) {
        clickedElem = clickedElem.parentElement;
      }
      //only act on clicked headings
      if (!$(clickedElem).is(':header')) {
        //try finding a nearest preceding parent (get top level parent div, then get previous header)
        var prevHeader, prevSiblingHeader;
        var topElem = $(clickedElem)
          .parentsUntil('.wiki')
          .last();
        if ( topElem.is(':header')) {
        //if clicked within a heading tag
          prevHeader = topElem;
        } else { 
        //if clicked not within a heading tag
          prevHeader = topElem.prevAll(':header').first();
        }
        if (prevHeader.length) {
          clickedElem = prevHeader.get(0);
        } else {
          prevSiblingHeader = $(clickedElem).prevAll(':header').first();
          if (prevSiblingHeader.length) {
            clickedElem = prevSiblingHeader.get(0);
          }
          else {
            return false;
          }
        }
      }
      return clickedElem;

    }

    var makeLiteralPattern = function (str) {
      str = str.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\\$1");
      return str;
    }
    //console.log("clicked on this dude");
    //console.log(event);
    var parentHeader = determineParentHeader(event.target);
    var titleSearchString = $(parentHeader).contents(':not(a.wiki-anchor)').map( function() { 
        //console.log("MAPPING");
        //console.log($(this).text());
        return makeLiteralPattern($(this).text()); 
    }).get().join(".*");

    var wikiTarget =  makeLiteralPattern(parentHeader.localName) + '\\.\ +.*' + titleSearchString;
    // console.log("D");
    // console.log(wikiTarget);
    // console.log(titleSearchString);
    // return true;
    // console.log(event);
    
    //EWHACK: trying another approach
    var matchPattern = event.target.innerText.substring(0,32);
    // console.log(event.target);
    // console.log(jQuery(event.target).offset());
    // console.log(event.currentTarget);
    // console.log(jQuery(event.currentTarget).offset());
    var clickedItemWikiOffset =  jQuery(event.target).offset().top - jQuery(event.currentTarget).offset().top;
    var matchSuggestedLocation = clickedItemWikiOffset / event.currentTarget.offsetHeight; 
    var cookieStr = JSON.stringify( {titleRegex:wikiTarget, 'matchPattern':matchPattern, 'matchSuggestedLocation': matchSuggestedLocation});
    // console.log(cookieStr);
    // return true;

    $.cookie('redmine-easy-edit-caret-wiki-target', cookieStr, {'path' : '/'});
    return false;
  }

// 	Click handler for wiki pages.
  $('body.controller-wiki .wiki')
    .dblclick(function (event) {
      // For Alex's irreversible habits...
      if (event && ! (event.ctrlKey || event.metaKey)) {
        return;
      }
        var stopRedmineClick = setCaretCookie(event);
        if (!stopRedmineClick) { 
          doWhatRedmineDoes('body.controller-wiki #content .contextual a:contains("Edit")');
          return false;
        } else { 
          return true;
        }
    }).click(function (event) {
      //  setCaretCookie(event);
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
  var set = $('body.controller-issues .issue.details .wiki, body.controller-issues .issue.details .subject').prev().andSelf();
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

