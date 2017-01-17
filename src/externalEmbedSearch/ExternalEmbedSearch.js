/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ExternalEmbedSearchFilter from './ExternalEmbedSearchFilter';
import ExternalEmbedSearchContainer from './ExternalEmbedSearchContainer';

class ExternalEmbedSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      filter: { key: 'youtube', name: 'Youtube', type: 'oembed' },

    };
    this.toggledisplayExternalSearch = this.toggledisplayExternalSearch.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }
  onFilterChange(evt, filter) {
    evt.preventDefault();
    this.setState({ filter });
  }

  toggledisplayExternalSearch(evt) {
    evt.preventDefault();
    this.setState({ active: !this.state.active });
  }


  render() {
    const { learningPathId, stepId, embedTypeOnBlur, urlOnBlur } = this.props;
    const containerClass = {
      'embed-search_container': true,
      'embed-search_container--active': this.state.active,
    };
    return (
      <div>
        <button className="button button--primary button--block embed-search_open-button" onClick={this.toggledisplayExternalSearch}>
          Søk i eksterne ressurser
        </button>
        <div className={classNames(containerClass)}>
          <ExternalEmbedSearchFilter currentFilter={this.state.filter} onFilterChange={this.onFilterChange} learningPathId={learningPathId} stepId={stepId} />
          <ExternalEmbedSearchContainer currentFilter={this.state.filter} embedTypeOnBlur={embedTypeOnBlur} urlOnBlur={urlOnBlur} />
        </div>
      </div>
    );
  }
}

ExternalEmbedSearch.propTypes = {
  learningPathId: PropTypes.number.isRequired,
  stepId: PropTypes.number,
  embedTypeOnBlur: PropTypes.func.isRequired,
  urlOnBlur: PropTypes.func.isRequired,
};

export default ExternalEmbedSearch;
