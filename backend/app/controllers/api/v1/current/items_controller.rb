class Api::V1::Current::ItemsController < Api::V1::BaseController
  #before_action :authenticate_user!


  def index
    #current_userにする
    items = Item.all
    redirect_to 'http://localhost:3000/current/item'
  end


end
