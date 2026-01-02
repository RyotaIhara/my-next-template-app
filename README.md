# Next.js+Prismaでアプリケーションを作る際のテンプレート

## アーキテクチャ構成

### FE側の構成

#### ディレクトリ構成
```
プロジェクトルート/
├── component/              # 共通コンポーネント
│   └── AuthButton.tsx
├── hooks/                  # 共通カスタムフック
│
app/                        # Next.js App Router
├── sample/                 # サンプル機能
│   ├── page.tsx           # 一覧ページ
│   ├── create/
│   │   └── page.tsx       # 作成ページ
│   ├── update/
│   │   └── [id]/
│   │       └── page.tsx   # 更新ページ
│   ├── component/         # サンプル専用コンポーネント
│   │   └── form.tsx
│   └── hooks/             # サンプル専用カスタムフック
```

#### 構成の原則

- **共通コンポーネント・フック**: プロジェクトルート直下の`component/`と`hooks/`に配置
  - 複数の機能で再利用されるコンポーネントやフック
  - 例: `AuthButton.tsx`（認証関連の共通コンポーネント）

- **機能専用コンポーネント・フック**: 各機能フォルダ配下に配置
  - `app/sample/component/`: サンプル機能専用のコンポーネント
  - `app/sample/hooks/`: サンプル機能専用のカスタムフック
  - その機能でのみ使用されるコンポーネントやフック

- **ページコンポーネント**: `app/[feature]/page.tsx`に配置
  - Next.js App Routerの規約に従う
  - クライアントコンポーネントとして実装（API経由でデータ取得）

### BE側の構成

クリーンアーキテクチャで構成している。

#### レイヤー構成図
```mermaid
graph TB
    subgraph "プレゼンテーション層 (Presentation Layer)"
        A["app/sample/page.tsx<br/>Next.js Client Component"]
        A1["app/sample/create/page.tsx"]
        A2["app/sample/update/id/page.tsx"]
        A3["app/sample/component/form.tsx"]
    end
    
    subgraph "API層 (API Layer)"
        API1["app/api/sample/route.ts<br/>GET, POST"]
        API2["app/api/sample/id/route.ts<br/>GET, PUT"]
    end
    
    subgraph "アプリケーション層 (Application Layer)"
        B[application/factory/<br/>SampleUseCaseFactory]
        C1[application/usecase/sample/<br/>GetSamplesUseCase]
        C2[application/usecase/sample/<br/>GetSampleByIdUseCase]
        C3[application/usecase/sample/<br/>CreateSampleUseCase]
        C4[application/usecase/sample/<br/>UpdateSampleUseCase]
    end
    
    subgraph "インフラ層 (Infrastructure Layer)"
        D[infrastructure/repository/sample/<br/>ISampleRepository]
        E[infrastructure/repository/sample/<br/>SampleRepository]
        F[lib/prisma.ts<br/>Prisma Client]
    end
    
    subgraph "データベース"
        G[(PostgreSQL)]
    end
    
    A -->|"fetch /api/sample"| API1
    A1 -->|"fetch /api/sample POST"| API1
    A2 -->|"fetch /api/sample/[id]"| API2
    
    API1 -->|"UseCaseFactoryを使用"| B
    API2 -->|"UseCaseFactoryを使用"| B
    
    B -->|"UseCaseを生成"| C1
    B -->|"UseCaseを生成"| C2
    B -->|"UseCaseを生成"| C3
    B -->|"UseCaseを生成"| C4
    
    C1 -->|"Repositoryインターフェースに依存"| D
    C2 -->|"Repositoryインターフェースに依存"| D
    C3 -->|"Repositoryインターフェースに依存"| D
    C4 -->|"Repositoryインターフェースに依存"| D
    
    E -->|"インターフェースを実装"| D
    E -->|"Prisma Clientを使用"| F
    F -->|"データアクセス"| G
    
    style A fill:#e1f5ff
    style A1 fill:#e1f5ff
    style A2 fill:#e1f5ff
    style A3 fill:#e1f5ff
    style API1 fill:#d4edda
    style API2 fill:#d4edda
    style B fill:#fff4e1
    style C1 fill:#fff4e1
    style C2 fill:#fff4e1
    style C3 fill:#fff4e1
    style C4 fill:#fff4e1
    style D fill:#ffe1f5
    style E fill:#ffe1f5
    style F fill:#ffe1f5
    style G fill:#f0f0f0
```

#### データフロー（一覧取得の例）
```mermaid
sequenceDiagram
    participant Page as app/sample/page.tsx<br/>(Client Component)
    participant API as app/api/sample/route.ts
    participant Factory as SampleUseCaseFactory
    participant UseCase as GetSamplesUseCase
    participant Repo as SampleRepository
    participant Prisma as Prisma Client
    participant DB as PostgreSQL
    
    Page->>API: GET /api/sample
    API->>Factory: createGetSamplesUseCase()
    Factory->>Repo: new SampleRepository()
    Factory->>UseCase: new GetSamplesUseCase(repo)
    Factory-->>API: GetSamplesUseCase
    
    API->>UseCase: execute()
    UseCase->>Repo: findAll()
    Repo->>Prisma: prisma.sample.findMany()
    Prisma->>DB: SELECT * FROM Sample
    DB-->>Prisma: Sample[]
    Prisma-->>Repo: Sample[]
    Repo-->>UseCase: Sample[]
    UseCase-->>API: Sample[]
    API-->>Page: JSON Response
    Page->>Page: レンダリング
```

#### ディレクトリ構成
```
app/                          # プレゼンテーション層
├── sample/
│   ├── page.tsx             # 一覧ページ（クライアントコンポーネント）
│   ├── create/
│   │   └── page.tsx         # 作成ページ
│   ├── update/
│   │   └── [id]/
│   │       └── page.tsx     # 更新ページ
│   └── component/
│       └── form.tsx          # フォームコンポーネント
└── api/                      # API層
    └── sample/
        ├── route.ts          # GET（一覧）, POST（作成）
        └── [id]/
            └── route.ts      # GET（取得）, PUT（更新）

application/                  # アプリケーション層
├── factory/                  # UseCase生成ファクトリ
│   └── SampleUseCaseFactory.ts
└── usecase/                  # ユースケース
    └── sample/
        ├── GetSamplesUseCase.ts
        ├── GetSampleByIdUseCase.ts
        ├── CreateSampleUseCase.ts
        └── UpdateSampleUseCase.ts

infrastructure/               # インフラ層
└── repository/               # リポジトリ実装
    └── sample/
        ├── ISampleRepository.ts    # インターフェース
        └── SampleRepository.ts     # 実装

lib/                          # インフラ層（共通）
└── prisma.ts                 # Prisma Client
```

#### 依存関係の原則

- **プレゼンテーション層** → **API層**のみに依存（HTTPリクエスト経由）
- **API層** → **アプリケーション層**のみに依存（UseCaseFactory経由）
- **アプリケーション層** → **インフラ層のインターフェース**に依存
- **インフラ層** → **インターフェースを実装**し、**Prisma Client**を使用
- 内側の層は外側の層に依存しない（依存性の逆転の原則）

#### APIエンドポイント

- `GET /api/sample` - サンプル一覧を取得
- `POST /api/sample` - サンプルを作成
- `GET /api/sample/[id]` - 指定IDのサンプルを取得
- `PUT /api/sample/[id]` - 指定IDのサンプルを更新
- `DELETE /api/sample/[id]` - 指定IDのサンプルを削除

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

## GitHubリポジトリを複製する手順（Clone → 新リポジトリに紐付け）

元のリポジトリをローカルに clone し、  
「元リポジトリとの関連を外して」から「新しいリポジトリに紐付け直す」ことで、  
**ほぼ同じ内容の別リポジトリ**を作成することができます。

### 前提

- Git がインストールされていること
- GitHub アカウントを持っていること
- 複製元リポジトリに読み取り権限があること（Public ならOK）

### 1. 元リポジトリをローカルに clone する

```bash
git clone https://github.com/ORIGINAL_USER/ORIGINAL_REPO.git
cd ORIGINAL_REPO
```

- `ORIGINAL_USER` : 元リポジトリ所有者のユーザー名 or Organization名
- `ORIGINAL_REPO` : 元リポジトリ名

### 2. 元リポジトリとの関連を削除する

clone した直後は、`origin` が元リポジトリを指しています。  
これを削除して、**一度関連をリセット**します。

```bash
git remote remove origin
```

確認したい場合：

```bash
git remote -v
# 何も表示されなければOK
```

### 3. GitHub 上で新しいリポジトリを作成する

1. GitHub にアクセス
2. 右上の「＋」→ **New repository**
3. 「Owner」「Repository name」などを入力
4. **Initialize this repository with:** にはチェックを入れない（README等は作らない）
5. **Create repository** をクリック

> ✅ ローカル側ですでに履歴（コミット）があるため、  
> 新リポジトリは「空の状態」で作成するのがポイントです。

### 4. 新リポジトリを `origin` として紐付ける

GitHubで作成した新リポジトリの URL を、  
ローカルの `origin` として設定します。

```bash
git remote add origin https://github.com/YOUR_USER/NEW_REPO.git
```

- `YOUR_USER` : 自分の GitHub ユーザー名 or Organization名
- `NEW_REPO`  : 新しく作成したリポジトリ名

設定確認：

```bash
git remote -v
# origin  https://github.com/YOUR_USER/NEW_REPO.git (push)
# origin  https://github.com/YOUR_USER/NEW_REPO.git (fetch)
```

### 5. 既存の履歴を新リポジトリに push する

通常は `main` or `master` ブランチを push します。  
ブランチ名は自身の環境に合わせて読み替えてください。

```bash
git push -u origin main
# もしくは
git push -u origin master
```

> `-u` を付けることで、今後 `git push` だけで  
> `origin main` へ push されるようになります。

### 6. （必要に応じて）他のブランチやタグも push する

複製元リポジトリに複数ブランチ・タグがある場合は、必要に応じて push します。

#### すべてのブランチを push

```bash
git push --all origin
```

#### すべてのタグを push

```bash
git push --tags origin
```

### 7. これで複製完了

ここまでの手順で、

- コード・コミット履歴は引き継がれる
- 元リポジトリとの remote 関係はない
- 新しいリポジトリとして独立して運用できる

という状態になります。

### 補足：Fork との違い

- **この方法**  
  - 元リポジトリとの関連は一切ない  
  - 完全に独立したプロジェクトとして扱える  
- **Fork**  
  - GitHub 上で「フォーク元」として関連が残る  
  - PR などを送りやすいが、関係性も見える

「社内用にコピーしたい」「別プロジェクトとして運用したい」  
といった場合は、この clone → remote 付け替えの方法が便利です。
