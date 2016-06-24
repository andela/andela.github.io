require 'rubygems'
require 'optparse'
require 'yaml'
require 'fileutils'

ARGV.shift # remove first argument

namespace :create do 
  desc "Create new layout" 
  task :layout do 
    name = ARGV.pop.downcase
    template = ARGV.pop.downcase || 'default' 
    
    path = "_layouts/#{name}.html"

    if File.exists?(path)
      puts "Error layout already exists."
    else
      FileUtils.cp("_layouts/#{template}.html", path) 
    end
  end
  
  desc "Create new page"
  task :page do
    name = ARGV.pop.downcase
    layout = ARGV.pop.downcase
    
    path = "#{name}/index.html"
    if File.exists?(path) 
      puts "Error: page already exists."
    else
      Dir.mkdir name
      File.open(path, 'w') do |file|
        file.puts YAML.dump({ 'layout' => layout, 'title' => name.capitalize, 'css' => 'style', 'js' => ['app'] })
        file.puts '---'
        file.puts "\n"
        file.puts "<h1>#{name}</h1>"
      end

      File.open("#{name}/style.css", 'w') do |stylesheet|
        stylesheet.puts "/* Stylesheet for #{name.capitalize} */"
      end
      
      File.open("#{name}/app.js", 'w') do |js|
        js.puts "/* Script for #{name.capitalize} */"
      end
    end
  end
end

task :build do 
  system %{bundle exec jekyll build}
end

task :run do 
  system %{bundle exec jekyll serve}
end

task :default => [:run]
