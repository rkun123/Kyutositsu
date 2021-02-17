class AssetSerializer < ApplicationSerializer
  attributes :file_type, :file
  belongs_to :post, serializer: PostSerializer
end
