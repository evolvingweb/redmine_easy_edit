jQuery(function ($) {

  // takes an array of jQuery objects and clicks through them. If a single
  // jQuery object is given, it's treated as an iterator.
  var doWhatRedmineDoes = function (event, elements) {
    if (event && !(event.ctrlKey || event.metaKey)) {
      return;
    }
    for (idx = 0; idx < elements.length; idx++) {
      element = elements[idx];
      if ($(element).attr('onclick')) {
        $(element).click();
      }
      else if ($(element).attr('href')) {
        document.location = $(element).attr('href');
      }
    }
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
  $('body.controller-issues .issue.details .attributes, ' +
    'body.controller-issues .issue.details .author, ' +
    'body.controller-issues .issue.details .subject')
    .dblclick(function (event) {
      path = document.location.pathname + '/edit';
      issue_edit = $('#content .contextual:first ' + 'a[href="' +  path + '"]')
      doWhatRedmineDoes(event, [issue_edit]);
    });


  // Edit description
  $('body.controller-issues .issue.details .wiki, body.controller-issues .issue.details .description').prev().andSelf()
    .dblclick(function (event) {
      path = document.location.pathname + '/edit';
      issue_edit = $('#content .contextual:first ' + 'a[href="' +  path + '"]');
      description_edit = $('#all_attributes img[alt="Edit"]').parent();
      doWhatRedmineDoes(event, [issue_edit, description_edit]);
    });

  // Related issues
  $('body.controller-issues #relations').dblclick(function (event) {
    doWhatRedmineDoes(event, $(this).find('.contextual a:contains("Add")'));
  });

});

