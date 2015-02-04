// TODO: This file should only be included on wiki edit pages along with its 
// associated files...

/*
 * Adapted from http://stackoverflow.com/questions/5458655/jquery-scroll-textarea-to-given-position
 * Buggy, hacky but kinda works in initial testing.
 */
jQuery.fn.scrollToText = function(charNo) {
  // getting given textarea contents
  var text = jQuery(this).text();
  // number of characters we want to show

  //EWHACK we're assuming the arg is a regexp
  
  // this SPAN will allow us to determine given character position
  //EWHACK 
  var anch = '<span height="1px" id="anch">.</span>';
  // inserting it after the character into the text
  text = text.substring(0, charNo) + anch + text.substring(charNo);

  // creating a DIV that is an exact copy of textarea
  // NB: I inspected the CSS of copyDiv and found all properties that the redmine
  // theme is setting. If the offsetting breaks, redo this.
  var copyDiv = jQuery('<div id="copy"></div>')
                  .append(text.replace(/\n/g, '<br />')) // making newlines look the same
                  .css('width', jQuery(this).attr('clientWidth')) // width without scrollbar
                  .css('font-size', jQuery(this).css('font-size'))
                  .css('font-family', jQuery(this).css('font-family'))
                  .css('line-height', jQuery(this).css('line-height'))
                  .css('padding', jQuery(this).css('padding'));

  // inserting new div after textarea - this is needed because .position() wont work on invisible elements
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

/*
 * Try to jump the cursor to the text that was double clicked upon in the last page. 
 * If this fails then just stay at the top of the edit page.
 */
jQuery(function ($) {
    var cookieData = $.cookie('redmine-easy-edit-caret-wiki-target');
    if (!cookieData) {
      return;
    }
    $.cookie('redmine-easy-edit-caret-wiki-target', null, {'path' : '/'});
    cookieData = JSON.parse(cookieData);
    //cookieData = new RegExp(cookieData.titleRegex);

    // Select appropriate heading
    var elem = $('body.controller-wiki textarea.wiki-edit').first();
    // Workaround for bug in jquery.caret
    if (elem.length) {
      var match = elem.ewDmp(cookieData.matchPattern, {suggestedLocation: cookieData.matchSuggestedLocation});
      if (match.start != -1) {
        elem.scrollToText(match.start);
        elem.caret(match.start, match.end);
      }
    }
});
