class Tag < ApplicationRecord
    belongs_to :created_by, class_name: "User"
    has_many :posts, through: :taggings
end
