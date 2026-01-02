// application/factories/UseCaseFactory.ts
import { GetSamplesUseCase } from "@/application/usecase/sample/GetSamplesUseCase";
import { GetSampleByIdUseCase } from "@/application/usecase/sample/GetSampleByIdUseCase";
import { CreateSampleUseCase } from "@/application/usecase/sample/CreateSampleUseCase";
import { UpdateSampleUseCase } from "@/application/usecase/sample/UpdateSampleUseCase";
import { DeleteSampleUseCase } from "@/application/usecase/sample/DeleteSampleUseCase";
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
  
  static createGetSampleByIdUseCase(): GetSampleByIdUseCase {
    return new GetSampleByIdUseCase(this.getSampleRepository());
  }
  
  static createCreateSampleUseCase(): CreateSampleUseCase {
    return new CreateSampleUseCase(this.getSampleRepository());
  }
  
  static createUpdateSampleUseCase(): UpdateSampleUseCase {
    return new UpdateSampleUseCase(this.getSampleRepository());
  }
  
  static createDeleteSampleUseCase(): DeleteSampleUseCase {
    return new DeleteSampleUseCase(this.getSampleRepository());
  }
}