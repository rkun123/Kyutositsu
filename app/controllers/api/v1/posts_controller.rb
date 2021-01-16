class Api::V1::PostsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    @posts = Post.all.order(created_at: "DESC")

    render json: @posts, include: :user
  end

  # GET /posts/1
  def show
    render json: @post, include: :user
  end

  # POST /posts
  def create
    @post = Post.new(post_params)
    @post.user_id = current_api_v1_user.id

    if @post.save
      render json: @post, status: :created, include: :user
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post, include: :user
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.require(:post).permit(:title, :content)
    end
end
