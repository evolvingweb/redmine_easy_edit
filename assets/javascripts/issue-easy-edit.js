jQuery(function ($) {

  //  Literally.
  var doWhatRedmineDoes = function (event, elements) {
    // For Alex's irreversible habits...
    if ($('#loggedas a').text() !== "thomas" && event && !(event.ctrlKey || event.metaKey)) {
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

  //  Subtask editing
  $('body.controller-issues #issue_tree')
    .dblclick(function (event) {
      doWhatRedmineDoes(event, $(this).find('.contextual a:contains("Add")'));
    });

  //  Issue comments
  $('body.controller-issues .wiki.editable')
    .dblclick(function (event) {
      doWhatRedmineDoes(event, $(this).find('.contextual a[title="Edit"]'));
    });

  // Update issue
  $('body.controller-issues .issue.details .attributes')
    .dblclick(function (event) {
      doWhatRedmineDoes(event, '#content .contextual a:contains("Update")');
    });


  // Edit description
  var set = $('body.controller-issues .issue.details .wiki, body.controller-issues .issue.details .subject').prev().andSelf();
    set.dblclick(function (event) {
      doWhatRedmineDoes(event, '#content .contextual a:contains("Update"), #update .tabular legend a:contains("More")');
    });

  // Related issues
  $('body.controller-issues #relations').dblclick(function (event) {
    doWhatRedmineDoes(event, $(this).find('.contextual a:contains("Add")'));
  });

});

