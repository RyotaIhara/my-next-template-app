"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import SampleForm from "../../component/form";

export default function UpdateSamplePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // 既存データを取得
  useEffect(() => {
    const fetchSample = async () => {
      try {
        const res = await fetch(`/api/sample/${id}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            setError("サンプルが見つかりません");
          } else {
            setError("データの取得に失敗しました");
          }
          return;
        }

        const sample = await res.json();
        setName(sample.name);
        setMemo(sample.memo);
      } catch (e) {
        console.error(e);
        setError("通信エラーが発生しました");
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) {
      fetchSample();
    }
  }, [id]);

  const handleSubmit = async (name: string, memo: string) => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/sample/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, memo }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "サンプルの更新に失敗しました");
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

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-600">読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">サンプル更新</h1>
          <p className="text-gray-600">サンプル情報を更新します</p>
        </div>

        <SampleForm
          initialName={name}
          initialMemo={memo}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="更新"
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

