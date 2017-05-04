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
import Oembed from './oembed/Oembed';
import polyglot from '../../i18n';
import { fetchLearningPathStep } from './learningPathStepActions';
import LearningPathStepInformation from './LearningPathStepInformation';
import LearningPathStepPrevNext from './LearningPathStepPrevNext';
import { getI18nLearningPathStep } from './learningPathStepSelectors';
import Spinner from '../../common/Spinner';

class LearningPathStep extends React.Component {

  static mapDispatchToProps = {
    localFetchLearningPathStep: fetchLearningPathStep,
  };

  static fetchData(props) {
    const { localFetchLearningPathStep, match: { params: { pathId, stepId } } } = props;
    return localFetchLearningPathStep(pathId, stepId);
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: __SERVER__ ? false : true,
    };
  }

  componentWillMount() {
    LearningPathStep.fetchData(this.props).then(() => this.setState({ isLoading: false }));
  }

  componentWillUpdate(nextProps) {
    const { localFetchLearningPathStep, match: { params: { pathId, stepId } } } = nextProps;

    if (this.props.match.params.stepId !== stepId || this.props.match.params.pathId !== pathId) {
      this.setState({ isLoading: true });
      localFetchLearningPathStep(pathId, stepId).then(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    const { learningPathStep } = this.props;
    const { lang } = this.context;
    const oembedContent = learningPathStep.oembed;
    return (
      <div className="two-column_content--wide">
        <LearningPathStepPrevNext currentStepId={learningPathStep.id} lang={lang}>
          <Helmet title={polyglot.t('htmlTitleTemplates.learningPathStep', { title: learningPathStep.title || '' })} />
          {this.state.isLoading && <Spinner hasMargins />}
          <LearningPathStepInformation learningPathStep={learningPathStep} stepTitle={learningPathStep.title} />
          {oembedContent ? <Oembed oembedContent={oembedContent} /> : ''}
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


const mapStateToProps = state => Object.assign({}, state, {
  authenticated: state.authenticated,
  learningPathStep: getI18nLearningPathStep(state),
});


export default connect(mapStateToProps, LearningPathStep.mapDispatchToProps)(LearningPathStep);
