export function getCurrentYear() {
  var now = new Date();
  var year = now.getYear();
  if (year < 1900) {
    year += 1900;
  }
  return year;
}
