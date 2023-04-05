require 'redmine'

require File.dirname(__FILE__) + '/lib/ew_easy_edit_hook'

Redmine::Plugin.register :redmine_easy_edit do
  name "Easy Edit Plugin"
  author 'Thomas Getgood'
  description 'Enable double click edit feature as in mediawiki.'
  version '0.0.6'
end

