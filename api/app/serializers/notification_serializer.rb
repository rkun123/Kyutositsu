class NotificationSerializer < ApplicationSerializer
  belongs_to :user, serializer: UserSerializer
  belongs_to :favorite, serializer: FavoriteSerializer
end