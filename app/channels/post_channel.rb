class PostChannel < ApplicationCable::Channel
  def subscribed
    tag = Tag.find(tag_id)
    stream_for tag
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private

  def tag_id
    return params['tag_id'] if params.has_key?('tag_id')
    raise KeyError, 'param tag_id is missing'
  end
end
