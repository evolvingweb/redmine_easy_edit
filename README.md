# Redmine Easy Edit

This Redmine plugin add mediawiki-style double-click-to-edit workflow to Redmine wiki
pages and issue pages.

## Wiki

While holding down CMD (or CTRL on Windows), double-clicking on line in a
rendered wiki page brings up the edit form with that line highlighted.
The line detection isn't perfect, but works most of the time.

![](https://raw.github.com/evolvingweb/redmine-easy-edit/master/demo.gif)

## Issues

You can similarly Cmd+Doubleclick on issue title, issue description, issue
comment body, issue subtask box, related issues box, and the appropriate form
is launched. No line detection is performed.

## Installation

Simply extract/clone to the vendor/plugins folder of your Redmine installation.

## To Do

1. Add user specific controls to enable/disable the plugin and choose the meta-key (e.g. just double-click, ctrl-dblclick, super-dblclick, etc.).
2. Improve the wiki-jumping accuracy.

## Contributions

Pull requests welcome. 
