// app/sample/page.tsx
import { SampleUseCaseFactory } from "@/application/factories/SampleUseCaseFactory";

export default async function SamplePage() {
  const getSamplesUseCase = SampleUseCaseFactory.createGetSamplesUseCase();
  const samples = await getSamplesUseCase.execute();
  
  return (
    <div>
      <h1>Sample List</h1>
      <ul>
        {samples.map((s) => (
          <li key={s.id}>{s.id}: {s.name}</li>
        ))}
      </ul>
    </div>
  );
}
