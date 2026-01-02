"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SampleForm from "../component/form";

export default function CreateSamplePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (name: string, memo: string) => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/sample/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, memo }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "サンプルの作成に失敗しました");
        return;
      }

      // 成功したら一覧画面へ遷移
      router.push("/sample");
    } catch (e) {
      console.error(e);
      setError("通信エラーが発生しました");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/sample");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">サンプル作成</h1>
          <p className="text-gray-600">新しいサンプルを作成します</p>
        </div>

        <SampleForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="作成"
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

