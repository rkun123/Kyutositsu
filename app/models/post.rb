class Post < ApplicationRecord
    belongs_to :user
    has_many :taggings, dependent: :destroy
    has_many :tags, through: :taggings

    validate :post_without_tags_is_disallowed
    validates :content, length: { minimum: 1, maximum: Rails.configuration.x.preferences['post']['postMaxLetters'] }

    before_save :define_column_size

    after_update do
        tags.each do |tag|
            PostChannel.broadcast_to_update(
                tag,
                self.to_json(include: { user: {}, tags: {}})
            )
        end
    end

    private

    def define_column_size
        puts Rails.configuration.x.preferences['post']['smallPostMaxLetters']
        if content.length > Rails.configuration.x.preferences['post']['smallPostMaxLetters']
            self.column_size = 2
        else
            self.column_size = 1
        end
        puts self.column_size
        self
    end

    def post_without_tags_is_disallowed
        errors.add(:tags, 'Post without tags is not allowed') if tags.size == 0
    end

end
