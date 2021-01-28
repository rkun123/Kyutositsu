module AuthenticationHelper
  def current_user
    return @current_user if @current_user
    begin
      if session[:user_id]
        # Use session
        @current_user ||= User.find(session[:user_id])
      elsif cookies[:_idobata_token]
        # Use cookie token
        puts "cookie", cookies[:_idobata_token]
        token_uuid = cookies[:_idobata_token]
        @current_user = Token.user_by_token(token_uuid)
        set_user_session(@current_user)
      end

      puts @current_user.name
      @current_user
    rescue Exception => e
      nil
    end
  end

  def user_signed_in?
    return true if current_user
  end

  def correct_user?
    @user = User.find(params[:id])
    unless current_user == @user
      redirect_to root_url, :alert => "Access denied."
    end
  end

  def authenticate_user!
    if !current_user
      head 401
    end
  end

  def set_user_session(user)
    session[:user_id] = user.id
  end

  def set_user_cookie(user)
    token = Token.issue(@user)
    cookies.signed.permanent[:_idobata_token] = token.uuid
  end
    

end