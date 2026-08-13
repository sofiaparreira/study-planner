
export function getPlannerStartDate(date: Date) {
  const result = new Date(date);
  const day = result.getDay();

  const daysUntilMonday = day === 0 ? 1 : 8 - day;

  result.setDate(result.getDate() + daysUntilMonday);

  result.setHours(0, 0, 0, 0);

  return result;
}



export function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
}
