require 'redmine'

# R7: no loader.ignore / manual require — the EwEasyEditHook ViewListener
# (lib/ew_easy_edit_hook.rb) self-registers on Zeitwerk eager-load. refs #108530.
Redmine::Plugin.register :redmine_easy_edit do
  name "Easy Edit Plugin"
  author 'Thomas Getgood'
  description 'Enable double click edit feature as in mediawiki.'
  version '7.0.0'
  requires_redmine version_or_higher: '7.0.0'
end
