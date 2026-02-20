require 'redmine'

# Tell Zeitwerk to ignore this plugin's lib directory
plugin_lib = File.join(File.dirname(__FILE__), 'lib')
Rails.autoloaders.each { |loader| loader.ignore(plugin_lib) }

# Require plugin files
require File.join(plugin_lib, 'ew_easy_edit_hook')

Redmine::Plugin.register :redmine_easy_edit do
  name "Easy Edit Plugin"
  author 'Thomas Getgood'
  description 'Enable double click edit feature as in mediawiki.'
  version '6.0.0'
end
