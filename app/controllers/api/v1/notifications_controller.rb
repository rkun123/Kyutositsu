class Api::V1::NotificationsController < Api::V1::ApplicationController
    
    def index
        limit = post_index_params['limit'] || Rails.application.config.x.preferences['page_size']
        offset = post_index_params['offset'] || 0
        @notifications = Notification.where(user: @current_user).includes({favorite: { post: {} }, user: {}}).limit(limit).offset(offset)
        

        render json: @notifications, include: 'favorite.**'
    end

    private

    def post_index_params
      params.permit(:limit, :offset, tag: [])
    end
end
