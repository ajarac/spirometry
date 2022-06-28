export class SpirometryDataAlreadyExists extends Error {
  constructor() {
    super('Spirometry data already exists');
  }
}
