class Api::V1::PostsController < ApplicationController
  before_action :current_user
  before_action :authenticate_user!
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :post_index_params, only: [:index]

  # GET /posts
  def index
    limit = post_index_params['limit'] || Rails.application.config.x.preferences['page_size']
    offset = post_index_params['offset'] || 0
    @posts = Post.left_joins(:taggings).where(taggings: {tag_id: post_index_params['tag']})
      .or(Post.left_joins(:taggings).where(Tagging.arel_table[:tag_id].eq(nil)))
      .distinct().order(created_at: "DESC").limit(limit).offset(offset)


    render json: @posts, include: default_json_includes
  end

  # GET /posts/1
  def show
    render json: @post, include: default_json_includes
  end

  # POST /posts
  def create
    @post = Post.new(post_params)
    @post.user_id = current_api_v1_user.id

    if @post.color == nil
      color = RGB::Color.from_rgb_hex(0xFFCFCF)
      color.h = rand * 360
      @post.color = color.to_rgb_hex
    end

    if @post.save
      # @post.broadcast_to_clients
      render json: @post, status: :created, include: default_json_includes
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post, include: default_json_includes
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    if @post.user == current_api_v1_user
      @post.destroy
      head :ok
    else
      head :unauthorized
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    def set_posts_filtered_tags
    end

    def post_index_params
      params.permit(:limit, :offset, tag: [])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      # params.permit(:content, :color, taggings_attributes: [:id, :tag])
      params.permit(:content, :color, tag_ids: [])
    end

    # Default serialization setting.
    def default_json_includes
      {
        user: {},
        tags: {},
      }
    end
end
