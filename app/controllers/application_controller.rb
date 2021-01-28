class ApplicationController < ActionController::Base
  include AuthenticationHelper

  protect_from_forgery with: :null_session

  before_action :authenticate_user!
  before_action :current_user
end
