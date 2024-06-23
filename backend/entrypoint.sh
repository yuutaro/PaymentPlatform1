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

# /myapp ディレクトリの所有者を dcuser に変更
chown -R dcuser:dcuser /backend

# コマンドを dcuser で実行
exec "$@"