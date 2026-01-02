# Dockerfile

FROM node:22-alpine

# コンテナ内の作業ディレクトリ
WORKDIR /app

# 依存関係だけ先にコピーして install（キャッシュ効かせる用）
COPY package.json package-lock.json* ./

# Alpine パッケージリストをコピーしてインストール
COPY docker/apk-packages.txt ./
RUN apk add --no-cache $(cat apk-packages.txt | tr '\n' ' ')

# エイリアス設定をコピーして適用
COPY docker/bash-aliases.txt ./
RUN cat bash-aliases.txt >> /etc/profile.d/aliases.sh && \
    chmod +x /etc/profile.d/aliases.sh

RUN npm install

# アプリ本体をコピー
COPY . .

# Next.js dev server のポート
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]
