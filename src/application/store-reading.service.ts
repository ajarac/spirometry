import { Inject, Injectable } from '@nestjs/common';
import { SpirometryData } from '../domain/spirometry-data.repository';
import { SPIROMETRY_REPOSITORY_TOKEN, SpirometryRepository } from '../domain/spirometry.repository';

@Injectable()
export class StoreReadingService {
  constructor(
    @Inject(SPIROMETRY_REPOSITORY_TOKEN)
    private readonly repository: SpirometryRepository,
  ) {}

  private static factorySpirometryData(average: number, value: number, created_at: Date, patient_id: number) {
    return value >= average * 1.1
      ? SpirometryData.withFlag(value, created_at, patient_id)
      : SpirometryData.normal(value, created_at, patient_id);
  }

  async storeReading(value: number, created_at: Date, patient_id: number): Promise<boolean> {
    const is_after_last = await this.repository.isAfterLast(patient_id, created_at);
    if (!is_after_last) {
      return false;
    }

    const average: number = await this.repository.getAverageByPatient(patient_id);

    const spirometry = StoreReadingService.factorySpirometryData(average, value, created_at, patient_id);

    await this.repository.store(spirometry);

    return true;
  }
}
