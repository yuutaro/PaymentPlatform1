#!/bin/bash
set -e

# server.pid ファイルを削除
rm -f /backend/tmp/pids/server.pid

# LOCAL_USER_ID, LOCAL_GROUP_ID からユーザーとグループのIDを取得
USERID=${LOCAL_USER_ID:-1000}
GROUPID=${LOCAL_GROUP_ID:-1000}

# ユーザーとグループの作成
echo "UserName: dcuser, UserID: $USERID, GroupID: $GROUPID"
groupadd -g $GROUPID dcuser
useradd -m -s /bin/bash -u $USERID -g $GROUPID dcuser


# # gemをアップデート
# gem update --system
# bundle update --bundler

# # bundle installのインストール先をプロジェクトディレクトリ内に変更
# bundle config set --local path 'vendor/bundle'

# # bundle install
# bundle install

# # いらないgemを削除
# bundle clean

# # /backend ディレクトリの所有者を dcuser に変更
# chown -R dcuser:dcuser /backend

# CMDで指定されたコマンドを実行
exec "$@"
