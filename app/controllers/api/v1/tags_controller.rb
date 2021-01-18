class Api::V1::TagsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_tag, only: [:show, :update, :destroy]

  # GET /tags
  def index
    @tags = Tag.all.order(created_at: "DESC")

    render json: @tags
  end

  # GET /tags/1
  def show
    render json: @tag
  end

  # POST /tags
  def create
    @tag = Tag.new(tag_params)
    @tag.created_by = current_api_v1_user

    if @tag.color == nil
      color = RGB::Color.from_rgb_hex(0xFFCFCF)
      color.h = rand * 360
      @tag.color = color.to_rgb_hex
      puts color
    end

    puts @tag.as_json

    if @tag.save
      render json: @tag, status: :created
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tags/1
  def update
    if @tag.update(tag_params)
      render json: @tag, include: :user
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tags/1
  def destroy
    @tag.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tag
      @tag = Tag.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def tag_params
      params.require(:tag).permit(:name, :color)
    end
end
