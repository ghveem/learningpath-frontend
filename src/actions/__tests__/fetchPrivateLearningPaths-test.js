import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);

test('actions/fetchPrivateLearningPaths', (t) => {
  const authToken = '123345';

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/private')
    .reply(200, [ {id: '123'}, {id: '456'} ]);

  const expectedActions = [
    actions.setPrivateLearningPaths([ {id: '123'}, {id: '456'} ])
  ];

  const store = mockStore({ authToken }, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchPrivateLearningPaths() );
});

test('actions/fetchPrivateLearningPaths access denied', (t) => {
  const authToken = '123345';

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/private')
    .reply(403, {message: 'Invalid'});

  const expectedActions = [
    actions.applicationError(payload403invalid())
  ];

  const store = mockStore({ authToken }, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchPrivateLearningPaths() );
});

