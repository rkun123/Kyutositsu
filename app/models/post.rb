class Post < ApplicationRecord
    require 'cgi/util'
    require 'uri'

    belongs_to :user
    has_many :taggings, dependent: :destroy
    has_many :tags, through: :taggings
    has_many :favorites
    has_many :favorite_users, source: :user, through: :favorites, dependent: :destroy
    has_many :assets, dependent: :destroy

    validate :post_without_tags_is_disallowed
    validates :content, length: { minimum: 1, maximum: Rails.configuration.x.preferences.post[:postMaxLetters] }

    before_save :content_processing
    before_save :define_column_size

    after_update do
        tags.each do |tag|
            serializer = PostSerializer.new(self)
            PostChannel.broadcast_to_update(
                tag,
                serializer.to_json(include: { user: {}, tags: {}, assets: {}, favorite_users: {}})
            )
        end
    end

    private

    def define_column_size
        puts Rails.configuration.x.preferences.post[:smallPostMaxLetters]
        if content.length > Rails.configuration.x.preferences.post[:smallPostMaxLetters]
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

    def content_processing
        formatted = CGI.escape_html(self.content)
        
        # URL to html a tag
        URI::extract(formatted, ['http', 'https']).uniq.each do |url|
            formatted.gsub!(url, "<a href=\"#{url}\" target=\"_blank\">#{url}</a>")
        end

        # break line
        formatted.gsub!("\n", "<br />")

        self.raw_content = formatted
    end

end
