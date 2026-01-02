"use client";

import SampleForm from "../component/form";
import { useCreateSample } from "../hooks/useCreateSample";

export default function CreateSamplePage() {
  const { handleSubmit, handleCancel, loading, error } = useCreateSample();

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

