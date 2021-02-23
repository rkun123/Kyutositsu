class HomeController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :current_user
  def index
    render file: 'public/index.html'
  end
end
