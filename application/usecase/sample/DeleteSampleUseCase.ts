import { ISampleRepository } from "@/infrastructure/repository/sample/ISampleRepository";

// application/usecase/sample/DeleteSampleUseCase.ts
export class DeleteSampleUseCase {
  constructor(private readonly sampleRepository: ISampleRepository) {}
  
  async execute(id: number): Promise<void> {
    await this.sampleRepository.delete(id);
  }
}

