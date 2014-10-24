require_dependency 'application_helper'

class EWEasyEditHook < Redmine::Hook::ViewListener
  def view_layouts_base_html_head(context={})

    # N.B. Try to include as little js as possible. 

    controller = context[:controller]

    return unless controller.class.name == "WikiController" or controller.class.name == "IssuesController"

    files = []

    if controller.class.name == "IssuesController" then
      files += %w{issue-easy-edit.js}
    elsif controller.class.name == "WikiController" then
    
      request = context[:request]
      action = request.parameters[:action]

      if action == "show" then
        files += %w{wiki-easy-edit.js jquery.cookie.js}
      elsif action == "edit" then
        files += %w{wiki-edit-jump.js jquery.cookie.js jquery.caret.1.02.min.js diff_match_patch.js}
      end
    end

    files.map do |file| 
      javascript_include_tag(file, :plugin=> 'redmine_easy_edit')
    end
  end
end

