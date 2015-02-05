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
  $(document).on('dblclick', 'body.controller-issues #issue_tree', function (event) {
      doWhatRedmineDoes(event, $(this).find('.contextual a:contains("Add")'));
  });

  //  Issue comments
  $(document).on('dblclick', 'body.controller-issues .wiki.editable', function (event) {
      doWhatRedmineDoes(event, $(this).find('.contextual a[title="Edit"]'));
  });

  // Update issue
  $(document).on('dblclick',
                 'body.controller-issues .issue.details .attributes, ' +
                 'body.controller-issues .issue.details .author, ' +
                 'body.controller-issues .issue.details .subject', function (event) {
      path = document.location.pathname + '/edit';
      issue_edit = $('#content .contextual:first ' + 'a[href="' +  path + '"]')
      doWhatRedmineDoes(event, [issue_edit]);
  });


  // Edit description
  $(document).on('dblclick',
                 'body.controller-issues .issue.details .wiki, ' +
                 'body.controller-issues .issue.details .description', function (event) {
      path = document.location.pathname + '/edit';
      issue_edit = $('#content .contextual:first ' + 'a[href="' +  path + '"]');
      description_edit = $('#all_attributes img[alt="Edit"]').parent();
      doWhatRedmineDoes(event, [issue_edit, description_edit]);
  });

  // Related issues
  $(document).on('dblclick', 'body.controller-issues #relations', function (event) {
    doWhatRedmineDoes(event, $(this).find('.contextual a:contains("Add")'));
  });

});

