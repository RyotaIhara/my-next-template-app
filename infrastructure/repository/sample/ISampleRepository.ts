// domain/repositories/ISampleRepository.ts
import { Sample } from "@prisma/client";

export interface ISampleRepository {
  findAll(): Promise<Sample[]>;
  create(name: string, memo: string): Promise<Sample>;
}
