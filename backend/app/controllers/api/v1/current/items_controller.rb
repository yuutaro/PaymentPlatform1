class Api::V1::Current::ItemsController < Api::V1::BaseController
  before_action :authenticate_user!


  def index
    items = current_user.items
    render json: items
  end

end
