export function DaysTillChristmasUtil(): number {
  const currentDate = new Date();
  const christmasDay = new Date(currentDate.getFullYear(), 11, 25);
  if (currentDate.getMonth() == 11 && currentDate.getDate() > 25) {
    christmasDay.setFullYear(christmasDay.getFullYear() + 1);
  }
  const numberOfMilliSecondsInADay = 1000 * 60 * 60 * 24;
  const numOfDays = Math.ceil(
    (christmasDay.getTime() - currentDate.getTime()) /
      numberOfMilliSecondsInADay
  );
  return numOfDays;
}
