class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  include DeviseTokenAuth::Concerns::User
  devise :rememberable, :omniauthable

  def self.find_for_oauth(auth) 
    Rails.logger.warn '----------------------'
    return User.where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user = User.create(
        name:     auth.extra.raw_info.name,
        provider: auth.provider,
        uid:      auth.uid,
        email:    auth.info.email,
        token:    auth.credentials.token,
        password: Devise.friendly_token[0,20]
      )
    end
  end
  
end