class Api::V1::ItemsController < ApplicationController


  #before_action :authenticate_user!, only: [:new, :create]

  def new
    #新規Itemインスタンスを作成
    item = Item.new
    #作品情報入力ページへ遷移
    redirect_to 'http://localhost:3000/item/'
  end


  def create
    # Create a new item with the provided parameters
    item = Item.new(item_params)

    # Save the item to the database
    if item.save
      # If successful, render the item as JSON and respond with a 201 Created status
      render json: item
    end

  end

  def index
    items = Item.all
    render json: items
  end


  def show
    item = Item.find(params[:id])
    render json: item
  end



  private
  def item_params
    params.require(:item).permit(:name, :image,:discription, :min_price, :amount, :state)
  end

end
