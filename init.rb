require 'redmine'
Rails.configuration.to_prepare do
  require_dependency 'ew_easy_edit_hook'
end
Redmine::Plugin.register :redmine_easy_edit do
  name "Easy Edit Plugin"
  author 'Thomas Getgood'
  description 'Enable double click edit feature as in mediawiki.'
  version '0.0.6'
end

