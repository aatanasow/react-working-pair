function isValidDate(string) {
  const date = new Date(string);
  return !isNaN(date.getTime());
}
export { isValidDate };
