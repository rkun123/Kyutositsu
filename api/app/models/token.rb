class Token < ApplicationRecord
  require 'date'
  require 'securerandom'

  belongs_to :user
  before_save :generate_uuid

  def self.issue(user)
    t = self.new(user: user)
    t.generate_uuid
    t.save!
    t
  end

  def self.user_by_token(token_uuid)
    t = self.find_by(uuid: token_uuid)
    nil unless t
    t.user
  end

  def generate_uuid
    self.uuid = SecureRandom.uuid
  end

end
