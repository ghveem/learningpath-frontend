import { createAction } from 'redux-actions';

import authenticationSuccess from './authenticationSuccess';
import fetchPrivateLearningPaths from './fetchPrivateLearningPaths';

export var applicationError = createAction('APPLICATION_ERROR');
export var setAuthenticated = createAction('SET_AUTHENTICATED');
export var setAuthToken = createAction('SET_AUTH_TOKEN');
export var setPrivateLearningPaths = createAction('SET_PRIVATE_LEARNING_PATHS');
export var setUserData = createAction('SET_USER_DATA');
export var restoreSession = createAction('RESTORE_SESSION');
export var logout = createAction('LOGOUT');
export { authenticationSuccess, fetchPrivateLearningPaths };

export default {
  applicationError,
  setAuthenticated,
  setAuthToken,
  setPrivateLearningPaths,
  setUserData,
  restoreSession,
  logout,
  authenticationSuccess,
  fetchPrivateLearningPaths
};
