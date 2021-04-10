class AssetSerializer < ApplicationSerializer
  attributes :file_type, :file, :url
  belongs_to :post, serializer: PostSerializer
end
