class Api::V1::Stripe::CheckoutController < Api::V1::BaseController

  # checkout_sessionの作成処理
  def create_checkout_session
    unit_amount = 1000 # 商品の金額
    fee_percentage = 0.1 # 手数料率

    # 手数料を計算し、小数点以下を切り捨て
    application_fee_amount = (unit_amount * fee_percentage).to_i

    checkout_session = Stripe::Checkout::Session.create({
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data:{
              name: 'T-shirt',
              images: ['https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp']
            },
            unit_amount: unit_amount,
          },
          quantity: 1,
        },
      ],
      # プラットフォーム側が受け取る手数料の設定
      payment_intent_data: {
        application_fee_amount: application_fee_amount,
        transfer_data: {destination: 'acct_1QQJEBR7NV47Joaq'},
        # capture_method: 'manual',
      },
      mode: 'payment',
      ui_mode: 'embedded',
      # 支払い後のURL
      # return_url: 'http://localhost:3000/stripe/checkout/pre_complete?session_id={CHECKOUT_SESSION_ID}',
    })
    
    render json: { clientSecret: checkout_session.client_secret }
  end

  # checkout_sessionの完了処理
  # def capture_complete
  #   # checkoutのsession_idを格納
  #   session_id = params[:session_id]
  #   # checkout_sessionの全ての情報を取得
  #   checkout_session = Stripe::Checkout::Session.retrieve(session_id)
  #   # その中のpayment_intentだけを取得
  #   payment_intent_id = checkout_session.payment_intent

  #   # 指定したpayment_intent_idの支払いを確定
  #   payment_intent = Stripe::PaymentIntent.capture(payment_intent_id)

  #   render json: { payment_intent: payment_intent }
  # end



end