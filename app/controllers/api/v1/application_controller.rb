class Api::V1::ApplicationController < ApplicationController
  skip_before_action :verify_authenticity_token

  def not_found
    head :not_found
  end
end