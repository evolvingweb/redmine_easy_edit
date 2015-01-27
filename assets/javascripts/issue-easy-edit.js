jQuery(function ($) {

  // takes a jQuery selector (elements) which is assumed to give a list of <a>
  // tags we would have had to manually click on without this plugin.
  var doWhatRedmineDoes = function (event, elements) {
    if (event && !(event.ctrlKey || event.metaKey)) {
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
      doWhatRedmineDoes(event, '#content .contextual a:contains("Edit")');
    });


  // Edit description
  $('body.controller-issues .issue.details .wiki, body.controller-issues .issue.details .subject').prev().andSelf()
    .dblclick(function (event) {
      // ideally, the selector should be img[alt="Edit"], but that won't work
      // given how `elements' is treated by doWhatRedmineDoes, hopefully
      // a[href="#"] doesn't collide with other thins.
      doWhatRedmineDoes(event, '#content .contextual a:contains("Edit"), #update .tabular a[href="#"]');
    });

  // Related issues
  $('body.controller-issues #relations').dblclick(function (event) {
    doWhatRedmineDoes(event, $(this).find('.contextual a:contains("Add")'));
  });

});

