ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'cookies_helper'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  def set_token_cookie
    cookies[:_idobata_token] = tokens(:one).uuid
    puts cookies.to_hash
    puts cookies.signed.to_hash
    cookies
  end

  def get_token
    tokens(:one).uuid
  end
end