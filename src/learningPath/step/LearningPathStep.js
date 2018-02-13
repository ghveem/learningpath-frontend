/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { withTracker } from 'ndla-tracker';
import Oembed from './oembed/Oembed';
import { fetchLearningPathStep } from './learningPathStepActions';
import LearningPathStepInformation from './LearningPathStepInformation';
import LearningPathStepPrevNext from './LearningPathStepPrevNext';
import { getLearningPathStep } from './learningPathStepSelectors';
import polyglot from '../../i18n';

class LearningPathStep extends React.Component {
  static mapDispatchToProps = {
    localFetchLearningPathStep: fetchLearningPathStep,
  };

  static fetchData(props) {
    const {
      localFetchLearningPathStep,
      match: { params: { pathId, stepId } },
    } = props;
    return localFetchLearningPathStep(pathId, stepId);
  }

  static getDocumentTitle(props) {
    const { learningPathStep } = props;
    return learningPathStep.title + polyglot.t('htmlTitles.titleTemplate');
  }

  static willTrackPageView(trackPageView, currentProps) {
    const { learningPathStep, match } = currentProps;
    if (
      learningPathStep &&
      learningPathStep.id &&
      learningPathStep.id.toString() === match.params.stepId
    ) {
      trackPageView(currentProps);
    }
  }

  componentWillMount() {
    LearningPathStep.fetchData(this.props);
  }

  componentWillUpdate(nextProps) {
    const {
      localFetchLearningPathStep,
      match: { params: { pathId, stepId } },
    } = nextProps;
    if (
      __CLIENT__ &&
      (this.props.match.params.stepId !== stepId ||
        this.props.match.params.pathId !== pathId)
    ) {
      localFetchLearningPathStep(pathId, stepId);
    }
  }

  render() {
    const { learningPathStep } = this.props;
    const { lang } = this.context;
    const oembedContent = learningPathStep.oembed;
    return (
      <div className={oembedContent ? 'learning-step--header' : null}>
        <LearningPathStepPrevNext
          currentStepId={learningPathStep.id}
          lang={lang}>
          <div className="two-column_content--wide">
            <Helmet title={this.constructor.getDocumentTitle(this.props)} />
            <LearningPathStepInformation
              learningPathStep={learningPathStep}
              stepTitle={learningPathStep.title}
            />
            {oembedContent ? <Oembed oembedContent={oembedContent} /> : ''}
          </div>
        </LearningPathStepPrevNext>
      </div>
    );
  }
}

LearningPathStep.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  learningPathStep: PropTypes.object.isRequired,
  localFetchLearningPathStep: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      pathId: PropTypes.string.isRequired,
      stepId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

LearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = state =>
  Object.assign({}, state, {
    authenticated: state.authenticated,
    learningPathStep: getLearningPathStep(state),
  });

export default connect(mapStateToProps, LearningPathStep.mapDispatchToProps)(
  withTracker(LearningPathStep),
);
