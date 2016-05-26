import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash/isEmpty';

import App from '../components/App';
import {
  Welcome, NotFound,
  LoginProviders, SessionInitializer, LoginFailure,
  MyPage,
  LearningPath, LearningPathSummary, LearningPathStep,
  LearningPathSearch,
  EditLearningPath, EditLearningPathStep, CreateLearningPathStep,
  CreateLearningPath, LearningPathToCButtons,
  SortLearningSteps
} from '../components';

import actions from '../actions';
import requireAuthentication from '../components/requireAuthentication';
import { defaultSearchQuery, parseSearchQuery } from '../middleware/searchQuery';


export default function (store) {
  function ifAuthenticated(cb) {
    return (...args) => {
      if (store.getState().authenticated) {
        return cb(...args);
      }
      return undefined;
    };
  }

  const {
    logout,
    fetchMyLearningPaths,
    fetchLearningPaths,
    fetchLearningPath,
    fetchLearningPathStep,
    changeLearningPathQuery,
    createEmptyLearningPath,
    checkValidSession,
    createEmptyLearningPathStep
  } = bindActionCreators(actions, store.dispatch);

  return (
    <Route path="/" onEnter={ifAuthenticated(checkValidSession)}>
      <IndexRoute component={Welcome} />
      <Route component={App}>
        <Route path="login" component={LoginProviders} />
        <Route path="login/success/:authToken" component={SessionInitializer} />
        <Route path="login/failure" component={LoginFailure} />
        <Route path="logout" onEnter={ifAuthenticated(logout)} component={LoginProviders} />
        <Route path="minside" component={requireAuthentication(MyPage)} onEnter={ifAuthenticated(fetchMyLearningPaths)} />
        <Route path="learningpaths/new" component={requireAuthentication(CreateLearningPath)} onEnter={ifAuthenticated(createEmptyLearningPath)} />
        <Route
          path="learningpaths" component={LearningPathSearch} onEnter={ctx => {
            let query = parseSearchQuery(ctx.location.query);
            if (isEmpty(query)) {
              query = defaultSearchQuery;
            }

            changeLearningPathQuery(query);
            fetchLearningPaths();
          }}
        />
        <Route path="learningpaths/:pathId" onEnter={({params}) => fetchLearningPath(params.pathId)} component={LearningPath} >
          <IndexRoute components={{main: LearningPathSummary, saveButtons: LearningPathToCButtons}} />
          <Route path="edit" component={requireAuthentication(EditLearningPath)} onEnter={ifAuthenticated(({params}) => fetchLearningPath(params.pathId))} />

          <Route path="step/new" component={requireAuthentication(CreateLearningPathStep)} onEnter={ifAuthenticated(createEmptyLearningPathStep)} />

          <Route path="sort" components={{main: LearningPathSummary, sortLearningSteps: SortLearningSteps}} onEnter={ifAuthenticated(({params}) => fetchLearningPath(params.pathId))} />

          <Route path="step/:stepId/edit" component={requireAuthentication(EditLearningPathStep)} onEnter={ifAuthenticated(({params}) => fetchLearningPathStep(params.pathId, params.stepId))} />
          <Route
            path="step/:stepId" components={{main: LearningPathStep, saveButtons: LearningPathToCButtons}}
            onEnter={({params}) => fetchLearningPathStep(params.pathId, params.stepId)}
          />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Route>
  );
}
