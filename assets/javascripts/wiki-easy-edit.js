/* 
 * Register a click handler on wiki pages that saves the text clicked on to a cookie and then 
 * redirects to the edit page. 
 */
jQuery(function($) {

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
      if (typeof(str) === 'undefined' || typeof(str) !== 'string') {
        return '';
      }
      str = str.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\\$1");
      return str;
    }
    var parentHeader = determineParentHeader(event.target);
    var titleSearchString = $(parentHeader).contents(':not(a.wiki-anchor)').map( function() { 
        return makeLiteralPattern($(this).text()); 
    }).get().join(".*");

    var wikiTarget =  makeLiteralPattern(parentHeader.localName) + '\\.\ +.*' + titleSearchString;
    
    //EWHACK: trying another approach
    var matchPattern = event.target.innerText.substring(0,32);

    var clickedItemWikiOffset =  jQuery(event.target).offset().top - jQuery(event.currentTarget).offset().top;
    var matchSuggestedLocation = clickedItemWikiOffset / event.currentTarget.offsetHeight; 
    var cookieStr = JSON.stringify( {titleRegex:wikiTarget, 'matchPattern':matchPattern, 'matchSuggestedLocation': matchSuggestedLocation});
    // return true;

    $.cookie('redmine-easy-edit-caret-wiki-target', cookieStr, {'path' : '/'});
    return false;
  }

// 	Click handler for wiki pages.
  $('body.controller-wiki .wiki')
    .dblclick(function (event) {
      // For Alex's irreversible habits...
      if (!$('#loggedas a').text() === "thomas" && event &&!(event.ctrlKey || event.metaKey)) {
        return;
      }
      setCaretCookie(event);
      document.location = $('body.controller-wiki #content .contextual a:contains("Edit")').attr('href');
      });
});
