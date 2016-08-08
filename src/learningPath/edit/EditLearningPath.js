import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import LearningPathForm from './LearningPathForm';
import { fetchLearningPathTagsIfNeeded } from './tags/learningPathTagsActions';
import { fetchLearningPathLicensesIfNeeded } from './copyright/learningPathLicensesActions';
import { getLearningPathTagsByLanguage } from './tags/learningPathTagsSelectors';
import { fetchLearningPathImages, fetchLearningPathImage, fetchLearningPathImageWithMetaUrl } from '../../imageSearch/imageActions';
import { updateLearningPath } from '../learningPathActions';

class EditLearningPath extends Component {
  componentDidMount() {
    const { fetchLearningPathTags, fetchLearningPathLicenses } = this.props;
    fetchLearningPathTags();
    fetchLearningPathLicenses();
  }

  render() {
    const { learningPath, localFetchImages, localUpdateLearningPath, localFetchImage, lang: language, tags, licenses } = this.props;
    const handleSubmit = values => localUpdateLearningPath(learningPath.id, {
      title: [{ title: values.title, language }],
      description: [{ description: values.description, language }],
      revision: learningPath.revision,
      duration: (values.duration.replace(/,/g, '.')) * 60,
      tags: [{ tags: values.tags, language }],
      copyright: { license: values.license ? values.license : undefined, contributors: !isEmpty(values.contributors) ? values.contributors : undefined },
      coverPhotoMetaUrl: !isEmpty(values.coverPhotoMetaUrl) ? values.coverPhotoMetaUrl : undefined,
    });

    return (
      <main className="two-column_col two-column_col--center">
        <LearningPathForm
          learningPath={learningPath} tagOptions={tags} licenseOptions={licenses} onSubmit={handleSubmit} localFetchImages={localFetchImages}
          fetchImage={localFetchImage} lang={language}
        />
      </main>
    );
  }
}

EditLearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  learningSteps: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  licenses: PropTypes.array.isRequired,
  localUpdateLearningPath: PropTypes.func.isRequired,
  fetchLearningPathTags: PropTypes.func.isRequired,
  fetchLearningPathLicenses: PropTypes.func.isRequired,
  localFetchImages: PropTypes.func.isRequired,
  localFetchImage: PropTypes.func.isRequired,
  localFetchImageWithMetaUrl: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: get(state, 'learningPath', {}),
  learningSteps: get(state, 'learningPath.learningsteps', []),
  tags: getLearningPathTagsByLanguage(state, ownProps.lang),
  licenses: get(state, 'learningPathLicenses.all', []),
});

const mapDispatchToProps = {
  localUpdateLearningPath: updateLearningPath,
  fetchLearningPathTags: fetchLearningPathTagsIfNeeded,
  fetchLearningPathLicenses: fetchLearningPathLicensesIfNeeded,
  localFetchImages: fetchLearningPathImages,
  localFetchImage: fetchLearningPathImage,
  localFetchImageWithMetaUrl: fetchLearningPathImageWithMetaUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPath);
