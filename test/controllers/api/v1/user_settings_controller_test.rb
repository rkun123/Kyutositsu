require 'test_helper'

class Api::V1::UserSettingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_setting = user_settings(:one)
  end

  test "should get index" do
    get api_v1_user_settings_url, as: :json
    assert_response :success
  end

  test "should create user_setting" do
    assert_difference('UserSetting.count') do
      post api_v1_user_settings_url, params: { user_setting: { setting: @user_setting.setting } }, as: :json
    end

    assert_response 201
  end
end
