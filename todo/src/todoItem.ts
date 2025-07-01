export class TodoItem {
  constructor(public id: number, public task: string, public complete: boolean = false) {}

  printDetails() {
    console.log(`${this.id}\t${this.task} ${this.complete ? '\t(complete)' : ''}`);
  }
}
