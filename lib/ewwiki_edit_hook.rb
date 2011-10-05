class EWWikiEditHook < Redmine::Hook::ViewListener
  def view_layouts_base_html_head(context={})
    javascript_include_tag("jquery.min.js", :plugin => 'redmine_easy_edit')+
      javascript_include_tag("jquery.noconflict.js", :plugin => 'redmine_easy_edit')+
      javascript_include_tag("jquery-ui-1.8.16.custom.min.js", :plugin => 'redmine_easy_edit')+
#      javascript_include_tag("jquery.caret.1.02.js", :plugin => 'redmine_easy_edit')+
      javascript_include_tag("jquery.caret.1.02.min.js", :plugin => 'redmine_easy_edit')+
      javascript_include_tag("jquery.cookie.js", :plugin => 'redmine_easy_edit')+
      javascript_include_tag("rmedit.js", :plugin => 'redmine_easy_edit')
  end
end

