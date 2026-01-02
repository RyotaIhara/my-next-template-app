import { ISampleRepository } from "@/infrastructure/repository/sample/ISampleRepository";
import { Sample } from "@prisma/client";

// application/usecase/sample/CreateSampleUseCase.ts
export class CreateSampleUseCase {
  constructor(private readonly sampleRepository: ISampleRepository) {}
  
  async execute(name: string, memo: string): Promise<Sample> {
    return await this.sampleRepository.create(name, memo);
  }
}

