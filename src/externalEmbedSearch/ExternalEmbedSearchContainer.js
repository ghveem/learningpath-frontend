/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import polyglot from '../i18n';

const ExternalEmbedSearchContainer = ({ currentFilter }) => {
  console.log(currentFilter);
  return (
    <div className="embed-search_result">
      <p>Her vises noe</p>
    </div>
  );
};

ExternalEmbedSearchContainer.propTypes = {
  currentFilter: PropTypes.object.isRequired,
};

export default ExternalEmbedSearchContainer;
