Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        omniauth_callbacks: 'api/v1/omniauth_callbacks'
      }

      resources :users, :posts, :tags

      resource :user_settings, only: [:show, :update]

    end
  end
end
