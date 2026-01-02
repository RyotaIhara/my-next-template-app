import { ISampleRepository } from "./ISampleRepository";
import { Sample, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// application/services/SampleRepository.ts
export class SampleRepository implements ISampleRepository {
  async findAll(): Promise<Sample[]> {
    return await prisma.sample.findMany();
  }
  
  async create(name: string, memo: string): Promise<Sample> {
    return await prisma.sample.create({
      data: {
        name,
        memo,
      } as Prisma.SampleCreateInput,
    });
  }
}
