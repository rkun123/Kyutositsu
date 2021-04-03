Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      # mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        # omniauth_callbacks: 'api/v1/omniauth_callbacks'
      # # }
      resources :users, :tags

      resources :posts do
        resource :favorite, only: [:create, :destroy]
      end

      resources :notifications, only: [:index]

      resource :user_settings, only: [:show, :update]

      resources :assets, only: [:show, :create, :delete]

      post '/favorites', to: 'favorites#create'

      match '/*path', to: 'application#not_found', via: :all
    end
  end

  get '/auth/:provider/callback', to: 'sessions#create'
  get '/auth/logout', to: 'sessions#destroy'

  # Frontend
  get '/*path', to: 'home#index'

end
