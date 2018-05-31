const index = require('../src/index');
test('createPlugin is a function', () => {
  expect(typeof index.createPlugin).toBe('function');
});
test('shouldUpdateReducer is a function', () => {
  expect(typeof index.shouldUpdateReducer).toBe('function');
});
