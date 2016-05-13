import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import get from 'lodash/get';

import { titleI18N } from '../../util/i18nFieldFinder';
import formatDate from '../../util/formatDate';
import formatDuration from '../../util/formatDuration';

import LabeledIcon from '../LabeledIcon';

import { setLearningPathStep } from '../../actions';

export function LearningPathGeneralInfo ({learningPath, setEmptyStep}, {lang}) {

  const href = `/learningpaths/${learningPath.id}`;
  return (
    <div className='learningpath-general-info'>
      <h3 className='learningpath-general-info_h'>
        <Link to={href} onClick={() => (setEmptyStep({}))}>{titleI18N(learningPath, lang) }</Link>
      </h3>
      <div className='learningpath-general-info_b'>
        <LabeledIcon.Person labelText={get(learningPath, 'author.name')} />
        <LabeledIcon.Today labelText={formatDate(learningPath.lastUpdated, lang)} tagName='time' />
        <LabeledIcon.QueryBuilder labelText={formatDuration(learningPath.duration, lang)} tagName='time' />
      </div>
    </div>
  );
}

LearningPathGeneralInfo.propTypes = {
  learningPath: PropTypes.object.isRequired,
  setEmptyStep: PropTypes.func.isRequired
};

LearningPathGeneralInfo.contextTypes = {
  lang: PropTypes.string.isRequired
};

export const mapStateToProps = state => state;

export const mapDispatchToProps = {
  setEmptyStep: setLearningPathStep
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathGeneralInfo);
