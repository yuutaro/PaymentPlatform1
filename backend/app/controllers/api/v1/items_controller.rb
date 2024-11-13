class Api::V1::ItemsController < Api::V1::BaseController
  before_action :authenticate_user!, only: [:create] 

  def new
    #新規Itemインスタンスを作成
    item = Item.new
    #作品情報入力ページへ遷移
    redirect_to ENV['FRONT_URL'] + '/item/new'
    
  end

  


  def create
    # Create a new item with the provided parameters
    item = current_user.items.new(item_params)
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
    item = Item.includes(:user).find(params[:id])
    render json: item.as_json(include: { user: { only: [:name] } })
  end




  private
  def item_params
    params.require(:item).permit(:name, :discription, :min_price, :amount, :state, images: [])
  end

end
