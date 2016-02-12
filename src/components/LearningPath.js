import React from 'react';
import { connect } from 'react-redux';

import LearningPathToc from './LearningPathToC';
import { titleI18N } from '../util/i18nFieldFinder';

export function LearningPath(props) {
  const {children, learningPath, lang } = props;

  return (
    <div className='two-column'>
      <aside className='two-column_col'>
        <h3 className='step-nav_h'>{titleI18N(learningPath, lang)}</h3>
        <LearningPathToc {...props} />
      </aside>
      <main className='two-column_col'>
        {children}
      </main>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  let isPrivate = ownProps.route.isPrivate;

  return Object.assign({}, state, {
    learningPath: isPrivate ? state.privateLearningPath : state.learningPath,
    isPrivate: isPrivate,
    activePathname: ownProps.location.pathname
  });
};

export default connect(mapStateToProps)(LearningPath);

