class Tagging < ApplicationRecord
    belongs_to :post
    belongs_to :tag

    after_create do
        PostChannel.broadcast_to_new(
            tag,
            post.to_json(include: { user: {}, tags: {} })
        )
    end

    before_destroy do
        puts 'DELETE', self
        PostChannel.broadcast_to_delete(
            tag,
            { id: post.id }
        )
    end

end
