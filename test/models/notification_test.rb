require "test_helper"

class NotificationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test 'create notification by favorite' do
    def notification_count
      Notification.where(user: posts(:post_one).user).count
    end

    before_notification_count = notification_count

    favorite = posts(:post_one).favorites.build(user: users(:user_one))

    assert notification_count - before_notification_count == 1
    assert Notification.where(user: posts(:post_one).user, favorite: favorite).count == 1
  end
end
