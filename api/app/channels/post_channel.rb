class PostChannel < ApplicationCable::Channel

  def subscribed
    tag = Tag.find(tag_id)
    stream_for tag
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  class << self
    def broadcast_to_new(target, data)
      typed_broadcast_to(target, 'NEW', data)
    end

    def broadcast_to_delete(target, data)
      typed_broadcast_to(target, 'DELETE', data)
    end

    def broadcast_to_update(target, data)
      typed_broadcast_to(target, 'UPDATE', data)
    end

    private

    def typed_broadcast_to(target, type, payload)
      puts '[ACTION CABLE]', target, type, payload
      broadcast_to(target, {type: type, payload: payload})
    end

  end

  private

  def tag_id
    return params['tag_id'] if params.has_key?('tag_id')
    raise KeyError, 'param tag_id is missing'
  end
end