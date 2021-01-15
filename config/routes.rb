Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        omniauth_callbacks: 'api/v1/omniauth_callbacks'
      }
      resource :users
      resources :posts
    end
  end
end
