gem install bundler -v 2.1.4

echo "[Notif] bundler is caught.\n"

bundle update mimemagic
bundle install

echo "[Notif] package is caught.\n"

rails db:migrate
rails s