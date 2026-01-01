# Next.js+Prismaでアプリケーションを作る際のテンプレート

## よく使用するコマンド

### 基本

#### コンテナ環境にログインする方法
```bash
docker exec -it my-next-template-app-web-1 bash
```

### prisma関連

#### migrationファイルを作成するコマンド（コンテナ内で実施）
```bash
npx prisma migrate dev --create-only

# --create-onlyを消せば、DBにも反映できる
```
