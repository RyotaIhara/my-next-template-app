import { ISampleRepository } from "@/infrastructure/repository/sample/ISampleRepository";
import { Sample } from "@prisma/client";

// application/usecases/GetSamplesUseCase.ts
export class GetSamplesUseCase {
  constructor(private readonly sampleRepository: ISampleRepository) {}
  async execute(): Promise<Sample[]> {
    return await this.sampleRepository.findAll();
  }
}
