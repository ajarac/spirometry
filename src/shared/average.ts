export class Average {
  private counter = 0;
  private total = 0;

  add(value: number): void {
    this.total += value;
    this.counter++;
  }

  remove(value: number): void {
    this.total -= value;
    this.counter--;
  }

  current(): number {
    if (this.counter == 0) {
      return 0;
    }
    return this.total / this.counter;
  }
}
