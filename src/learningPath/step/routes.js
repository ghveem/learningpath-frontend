
import React from 'react';
import { Route } from 'react-router';
import { bindActionCreators } from 'redux';

import actions from '../../actions';
import requireAuthentication from '../../components/requireAuthentication';
import {
  LearningPathSummary,
  LearningPathToCButtons,
} from '../../components';
import LearningPathStep from './LearningPathStep';
import CreateLearningPathStep from './create/CreateLearningPathStep';
import EditLearningPathStep from './edit/EditLearningPathStep';
import SortLearningPathSteps from './sort/SortLearningPathSteps';

export default function (store, ifAuthenticated) {
  const {
    fetchLearningPathStep,
    createEmptyLearningPathStep,
  } = bindActionCreators(actions, store.dispatch);


  return (
    <Route path="step(/)">
      <Route path="new(/)" component={requireAuthentication(CreateLearningPathStep)} onEnter={ifAuthenticated(createEmptyLearningPathStep)} />
      <Route path="sort(/)" components={{main: LearningPathSummary, sortLearningSteps: SortLearningPathSteps}} onEnter={ifAuthenticated()} />
      <Route path=":stepId/edit(/)" component={requireAuthentication(EditLearningPathStep)} onEnter={ifAuthenticated(({params}) => fetchLearningPathStep(params.pathId, params.stepId))} />
      <Route
        path=":stepId" components={{main: LearningPathStep, saveButtons: LearningPathToCButtons}}
        onEnter={({params}) => fetchLearningPathStep(params.pathId, params.stepId)}
      />
    </Route>
  );
}
