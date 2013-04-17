require 'haml'
###
# Compass
###

# Susy grids in Compass
# First: gem install susy
# require 'susy'

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'app/assets/stylesheets'
set :js_dir, 'app/assets/javascripts'
set :images_dir, 'app/assets/images'

activate :sprockets

after_build do
  `cp build/app/assets/javascripts/keylauncher.js keylauncher.js`
  `uglifyjs keylauncher.js > keylauncher.min.js`
  `cp -r build/* .`
  `rm -rf images javascripts stylesheets`
end

# Build-specific configuration
configure :build do
  activate :relative_assets
end