# fetch-client-goalie
[![CircleCI](https://circleci.com/gh/synapsestudios/fetch-client-goalie.svg?style=svg)](https://circleci.com/gh/synapsestudios/fetch-client-goalie)
- [Goalie](https://github.com/synapsestudios/goalie)
- [Fetch Client](https://github.com/synapsestudios/fetch-client)

These are helpers that allow a frontend using redux and fetch-client to respond to the 412 error returned by a server using goalie, and to prompt users to reload their app.

## Installation

First add the package
```
npm i --save @synapsestudios/fetch-client-goalie
```

Next register the fetch-client plugin. You must pass your redux store in to the plugin.

```
import Client from '@synapsestudios/fetch-client';
import { createPlugin } from '@synapsestudios/fetch-client-goalie';
import store from '../redux-store';

const client = new Client({ url:  'http://api.com' });

client.addPlugin(createPlugin('1.0.0', store));
```

Finally register the reducer

```
import { shouldUpdateReducer } from '@synapsestudios/fetch-client-goalie';

const reducers = combineReducers({
  //... your other reducers
  shouldUpdate: shouldUpdateReducer,
});
```

## Usage

If the "shouldUpdate" value in your reducer is ever true then you know that the api
is returning 412 errors and you should prompt your user to update. Here's an example
using react:

```
import React from 'react';
import { connect } from 'react-redux';

const Component = ({shouldUpdate}) => {
  if (shouldUpdate) {
    return <div>You have to refresh now</div>
  }

  return <div>You're all up to date!</div>
}

export default connect(state => ({
  shouldUpdate: state.shouldUpdate
}))(Component);
```
