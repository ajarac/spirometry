import { Module } from '@nestjs/common';
import { SpirometryController } from './infrastructure/spirometry.controller';
import { SPIROMETRY_REPOSITORY_TOKEN } from './domain/spirometry.repository';
import { InMemorySpirometryDataRepository } from './infrastructure/in-memory-spirometry-data.repository';
import { StoreReadingService } from './application/store-reading.service';

@Module({
  controllers: [SpirometryController],
  providers: [
    {
      provide: SPIROMETRY_REPOSITORY_TOKEN,
      useClass: InMemorySpirometryDataRepository,
    },
    StoreReadingService,
  ],
})
export class AppModule {}
