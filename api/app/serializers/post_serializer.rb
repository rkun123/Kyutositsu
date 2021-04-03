class PostSerializer < ApplicationSerializer
  attributes :raw_content, :content, :color, :column_size
  belongs_to :user, serializer: UserSerializer
  has_many :tags, serializer: TagSerializer
  has_many :favorite_users, serializer: UserSerializer
  has_many :assets, serializer: AssetSerializer
end
