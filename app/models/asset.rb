class Asset < ApplicationRecord
  # type: 'IMAGE', 'VIDEO'
  before_save :set_file_type

  belongs_to :post, optional: true

  mount_uploader :file, AssetUploader

  private 

  def set_file_type
    if self.file.content_type.include?('image/')
      self.file_type = 'IMAGE'
    elsif self.file.content_type.include?('video/')
      self.file_type = 'VIDEO'
    end
  end

end
