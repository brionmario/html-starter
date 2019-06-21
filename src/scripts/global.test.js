import { getCurrentYear } from './global';

test('Year should not be null', () => {
  expect(getCurrentYear()).not.toBeNull();
});

test('Year should not be truthy', () => {
  expect(getCurrentYear()).toBeTruthy();
});
