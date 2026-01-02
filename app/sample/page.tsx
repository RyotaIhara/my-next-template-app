"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Sample {
  id: number;
  name: string;
  memo: string;
  createdAt: Date;
}

export default function SamplePage() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const res = await fetch("/api/sample");

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          setError(data?.error ?? "サンプルの取得に失敗しました");
          return;
        }

        const data = await res.json();
        setSamples(data);
      } catch (e) {
        console.error(e);
        setError("通信エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchSamples();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Sample List</h1>
              <p className="text-gray-600">サンプル一覧を表示しています</p>
            </div>
            <Link
              href="/sample/create"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              作成
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">読み込み中...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              再読み込み
            </button>
          </div>
        ) : samples.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg mb-4">サンプルがありません</p>
            <Link
              href="/sample/create"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              最初のサンプルを作成
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {samples.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    ID: {s.id}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {s.name}
                </h3>
                {s.memo && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                    {s.memo}
                  </p>
                )}
                <Link
                  href={`/sample/update/${s.id}`}
                  className="mt-auto bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition text-center block"
                >
                  更新
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
