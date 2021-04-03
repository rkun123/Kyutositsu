require 'test_helper'

class Api::V1::TagsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "shoud create tag" do
    get tags_url
    assert_response :success
  end
end
