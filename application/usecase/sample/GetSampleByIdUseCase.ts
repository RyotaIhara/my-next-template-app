import { ISampleRepository } from "@/infrastructure/repository/sample/ISampleRepository";
import { Sample } from "@prisma/client";

// application/usecase/sample/GetSampleByIdUseCase.ts
export class GetSampleByIdUseCase {
  constructor(private readonly sampleRepository: ISampleRepository) {}
  
  async execute(id: number): Promise<Sample | null> {
    return await this.sampleRepository.findById(id);
  }
}

