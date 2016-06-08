require 'rubygems'
require 'optparse'
require 'yaml'
require 'fileutils'

ARGV.shift # remove first argument

namespace :create do 
  desc "Create new layout" 
  task :layout do 
    name = ARGV.pop
    template = ARGV.pop || 'default' 
    
    path = "_layouts/#{name}.html"

    if File.exists?(path)
      puts "Error layout already exists."
    else
      FileUtils.cp("_layouts/#{template}.html", path) 
    end
  end
  
  desc "Create new page"
  task :page do
    name = ARGV.pop
    layout = ARGV.pop

    path = "#{name}/index.html"
    if File.exists?(path) 
      puts "Error: page already exists."
    else
      Dir.mkdir name
      File.open(path, 'w') do |file|
        file.puts YAML.dump({ 'layout' => layout })
        file.puts '---'
        file.puts "\n"
        file.puts "<h1>#{name}</h1>"
      end
    end
  end
end

task :run do 
  system %{bundle exec jekyll serve}
end

task :default => [:run]
