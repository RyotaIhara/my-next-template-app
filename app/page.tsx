// app/page.tsx
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const samples = await prisma.sample.findMany();

  return (
    <div>
      <h1>Sample List</h1>
      <ul>
        {samples.map((s) => (
          <li key={s.id}>
            {s.id}: {s.name} ({s.createdAt.toISOString()})
          </li>
        ))}
      </ul>
    </div>
  );
}