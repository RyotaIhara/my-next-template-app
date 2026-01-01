"use client"

import { FormEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // middleware から飛ばされてきたときの遷移先
  const callbackUrl = searchParams.get("callbackUrl") || "/private"

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // NextAuth の credentials でログイン
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,          // 自分でリダイレクト制御したいので false
      callbackUrl,              // ログイン成功後の遷移先
    })

    setLoading(false)

    if (result?.error) {
      // authorize() が null を返したときなど
      setError("メールアドレスまたはパスワードが正しくありません")
      return
    }

    // 成功したら callbackUrl へ遷移
    if (result?.url) {
      router.push(result.url)
    } else {
      router.push("/private")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">ログイン</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            メールアドレス
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            パスワード
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">
            {error}
          </p>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? "ログイン中..." : "ログイン"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <a href="/auth/signup" className="text-blue-600 hover:text-blue-800 underline">
          ユーザー登録はこちら
        </a>
      </div>
    </div>
  )
}
