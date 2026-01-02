// domain/repositories/ISampleRepository.ts
import { Sample } from "@prisma/client";

export interface ISampleRepository {
  findAll(): Promise<Sample[]>;
  findById(id: number): Promise<Sample | null>;
  create(name: string, memo: string): Promise<Sample>;
  update(id: number, name: string, memo: string): Promise<Sample>;
  delete(id: number): Promise<void>;
}
