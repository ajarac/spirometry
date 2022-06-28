import { SpirometryRepository } from '../domain/spirometry.repository';
import { StoreReadingService } from './store-reading.service';

describe('Store Reading Use Case', () => {
  const spirometryRepository: SpirometryRepository = {
    store: jest.fn(),
    getAverageByPatient: jest.fn(),
    isAfterLast: jest.fn(),
  };

  let storeReadingService: StoreReadingService;

  beforeEach(() => {
    storeReadingService = new StoreReadingService(spirometryRepository);
  });

  it('should reject if the time is before of the last data entry', async () => {
    jest.spyOn(spirometryRepository, 'isAfterLast').mockResolvedValue(false);

    const saved = await storeReadingService.storeReading(10, new Date('2020-01-01'), 10);

    expect(saved).toBe(false);
  });

  it('should save if the time is after of the last data entry', async () => {
    const spy = jest.spyOn(spirometryRepository, 'isAfterLast').mockResolvedValue(true);

    const saved = await storeReadingService.storeReading(10, new Date(), 1);

    expect(saved).toBe(true);
  });
});
