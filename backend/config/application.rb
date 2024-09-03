require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
# require "action_cable/engine"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    # 言語設定
    config.i18n.default_locale = :ja

    # セッション情報を保存する方法を指定しています。
    # :cookie_store は、セッションデータをクッキーに保存することを意味します。
    # key: "_backend_temp_session" は、セッションクッキーの名前を "_backend_temp_session" に設定します。
    config.session_store :cookie_store, key: "_backend_temp_session"
    # クッキーの読み書きを処理するミドルウェアを有効にします。
    # CookieStore を使用するために必要です。
    config.middleware.use ActionDispatch::Cookies
    # クッキーベースのセッションストアを実装するミドルウェアを有効にします。
    # key: "_backend_temp_session" は、セッションクッキーの名前を "_backend_temp_session" に設定します。
    # これは、config.session_store で設定したものと同じである必要があります。
    config.middleware.use ActionDispatch::Session::CookieStore, key: "_backend_temp_session"
  end
end
