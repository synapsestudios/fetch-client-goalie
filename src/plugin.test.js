const createPlugin = require('./plugin');

describe('smoke tests', () => {
  test('it initializes without errors', () => {
    const plugin = createPlugin('v1.0.0', {});
    expect(plugin).toBeDefined();
  });

  test('it exits with errors when store not provided', () => {
    expect(() => createPlugin('v1.0.0')).toThrowError(/fetch-client-goalie: store must be provided/);
  });
  test('it exits with errors when version not provided', () => {
    expect(() => createPlugin()).toThrowError(/fetch-client-goalie: version must be provided/);
  });
});

describe('request header', () => {
  const MockRequest = { headers: {} };

  test('onStart appends api-version header', () => {
    const plugin = createPlugin('v1.0.0', {});
    MockRequest.headers.append = jest.fn();

    plugin.onStart(MockRequest);
    expect(MockRequest.headers.append.mock.calls.length).toBe(1)
    expect(MockRequest.headers.append.mock.calls[0][0]).toBe('api-version')
    expect(MockRequest.headers.append.mock.calls[0][1]).toBe('v1.0.0')
  })
});

describe('response action', () => {
  test('when a response status is 412 dispatch the UPDATE_REQUIRED action', () => {
    const store = { dispatch: jest.fn() };
    const plugin = createPlugin('v1.0.0', store);
    plugin.onFail({}, {status: 412});

    expect(store.dispatch.mock.calls.length).toBe(1);
    expect(store.dispatch.mock.calls[0][0]).toEqual({ type: 'REQUIRE_UPDATE' });
  });
  test('when a response is not 412 do not dispatch', () => {
    const store = { dispatch: jest.fn() };
    const plugin = createPlugin('v1.0.0', store);
    plugin.onFail({}, {status: 400});

    expect(store.dispatch.mock.calls.length).toBe(0);
  });
});
