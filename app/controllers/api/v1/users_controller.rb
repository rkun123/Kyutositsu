class Api::V1::UsersController < Api::V1::ApplicationController

  def index
    render json: @current_user
  end

  def show
    user = User.where(user_params)
    puts user.count
    if user.count > 0
      render json: user
    else
      render json: user, status: :not_found
    end
  end


  private

  # Only allow a trusted parameter "white list" through.
  def user_params
    # params.permit(:content, :color, taggings_attributes: [:id, :tag])
    params.permit(:id)
  end
end
