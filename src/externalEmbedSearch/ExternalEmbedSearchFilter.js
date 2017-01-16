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

const ExternalEmbedSearchFilter = ({ currentFilter, onFilterChange }) => {
  const filterClass = filter => classNames({
    'un-button': true,
    'embed-search_form-filter ': true,
    'embed-search_form-filter--active': filter === currentFilter.key,
  });
  const filters = [{ key: 'more:youtube', name: 'Youtube', type: 'oembed' }, { key: 'more:ted', name: 'Ted', type: 'oembed' }, { key: 'khan', name: 'Khan Academy', type: 'lti' }];

  return (
    <div className="embed-search_form">
      <div className="embed-search_form-filters">
        {filters.map(filter =>
          <button key={filter.key} onClick={evt => onFilterChange(evt, filter)} className={filterClass(filter.key)}>{filter.name}</button>
        )}
      </div>
    </div>
  );
};

ExternalEmbedSearchFilter.propTypes = {
  currentFilter: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default ExternalEmbedSearchFilter;
