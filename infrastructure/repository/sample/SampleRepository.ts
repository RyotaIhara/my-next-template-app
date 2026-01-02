import { ISampleRepository } from "./ISampleRepository";
import { Sample } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// application/services/SampleRepository.ts
export class SampleRepository implements ISampleRepository {
  async findAll(): Promise<Sample[]> {
    return await prisma.sample.findMany();
  }
}
