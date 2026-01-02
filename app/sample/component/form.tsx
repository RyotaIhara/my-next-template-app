"use client";

import { FormEvent, useState, useEffect } from "react";

interface SampleFormProps {
  initialName?: string;
  initialMemo?: string;
  onSubmit: (name: string, memo: string) => Promise<void>;
  onCancel: () => void;
  submitButtonText?: string;
  loading?: boolean;
  error?: string | null;
}

export default function SampleForm({
  initialName = "",
  initialMemo = "",
  onSubmit,
  onCancel,
  submitButtonText = "作成",
  loading = false,
  error: externalError = null,
}: SampleFormProps) {
  const [name, setName] = useState(initialName);
  const [memo, setMemo] = useState(initialMemo);
  const [internalError, setInternalError] = useState<string | null>(null);

  // 初期値が変更されたときに状態を更新
  useEffect(() => {
    setName(initialName);
    setMemo(initialMemo);
  }, [initialName, initialMemo]);

  const error = externalError || internalError;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setInternalError(null);

    try {
      await onSubmit(name, memo);
    } catch (e) {
      console.error(e);
      setInternalError("処理中にエラーが発生しました");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          名前 <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="サンプル名を入力"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="memo" className="block text-sm font-medium text-gray-700 mb-2">
          メモ <span className="text-red-500">*</span>
        </label>
        <textarea
          id="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
          placeholder="メモを入力"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? "処理中..." : submitButtonText}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}

