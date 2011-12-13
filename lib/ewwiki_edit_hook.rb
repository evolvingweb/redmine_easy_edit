require_dependency 'application_helper'

class EWWikiEditHook < Redmine::Hook::ViewListener
  def view_layouts_base_html_head(context={})
    files = %w{jquery.min.js jquery.noconflict.js jquery-ui-1.8.16.custom.min.js jquery.caret.1.02.min.js
      jquery.cookie.js diff_match_patch.js json2.js issue-easy-edit.js wiki-easy-edit.js wiki-edit-jump.js}
    files.map { |a| javascript_include_tag(a, :plugin=> 'redmine_easy_edit') }.join

  end
end

