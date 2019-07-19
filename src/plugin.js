module.exports = (version, store) => {
  if (!version) throw new Error('fetch-client-goalie: version must be provided');
  if (!store) throw new Error('fetch-client-goalie: store must be provided');
  return {
    onStart: request => {
      request.headers.set('api-version', version);
      return request;
    },
    onFail: (request, response) => {
      if (response.status === 412) {
        store.dispatch({ type: 'REQUIRE_UPDATE' })
      }
      return response;
    }
  }
};
