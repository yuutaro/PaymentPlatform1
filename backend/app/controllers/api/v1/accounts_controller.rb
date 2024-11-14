class Api::V1::AccountsController < Api::V1::BaseController

  # POST /api/v1/account
  def create_account
    puts "create_account called"

    begin
      # StripeでのAccountの作成
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
          card_payments: { requested: true },
          transfers: { requested: true }
        },
        country: "JP"
      })

      render json: { account: account[:id] }
    rescue => error
      Rails.logger.error "Error creating Stripe account: #{error.message}"
      render json: { error: error.message }, status: :internal_server_error
    end
  end


  # POST /api/v1/account_session
  def create_account_session
    puts "create_account_session called"

    begin
      connected_account_id = params[:account]

      # StripeでのAccountSessionの作成
      account_session = Stripe::AccountSession.create({
        account: connected_account_id,
        components: {
          account_onboarding: { enabled: true }
        }
      })

      render json: { client_secret: account_session[:client_secret] }
    rescue => error
      Rails.logger.error "Error creating Stripe account session: #{error.message}"
      render json: { error: error.message }, status: :internal_server_error
    end
  end

end