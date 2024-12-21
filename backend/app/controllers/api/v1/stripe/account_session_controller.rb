class Api::V1::Stripe::AccountSessionController < Api::V1::BaseController
  # POST /account_session
  def create
    # JSONリクエストをパースして必要なパラメータを取得
    connected_account_id = params[:account]

    begin
      # Stripe APIを使用してアカウントセッションを作成
      account_session = Stripe::AccountSession.create(
        account: connected_account_id,
        components: {
          account_onboarding: { enabled: true }
        }
      )

      # クライアントにclient_secretをJSON形式で返す
      render json: { client_secret: account_session[:client_secret] }
    rescue => error
      # エラーが発生した場合は500エラーとしてエラーメッセージを返す
      Rails.logger.error("An error occurred when calling the Stripe API to create an account session: #{error.message}")
      render json: { error: error.message }, status: :internal_server_error
    end
  end
end
