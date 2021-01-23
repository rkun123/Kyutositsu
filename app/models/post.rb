class Post < ApplicationRecord
    belongs_to :user
    has_many :taggings, dependent: :destroy
    has_many :tags, through: :taggings

    validate :post_without_tags_is_disallowed
    validates :content, length: { minimum: 1 }

    after_update do
        tags.each do |tag|
            PostChannel.broadcast_to_update(
                tag,
                self.to_json(include: { user: {}, tags: {}})
            )
        end
    end

    private

    def post_without_tags_is_disallowed
        errors.add(:tags, 'Post without tags is not allowed') if tags.size == 0
    end

end
