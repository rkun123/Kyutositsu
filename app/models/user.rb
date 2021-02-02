class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  has_many :posts
  has_many :tokens
  has_many :favorites
  has_many :favorite_posts, source: :post, through: :favorites, dependent: :destroy
  has_one :user_setting

  # include DeviseTokenAuth::Concerns::User
  devise :rememberable, :omniauthable

  def self.find_for_oauth(auth) 
    puts auth
    Rails.logger.warn '----------------------'
    return User.where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user = User.create(
        name:     auth.extra.raw_info.name,
        provider: auth.provider,
        uid:      auth.uid,
        email:    auth.info.email,
        # token:    auth.credentials.token,
        password: Devise.friendly_token[0,20]
      )
    end
  end

  def create_default_user_setting()
    puts user_setting
    puts Rails.configuration.x.preferences
    default_user_setting = Rails.configuration.x.preferences['default_user_setting']
    build_user_setting(setting: default_user_setting).save
  end

end