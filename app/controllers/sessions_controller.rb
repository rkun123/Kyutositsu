class SessionsController < ApplicationController
    skip_before_action :authenticate_user!

    def create
        puts auth_hash
        @user = User.find_for_oauth(auth_hash)
        puts @user
        session[:user_id] = @user.id
        redirect_to '/'
    end

    def destroy
        session[:user_id] = nil
        puts 'Logout'
        redirect_to '/'
    end

    private
    
    def auth_hash
        puts request.env
        request.env['omniauth.auth']
    end

    def redirect_url
        redirect_url = request.params['redirect_url']
        redirect_url = '/' unless redirect_url
        redirect_url
    end
end
