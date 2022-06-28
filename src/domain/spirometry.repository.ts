import { SpirometryData } from './spirometry-data.repository';

export const SPIROMETRY_REPOSITORY_TOKEN = Symbol('SPIROMETRY_REPOSITORY_TOKEN');

export interface SpirometryRepository {
  store(spirometry: SpirometryData): Promise<void>;

  getAverageByPatient(patient_id: number): Promise<number>;

  isAfterLast(patient_id: number, created_at: Date): Promise<boolean>;

  getLast(patient_id: number): Promise<SpirometryData>;
}
