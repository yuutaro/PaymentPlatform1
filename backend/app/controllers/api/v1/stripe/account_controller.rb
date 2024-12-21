class Api::V1::Stripe::AccountController < Api::V1::BaseController

  # StripeのAPIキーを設定
  #Stripe.api_version = '2023-10-16'


  # アカウントの作成処理
  def create
    begin
      account = Stripe::Account.create({
        controller: {
          stripe_dashboard: {
            type: "none",
          },
          fees: {
            payer: "application"
          },
          losses: {
            payments: "application"
          },
          requirement_collection: "application",
        },
        capabilities: {
          transfers: { requested: true },
          card_payments: { requested: true },          
        },
        business_type: 'individual',
        country: "JP",
      })

      render json: { account: account[:id] }
    rescue => e
      Rails.logger.error("An error occurred when calling the Stripe API to create an account: #{e.message}")
      render json: { error: e.message }, status: 500
    end
  end
  
  # アカウントの更新処理
  def update
    connected_account_id = params[:account]

    begin
      account = Stripe::Account.update(
        connected_account_id,
        {
          business_type: 'individual'
        }
      )
      render json: { account: account[:id] }
    rescue => e
      Rails.logger.error("An error occurred when calling the Stripe API to update an account: #{e.message}")
      render json: { error: e.message }, status: 500
    end
  end



end