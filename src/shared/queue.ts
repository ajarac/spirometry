type Elements<T> = { [k in number]: T };

export class Queue<T> {
  private readonly elements: Elements<T> = {};
  private head = 0;
  private tail = 0;

  get length(): number {
    return this.tail - this.head;
  }

  get isEmpty(): boolean {
    return this.length === 0;
  }

  enqueue(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }

  dequeue(): T {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }

  peek(): T {
    return this.elements[this.head];
  }

  last(): T {
    return this.elements[this.tail - 1];
  }
}
