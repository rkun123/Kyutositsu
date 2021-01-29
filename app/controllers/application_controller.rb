class ApplicationController < ActionController::Base
  include AuthenticationHelper

  before_action :authenticate_user!
  before_action :current_user
end
