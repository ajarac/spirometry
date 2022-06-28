import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { StoreReadingService } from '../application/store-reading.service';
import { IsDateString, IsNumber } from 'class-validator';
import { Response } from 'express';

class SpirometryDataBody {
  @IsNumber()
  value: number;
  @IsDateString()
  created_at: string;
  @IsNumber()
  patient_id: number;
}

@Controller('spirometry')
export class SpirometryController {
  constructor(private readonly storeReadingService: StoreReadingService) {}

  @Post('data')
  async storeReading(@Body() { value, created_at, patient_id }: SpirometryDataBody, @Res() response: Response): Promise<void> {
    const saved = await this.storeReadingService.storeReading(value, new Date(created_at), patient_id);
    response.status(HttpStatus.OK).json({ saved });
  }
}
