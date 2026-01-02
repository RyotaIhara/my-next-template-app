"use client";

import { useParams } from "next/navigation";
import SampleForm from "../../component/form";
import { useSampleById } from "../../hooks/useSampleById";
import { useUpdateSample } from "../../hooks/useUpdateSample";

export default function UpdateSamplePage() {
  const params = useParams();
  const id = params.id as string;
  
  const { sample, loading: initialLoading, error: fetchError } = useSampleById(id);
  const { handleSubmit, handleCancel, loading, error: updateError } = useUpdateSample(id);

  const error = fetchError || updateError;

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
          initialName={sample?.name ?? ""}
          initialMemo={sample?.memo ?? ""}
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

