class EWWikiEditHook < Redmine::Hook::ViewListener
  def view_layouts_base_html_head(context={})
    javascript_include_tag("rmedit.js", :plugin => 'redmine_easy_edit') +
  end
end

