import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import LearningPathStepDescription from './LearningPathStepDescription';
import Oembed from './Oembed';
import { titleI18N, descriptionI18N, oembedContentI18N } from '../util/i18nFieldFinder';
import polyglot from '../i18n';
import Icon from './Icon';

export function LearningPathStep({learningPathStep, learningPath}, {lang}) {
  let stepTitle = titleI18N(learningPathStep, lang);
  let stepDescription = descriptionI18N(learningPathStep, lang);
  let oembedContent = oembedContentI18N(learningPathStep, lang);
  const editStepTarget = `/learningpaths/${learningPath.id}/step/${learningPathStep.id}/edit`;
  const edit = learningPath.canEdit ? <Link className='button-create-edit button-create-edit--fixed' to={editStepTarget}><Icon.Create />{polyglot.t('editPathStep.edit')}</Link> : '';

  return (
    <div>
      <LearningPathStepDescription stepTitle={stepTitle} stepDescription={stepDescription} />
      <Oembed oembedContent={oembedContent} />
      {edit}
    </div>
  );
}

LearningPathStep.propTypes = {
  learningPath: PropTypes.object.isRequired,
  learningPathStep: PropTypes.object.isRequired
};

LearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired
};

export default connect(state => state)(LearningPathStep);
