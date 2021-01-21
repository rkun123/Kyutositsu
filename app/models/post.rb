class Post < ApplicationRecord
    belongs_to :user
    has_many :taggings, dependent: :destroy
    has_many :tags, through: :taggings

    validate :post_without_tags_is_disallowed

    private

        def post_without_tags_is_disallowed
            errors.add(:taggings, 'Post without tags is not allowed') if taggings.count == 0
        end

end
