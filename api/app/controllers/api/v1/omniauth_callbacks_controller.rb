class Api::V1::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  include Devise::Controllers::Rememberable
  # skip_before_fileter! :authenticate_api_v1_user!

  def discord
    puts 'LOGIN!!!'
    @user = User.find_for_oauth(request.env['omniauth.auth'])
    puts @user

    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication
    else
      redirect_to new_user_registration_url
    end
  end

  def assign_provider_attrs(user, auth_hash)
    all_attrs = auth_hash["info"].slice(*user.attributes.keys)
    orig_val = ActionController::Parameters.permit_all_parameters
    ActionController::Parameters.permit_all_parameters = true
    permitted_attrs = ActionController::Parameters.new(all_attrs)
    permitted_attrs.permit({})
    user.assign_attributes(permitted_attrs)
    ActionController::Parameters.permit_all_parameters = orig_val
    user
  end

  def redirect_callbacks
    super
    puts session.to_s.length
  end

end
