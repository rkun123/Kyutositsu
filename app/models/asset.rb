class Asset < ApplicationRecord
  # type: 'IMAGE', 'VIDEO'
  belongs_to :post, optional: true

  mount_uploader :file, AssetUploader

  private 

end
