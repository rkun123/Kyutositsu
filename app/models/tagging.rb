class Tagging < ApplicationRecord
    belongs_to :post
    belongs_to :tag

    after_create do
        serializer = PostSerializer.new(self.post)
        PostChannel.broadcast_to_new(
            tag,
            serializer.to_json(include: { user: {}, tags: {}, assets: {}, favorite_users: {} })
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
