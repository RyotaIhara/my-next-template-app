import { ISampleRepository } from "@/infrastructure/repository/sample/ISampleRepository";
import { Sample } from "@prisma/client";

// application/usecase/sample/UpdateSampleUseCase.ts
export class UpdateSampleUseCase {
  constructor(private readonly sampleRepository: ISampleRepository) {}
  
  async execute(id: number, name: string, memo: string): Promise<Sample> {
    return await this.sampleRepository.update(id, name, memo);
  }
}

