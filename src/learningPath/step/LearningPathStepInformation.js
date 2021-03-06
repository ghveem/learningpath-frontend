/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import LearningPathStepLicense from './LearningPathStepLicense';
import { CopyrightObjectShape } from '../../shapes';

const LearningPathStepInformation = ({
  learningPathStep,
  copyright,
  stepTitle,
}) => (
  <div className="learning-step">
    {learningPathStep.showTitle ? <h1>{stepTitle}</h1> : null}
    {learningPathStep.description ? (
      <div className="learning-step_licence-description">
        <LearningPathStepLicense
          copyright={copyright}
          learningPathStep={learningPathStep}
        />
        <div
          dangerouslySetInnerHTML={{ __html: learningPathStep.description }}
        />
      </div>
    ) : (
      ''
    )}
  </div>
);

LearningPathStepInformation.propTypes = {
  learningPathStep: PropTypes.object.isRequired,
  stepTitle: PropTypes.string,
  copyright: CopyrightObjectShape,
};

export default LearningPathStepInformation;
