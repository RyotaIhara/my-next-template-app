"use client"

import { useSession, signOut } from "next-auth/react"

export default function AuthButton() {
  const { data: session, status } = useSession()

  // ローディング中は何も表示しない
  if (status === "loading") return null

  // 未ログインなら何も表示しない
  if (!session) return null

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      style={{ marginLeft: 8 }}
    >
      ログアウト
    </button>
  )
}
