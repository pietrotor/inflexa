export class DateTransformer {
  to(date: string): number {
    if (!date) {
      return undefined;
    }
    return new Date(date).getTime();
  }

  from(date: number): Date {
    if (!date) {
      return undefined;
    }
    return new Date(date);
  }
}
