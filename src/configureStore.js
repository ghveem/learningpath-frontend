import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';

import reducers from './reducers';
import { errorReporter, searchQueryMiddleware } from './middleware';

const slicer = function (paths) {
  // custom slicer because default slicer does not store falsy values
  return (state) => paths.reduce((acc, path) => {
    acc[path] = state[path];
    return acc;
  }, {});
};

const createFinalStore = compose(
  applyMiddleware(
    thunkMiddleware,
    searchQueryMiddleware,
    errorReporter
  ),
  persistState(['authenticated', 'authToken', 'user'], { key: 'ndla:sti', slicer }),
  window && window.devToolsExtension ?  window.devToolsExtension() : f => f
)(createStore);


export default function configureStore (initialState) {
  return createFinalStore(reducers, initialState);
}
