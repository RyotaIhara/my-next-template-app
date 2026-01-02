// app/sample/page.tsx
import { SampleUseCaseFactory } from "@/application/factory/SampleUseCaseFactory";

export default async function SamplePage() {
  const getSamplesUseCase = SampleUseCaseFactory.createGetSamplesUseCase();
  const samples = await getSamplesUseCase.execute();
  
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sample List</h1>
          <p className="text-gray-600">サンプル一覧を表示しています</p>
        </div>
        
        {samples.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">サンプルがありません</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {samples.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    ID: {s.id}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {s.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
