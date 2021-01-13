class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!
  def show
    @user = current_api_v1_user
    render json: @user
  end
end
