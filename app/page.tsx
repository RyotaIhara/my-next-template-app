// app/page.tsx
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const samples = await prisma.sample.findMany();

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}