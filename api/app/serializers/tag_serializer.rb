class TagSerializer < ApplicationSerializer
  attributes :name, :color
  belongs_to :created_by, serializer: UserSerializer
end
