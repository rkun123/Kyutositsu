class Api::V1::FavoritesController < Api::V1::ApplicationController
    before_action :set_post

    def create
        return head 409 if @post.favorites.where(user: @current_user).count > 0

        favorite = @post.favorites.build(user: @current_user)
        

        if favorite.save
            render json: favorite
        else
            render json: favorite.errors, status: :unprocessable_entity
        end
    end

    def destroy
        favorite = @post.favorites.where(user: @current_user).first

        return head :not_found unless favorite

        if favorite.destroy
            return head :ok
        else
            return head :unprocessable_entity
        end
    end

    private 

    def set_post
        @post = Post.find(favorite_params[:post_id])
    end

    def favorite_params
        params.permit(:post_id)
    end
end
