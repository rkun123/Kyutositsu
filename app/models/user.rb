class User < ApplicationRecord

  has_many :posts, dependent: :destroy
  has_many :tokens, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorite_posts, source: :post, through: :favorites, dependent: :destroy
  has_one :user_setting, dependent: :destroy

  def self.find_for_oauth(auth) 
    puts auth.to_json
    puts auth.info.name
    Rails.logger.warn '----------------------'
    return User.where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.name = auth.info.name,
      user.nickname = auth.info.name,
      user.image = auth.info.image,
      user.provider = auth.provider,
      user.uid = auth.uid,
      user.email = auth.info.email,
      user.token = auth.credentials.token,
      user.refresh_token = auth.credentials.refresh_token,
      user.expires_at = auth.credentials.expires_at
    end
  end

  def create_default_user_setting()
    default_user_setting = Rails.configuration.x.preferences['default_user_setting']
    build_user_setting(setting: default_user_setting).save
  end

end