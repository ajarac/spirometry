export class SpirometryData {
  public readonly value: number;
  public readonly created_at: Date;
  public readonly patient_id: number;
  public readonly flag: boolean;

  public static withFlag(value: number, created_at: Date, patient_id: number): SpirometryData {
    return new SpirometryData(value, created_at, patient_id, true);
  }

  public static normal(value: number, created_at: Date, patient_id: number): SpirometryData {
    return new SpirometryData(value, created_at, patient_id, false);
  }

  protected constructor(value: number, created_at: Date, patient_id: number, flag: boolean) {
    this.value = value;
    this.created_at = created_at;
    this.patient_id = patient_id;
    this.flag = flag;
  }
}
