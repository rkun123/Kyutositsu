require 'test_helper'

class UserSettingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_setting = user_settings(:one)
  end

  test "should get index" do
    get user_settings_url, as: :json
    assert_response :success
  end

  test "should create user_setting" do
    assert_difference('UserSetting.count') do
      post user_settings_url, params: { user_setting: { setting: @user_setting.setting, user_id_id: @user_setting.user_id_id } }, as: :json
    end

    assert_response 201
  end

  test "should show user_setting" do
    get user_setting_url(@user_setting), as: :json
    assert_response :success
  end

  test "should update user_setting" do
    patch user_setting_url(@user_setting), params: { user_setting: { setting: @user_setting.setting, user_id_id: @user_setting.user_id_id } }, as: :json
    assert_response 200
  end

  test "should destroy user_setting" do
    assert_difference('UserSetting.count', -1) do
      delete user_setting_url(@user_setting), as: :json
    end

    assert_response 204
  end
end
