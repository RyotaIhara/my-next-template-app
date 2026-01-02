// application/factories/UseCaseFactory.ts
import { GetSamplesUseCase } from "@/application/usecase/sample/GetSamplesUseCase";
import { CreateSampleUseCase } from "@/application/usecase/sample/CreateSampleUseCase";
import { SampleRepository } from "@/infrastructure/repository/sample/SampleRepository";

export class SampleUseCaseFactory {
  private static sampleRepository: SampleRepository | null = null;
  
  private static getSampleRepository(): SampleRepository {
    if (!this.sampleRepository) {
      this.sampleRepository = new SampleRepository();
    }
    return this.sampleRepository;
  }
  
  static createGetSamplesUseCase(): GetSamplesUseCase {
    return new GetSamplesUseCase(this.getSampleRepository());
  }
  
  static createCreateSampleUseCase(): CreateSampleUseCase {
    return new CreateSampleUseCase(this.getSampleRepository());
  }
}