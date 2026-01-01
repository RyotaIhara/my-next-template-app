"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.error ?? "ユーザー作成に失敗しました")
        return
      }

      // 成功したらログイン画面 or トップへ遷移
      router.push("/auth/login")
    } catch (e) {
      console.error(e)
      setError("通信エラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">ユーザー作成ページ</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            名前
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            メールアドレス *
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
            パスワード *
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
          {loading ? "作成中..." : "ユーザーを作成する"}
        </button>
      </form>
    </div>
  )
}