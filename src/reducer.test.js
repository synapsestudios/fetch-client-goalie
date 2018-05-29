const reducer = require('./reducer');

test('should return first arg when action type does not match', () => {
  const shouldUpdate = reducer(false, {type: 'INIT'});
  expect(shouldUpdate).toBe(false);

  const shouldUpdateAgain = reducer(true, {type: 'INIT'});
  expect(shouldUpdateAgain).toBe(true);
});
test('should return true when action type does match', () => {
  const shouldUpdate = reducer(false, { type: 'REQUIRE_UPDATE' });
  expect(shouldUpdate).toBe(true);
});
