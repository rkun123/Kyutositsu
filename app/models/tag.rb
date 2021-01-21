class Tag < ApplicationRecord
    belongs_to :created_by, class_name: 'User', foreign_key: :created_by_id
    has_many :posts, through: :taggings

    validates :name, presence: true, uniqueness: true
end
