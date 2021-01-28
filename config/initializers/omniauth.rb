# require File.expand_path('lib/omniauth/strategies/discord', Rails.root)
Rails.application.config.middleware.use OmniAuth::Builder do
    provider :discord, ENV['DISCORD_CLIENT_ID'], ENV['DISCORD_CLIENT_SECRET'], scope: 'email identify', callback_path: '/auth/discord/callback', provider_ignores_state: true
end