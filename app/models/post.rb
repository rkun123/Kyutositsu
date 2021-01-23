class Post < ApplicationRecord
    belongs_to :user
    has_many :taggings, dependent: :destroy
    has_many :tags, through: :taggings

    validate :post_without_tags_is_disallowed
    validates :content, length: { minimum: 1 }

    def broadcast_to_clients
        tags.each do |tag|
            PostChannel.broadcast_to(
                tag,
                self.to_json(include: { user: {}, tags: {} })
            )
        end
    end

    private

        def post_without_tags_is_disallowed
            errors.add(:tags, 'Post without tags is not allowed') if tags.size == 0
        end

end
