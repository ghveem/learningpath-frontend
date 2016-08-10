/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';

import initializeSession from './initializeSession';
import logout from './logout';
import fetchLearningPaths from './fetchLearningPaths';
import fetchMyLearningPaths from './fetchMyLearningPaths';
import checkValidSession from './checkValidSession.js';
import validateOembed from './validateOembed';
import updateLearningPathStatus from './updateLearningPathStatus';

export const setAuthenticated = createAction('SET_AUTHENTICATED');
export const setAuthToken = createAction('SET_AUTH_TOKEN');
export const setLearningPaths = createAction('SET_LEARNING_PATHS');
export const setLearningPathsTotalCount = createAction('SET_LEARNING_PATHS_TOTAL_COUNT');
export const setMyLearningPathsSortOrder = createAction('SET_MY_LEARNING_PATHS_SORT_ORDER');
export const setUserData = createAction('SET_USER_DATA');
export const logoutAction = createAction('LOGOUT');
export const setLearningPathStatus = createAction('UPDATE_LEARNING_PATH_STATUS');
export const closeSidebars = createAction('CLOSE_SIDEBARS');
export const openLeftSidebar = createAction('OPEN_LEFT_SIDEBAR');
export const openRightSidebar = createAction('OPEN_RIGHT_SIDEBAR');
export {
  initializeSession,
  logout,
  fetchLearningPaths,
  fetchMyLearningPaths,
  validateOembed,
  updateLearningPathStatus,
};

export default {
  setAuthenticated,
  setAuthToken,
  setLearningPaths,
  setLearningPathsTotalCount,
  setMyLearningPathsSortOrder,
  setUserData,
  initializeSession,
  logout,
  fetchLearningPaths,
  fetchMyLearningPaths,
  checkValidSession,
  logoutAction,
  validateOembed,
  setLearningPathStatus,
  closeSidebars,
  openLeftSidebar,
  openRightSidebar,
};
