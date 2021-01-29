class Api::V1::UserSettingsController < Api::V1::ApplicationController
  before_action :authenticate_user!
  before_action :set_user_setting, only: [:show, :update]

  # GET /user_settings/1
  def show
    render json: @user_setting
  end

  # PATCH/PUT /user_settings/1
  def update
    if @user_setting.update(user_setting_params)
      render json: @user_setting
    else
      render json: @user_setting.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_setting
      @current_user.create_default_user_setting unless @current_user.user_setting
      @user_setting = @current_user.user_setting
    end

    # Only allow a trusted parameter "white list" through.
    def user_setting_params
      params.require(:user_setting).permit(setting: {})
    end
end
