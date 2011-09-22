require 'redmine'

require_dependency 'ewwiki_edit_hook'

Redmine::Plugin.register :redmine_easy_edit do
  name "Easy Edit Plugin"
  author 'Thomas Getgood'
  description 'Enable double click edit feature as in mediawiki.'
  version '0.0.1'
end

