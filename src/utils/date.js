function isValidDate(string) {
  const date = new Date(string);
  return !isNaN(date.getTime());
}

function isValidRange(date1, date2) {
  const start = new Date(date1).getTime();
  const end = new Date(date2).getTime();
  return start <= end;
}
export { isValidDate, isValidRange };
