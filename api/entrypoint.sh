gem install bundler -v 2.1.4

bundle update mimemagic
bundle install

rails db:migrate

rm -r /app/tmp/pids

rails s