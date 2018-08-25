const getYear = () => {
  let now = new Date;
  let year = now.getYear();
  if (year < 1900) {
    year += 1900;
  }
  return year;
};

module.exports = getYear;
