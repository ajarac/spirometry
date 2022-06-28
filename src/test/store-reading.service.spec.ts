import { SpirometryRepository } from '../domain/spirometry.repository';
import { StoreReadingService } from '../application/store-reading.service';
import { InMemorySpirometryDataRepository } from '../infrastructure/in-memory-spirometry-data.repository';

describe('Store Reading', () => {
  let spirometryRepository: SpirometryRepository;

  let storeReadingService: StoreReadingService;

  beforeEach(() => {
    spirometryRepository = new InMemorySpirometryDataRepository();
    storeReadingService = new StoreReadingService(spirometryRepository);
  });

  it('should save new Entry with empty saved', async () => {
    const saved = await storeReadingService.storeReading(10, new Date(), 1);

    expect(saved).toBe(true);
  });

  it('should reject if the time is before of the last data entry', async () => {
    const patient_id = 1;
    await storeReadingService.storeReading(10, new Date('2022-01-05'), patient_id);

    const saved = await storeReadingService.storeReading(10, new Date('2020-01-04'), patient_id);

    expect(saved).toBe(false);
  });

  it('should reject if the time is the same that the last data entry', async () => {
    const patient_id = 1;
    const date = new Date('2022-01-01');
    await storeReadingService.storeReading(10, date, patient_id);

    const saved = await storeReadingService.storeReading(10, date, patient_id);

    expect(saved).toBe(false);
  });

  it('should save if the time is after of the last data entry', async () => {
    const patient_id = 1;
    await storeReadingService.storeReading(10, new Date('2022-01-05'), patient_id);

    const saved = await storeReadingService.storeReading(10, new Date('2020-01-06'), patient_id);

    expect(saved).toBe(false);
  });

  it('should save different patients at the same time', async () => {
    const patient_id1 = 1;
    const patient_id2 = 2;
    const date = new Date('2022-01-01');

    const saved1 = await storeReadingService.storeReading(10, date, patient_id1);
    const saved2 = await storeReadingService.storeReading(10, date, patient_id2);

    expect(saved1).toBe(true);
    expect(saved2).toBe(true);
  });

  it('should add flag if the new value is is greater than the average + 10%', async () => {
    const patient_id = 1;
    const average = 10;
    const now = new Date();
    for (let i = 0; i < 10; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      await storeReadingService.storeReading(average, date, patient_id);
    }

    const newDate = new Date(now);
    newDate.setDate(newDate.getDate() + 20);
    await storeReadingService.storeReading(12, newDate, patient_id);

    const spirometryData = await spirometryRepository.getLast(patient_id);
    expect(spirometryData.flag).toBe(true);
  });
});
