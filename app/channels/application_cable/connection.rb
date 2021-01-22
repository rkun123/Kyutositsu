module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      if user = User.find_by(uid: filtered_params[:uid])
        if user.valid_token?(filtered_params[:authToken], filtered_params[:client])
          user
        end
      end
    end

    def filtered_params
      raise KeyError, "param 'uid' is missing." if !request.params.key?('uid') 
      raise KeyError, "param 'client' is missing." if !request.params.key?('client') 
      raise KeyError, "param 'authToken' is missing." if !request.params.key?('authToken') 
      return {
        uid: request.params['uid'],
        client: request.params['client'],
        authToken: request.params['authToken']
      }
    end
  end
end
