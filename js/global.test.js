const getYear = require('./global');

test('Year should not be null', () => {
  expect(getYear()).not.toBeNull();
});

test('Year should not be truthy', () => {
  expect(getYear()).toBeTruthy();
});
