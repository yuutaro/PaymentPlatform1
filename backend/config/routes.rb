Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      mount_devise_token_auth_for "User", at: "auth"

      namespace :current do
        resource :user, only: [:show]
        resources :items, only: [:index, :show, :update]
      end
      resources :items, only: [:new, :create, :index, :show]

      namespace :stripe do
        resources :account, only: [:create, :update]
        resources :account_session, only: [:create]
        # checkoutセッション作成
        # get 'checkout/create_checkout_session', to: 'checkout#create_checkout_session'
        
        # capture完了
        # post 'checkout/capture_complete', to: 'checkout#capture_complete'
      end
    end
  end
end
