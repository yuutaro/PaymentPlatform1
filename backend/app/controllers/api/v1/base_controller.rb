class Api::V1::BaseController < ApplicationController
  # devise_token_authのメソッドのエイリアスを設定
  alias_method :current_user, :current_api_v1_user
  alias_method :authenticate_user!, :authenticate_api_v1_user!
  alias_method :user_signed_in?, :api_v1_user_signed_in?
end
