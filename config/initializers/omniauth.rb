# require File.expand_path('lib/omniauth/strategies/discord', Rails.root)
Rails.application.config.middleware.use OmniAuth::Builder do
end