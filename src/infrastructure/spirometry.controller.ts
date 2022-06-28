import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StoreReadingUseCase } from './application/store-reading.use-case';
import { SpirometryDataDTO } from './application/spirometry-data.dto';

@Controller('spirometry')
export class SpirometryController {
  constructor(private readonly storeReadingUseCase: StoreReadingUseCase) {}

  @Post('data')
  @HttpCode(HttpStatus.ACCEPTED)
  storeReading(@Body() storeReadingBody: SpirometryDataDTO) {
    return this.storeReadingUseCase.storeReading(storeReadingBody);
  }
}
