# Next.js+Prismaでアプリケーションを作る際のテンプレート

## アーキテクチャ構成

### FE側の構成

### BE側の構成

クリーンアーキテクチャで構成している。

#### レイヤー構成図
```mermaid
graph TB
    subgraph "プレゼンテーション層 (Presentation Layer)"
        A[app/sample/page.tsx<br/>Next.js Page Component]
    end
    
    subgraph "アプリケーション層 (Application Layer)"
        B[application/factories/<br/>SampleUseCaseFactory]
        C[application/usecase/sample/<br/>GetSamplesUseCase]
    end
    
    subgraph "インフラ層 (Infrastructure Layer)"
        D[infrastructure/repository/sample/<br/>ISampleRepository]
        E[infrastructure/repository/sample/<br/>SampleRepository]
        F[lib/prisma.ts<br/>Prisma Client]
    end
    
    subgraph "データベース"
        G[(PostgreSQL)]
    end
    
    A -->|"UseCaseFactoryを使用"| B
    B -->|"UseCaseを生成"| C
    C -->|"Repositoryインターフェースに依存"| D
    E -->|"インターフェースを実装"| D
    E -->|"Prisma Clientを使用"| F
    F -->|"データアクセス"| G
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#fff4e1
    style D fill:#ffe1f5
    style E fill:#ffe1f5
    style F fill:#ffe1f5
    style G fill:#f0f0f0
```

#### データフロー
```mermaid
sequenceDiagram
    participant Page as app/sample/page.tsx
    participant Factory as SampleUseCaseFactory
    participant UseCase as GetSamplesUseCase
    participant Repo as SampleRepository
    participant Prisma as Prisma Client
    participant DB as PostgreSQL
    
    Page->>Factory: createGetSamplesUseCase()
    Factory->>Repo: new SampleRepository()
    Factory->>UseCase: new GetSamplesUseCase(repo)
    Factory-->>Page: GetSamplesUseCase
    
    Page->>UseCase: execute()
    UseCase->>Repo: findAll()
    Repo->>Prisma: prisma.sample.findMany()
    Prisma->>DB: SELECT * FROM Sample
    DB-->>Prisma: Sample[]
    Prisma-->>Repo: Sample[]
    Repo-->>UseCase: Sample[]
    UseCase-->>Page: Sample[]
    Page->>Page: レンダリング
```

#### ディレクトリ構成
```
app/                          # プレゼンテーション層
├── sample/
│   └── page.tsx             # ページコンポーネント

application/                  # アプリケーション層
├── factories/                # UseCase生成ファクトリ
│   └── SampleUseCaseFactory.ts
└── usecase/                  # ユースケース
    └── sample/
        └── GetSamplesUseCase.ts

infrastructure/               # インフラ層
└── repository/               # リポジトリ実装
    └── sample/
        ├── ISampleRepository.ts    # インターフェース
        └── SampleRepository.ts     # 実装

lib/                          # インフラ層（共通）
└── prisma.ts                 # Prisma Client
```

#### 依存関係の原則

- **プレゼンテーション層** → **アプリケーション層**のみに依存
- **アプリケーション層** → **インフラ層のインターフェース**に依存
- **インフラ層** → **インターフェースを実装**し、**Prisma Client**を使用
- 内側の層は外側の層に依存しない（依存性の逆転の原則）

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
