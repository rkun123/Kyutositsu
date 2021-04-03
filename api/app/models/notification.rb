class Notification < ApplicationRecord
  belongs_to :user, foreign_key: :user_id
  belongs_to :favorite, foreign_key: :favorite_id

  after_save :broadcast

  def set_favorite(favorite)
    # check not exist any other payloads
    self.favorite_id = favorite.id
  end

  private

  def broadcast
    serializer = NotificationSerializer.new(self)
    NotificationChannel.broadcast_to(
      self.favorite.post.user,
      serializer.to_json(include: {
        favorite: {
          post: {
            user: {},
            tags: {},
            assets: {},
            favorite_users: {}
          },
          user: {}
        }
      })
    )
  end
end
