import { Injectable } from '@nestjs/common';
import { SpirometryData } from 'src/domain/spirometry-data.repository';
import { SpirometryRepository } from 'src/domain/spirometry.repository';
import { Queue } from '../shared/queue';
import { Average } from '../shared/average';

@Injectable()
export class InMemorySpirometryDataRepository implements SpirometryRepository {
  private readonly map_store = new Map<number, Queue<SpirometryData>>();
  private readonly map_average = new Map<number, Average>();

  private static getMonthAgoFrom(date: Date): Date {
    const monthAgo = new Date(date);
    monthAgo.setMonth(date.getMonth() - 1);
    return monthAgo;
  }

  async store(spirometry: SpirometryData): Promise<void> {
    const monthAgo = InMemorySpirometryDataRepository.getMonthAgoFrom(spirometry.created_at);
    this.addSpirometryData(spirometry);
    this.removeOlderMonthFrom(spirometry, monthAgo);
  }

  async getLast(patient_id: number): Promise<SpirometryData> {
    const queue = this.map_store.get(patient_id);
    return queue && !queue.isEmpty ? queue.last() : null;
  }

  async getAverageByPatient(patient_id: number): Promise<number> {
    const average = this.map_average.get(patient_id) || new Average();
    return average.current();
  }

  async isAfterLast(patient_id: number, created_at: Date): Promise<boolean> {
    const queue = this.map_store.get(patient_id);
    if (queue == null || queue.isEmpty) {
      return true;
    }
    const last_entry = queue.last();
    return last_entry.created_at.getTime() < created_at.getTime();
  }

  private addSpirometryData(spirometry: SpirometryData): void {
    this.addMapStorage(spirometry);
    this.addMapAverage(spirometry);
  }

  private addMapStorage(spirometry: SpirometryData): void {
    if (!this.map_store.has(spirometry.patient_id)) {
      this.map_store.set(spirometry.patient_id, new Queue<SpirometryData>());
    }
    const queue = this.map_store.get(spirometry.patient_id);
    queue.enqueue(spirometry);
  }

  private addMapAverage({ patient_id, value }: SpirometryData): void {
    if (!this.map_average.has(patient_id)) {
      this.map_average.set(patient_id, new Average());
    }
    const average = this.map_average.get(patient_id);
    average.add(value);
  }

  private removeOlderMonthFrom(spirometry: SpirometryData, month_ago: Date): void {
    const queue = this.map_store.get(spirometry.patient_id);
    const average = this.map_average.get(spirometry.patient_id);
    while (!queue.isEmpty && queue.last().created_at.getTime() < month_ago.getTime()) {
      queue.dequeue();
      average.remove(spirometry.value);
    }
  }
}
