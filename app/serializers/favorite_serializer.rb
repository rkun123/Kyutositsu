class FavoriteSerializer < ApplicationSerializer
  belongs_to :user, serializer: UserSerializer
  belongs_to :post, serializer: PostSerializer
end
