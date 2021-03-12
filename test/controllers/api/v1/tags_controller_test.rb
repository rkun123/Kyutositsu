require 'test_helper'

class Api::V1::TagsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "should create tag" do
    get api_v1_tags_url
    assert_response :success
  end
end
