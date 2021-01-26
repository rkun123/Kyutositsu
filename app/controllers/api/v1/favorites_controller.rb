class Api::V1::FavoritesController < ApplicationController
    def create
        return head 409 if Favorite.where(favorite_params).count > 0

        @favorite = Favorite.new(favorite_params)

        if @favorite.save
            render json: @favorite
        else
            render json: @favorite.errors, status: :unprocessable_entity
        end
    end

    private 

    def favorite_params
        puts "params"
        puts params.permit(:user_id, :post_id)
        params.require(:favorite).permit(:user_id, :post_id)
    end
end
