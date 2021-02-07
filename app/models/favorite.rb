class Favorite < ApplicationRecord
  belongs_to :user, foreign_key: :user_id
  belongs_to :post, foreign_key: :post_id
  has_one :notification, dependent: :destroy
  before_save :create_notification
  after_save :save_notification

  private

  def create_notification
    @notification = Notification.new(user_id: self.post.user.id)
  end

  def save_notification
    @notification.set_favorite(self)
    @notification.save
  end

end
