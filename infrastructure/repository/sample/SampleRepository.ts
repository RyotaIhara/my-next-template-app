import { ISampleRepository } from "./ISampleRepository";
import { Sample, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// application/services/SampleRepository.ts
export class SampleRepository implements ISampleRepository {
  async findAll(): Promise<Sample[]> {
    return await prisma.sample.findMany();
  }
  
  async findById(id: number): Promise<Sample | null> {
    return await prisma.sample.findUnique({
      where: { id },
    });
  }
  
  async create(name: string, memo: string): Promise<Sample> {
    return await prisma.sample.create({
      data: {
        name,
        memo,
      } as Prisma.SampleCreateInput,
    });
  }
  
  async update(id: number, name: string, memo: string): Promise<Sample> {
    return await prisma.sample.update({
      where: { id },
      data: {
        name,
        memo,
      } as Prisma.SampleUpdateInput,
    });
  }
  
  async delete(id: number): Promise<void> {
    await prisma.sample.delete({
      where: { id },
    });
  }
}
