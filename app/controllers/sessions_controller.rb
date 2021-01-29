class SessionsController < ApplicationController
    skip_before_action :authenticate_user!

    def create
        @user = User.find_for_oauth(auth_hash)

        set_user_cookie(@user)
        set_user_session(@user)

        redirect_to '/'
    end

    def destroy
        session[:user_id] = nil
        puts 'Logout'
        redirect_to '/'
    end

    private
    
    def auth_hash
        request.env['omniauth.auth']
    end

    def redirect_url
        redirect_url = request.params['redirect_url']
        redirect_url = '/' unless redirect_url
        redirect_url
    end
end
