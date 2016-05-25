import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { learningStep } from './mockData';

import LearningPathStepIcon from '../LearningPathStepIcon';

test('component/LearningPathStepIcon', t => {
  const circle = true;
  const component = shallow(<LearningPathStepIcon learningPathStep={learningStep} isCircle={circle} />);

  const iconNode = component.find('.step-nav_circle');

  t.equal(iconNode.length, 1, 'one icon node');

  t.end();
});
