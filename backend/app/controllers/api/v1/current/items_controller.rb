class Api::V1::Current::ItemsController < Api::V1::BaseController
  before_action :authenticate_user!


  def index
    items = current_user.items
    render json: items
  end

  def show
    item = Item.includes(:user).find(params[:id])
    render json: item, serializer: CurrentItemSerializer
  end

  def update
    item = current_user.items.find(params[:id])
    item.update!(item_params)
    render json: item

  end

  private
  def item_params
    params.require(:item).permit(:name, :discription, :min_price, :amount, :state, :images)
  end

end
