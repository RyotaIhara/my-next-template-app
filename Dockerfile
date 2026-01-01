# Dockerfile

FROM node:22-alpine

# コンテナ内の作業ディレクトリ
WORKDIR /app

# 依存関係だけ先にコピーして install（キャッシュ効かせる用）
COPY package.json package-lock.json* ./

# bash を追加
RUN apk add --no-cache bash

RUN npm install

# アプリ本体をコピー
COPY . .

# Next.js dev server のポート
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]
