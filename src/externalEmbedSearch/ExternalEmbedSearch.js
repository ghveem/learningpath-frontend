/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';

class ExternalEmbedSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayExternalSearch: false,
    };
    this.toggledisplayExternalSearch = this.toggledisplayExternalSearch.bind(this);
    this.ltiSearchClose = this.ltiSearchClose.bind(this);
  }
  toggledisplayExternalSearch(evt) {
    evt.preventDefault();
    this.setState({ displayExternalSearch: !this.state.displayExternalSearch });
  }

  render() {
    const filters = [{ name: 'Youtube', type: 'oembed' }, { name: 'Khan Academy', type: 'lti' }];
    return (
      <div>
        <button className="button button--primary button--block embed-search_open-button" onClick={this.toggledisplayExternalSearch}>
          Søk i eksterne ressurser
        </button>
        <div>
          <p>Halla</p>
        </div>
      </div>
    );
  }
}

ExternalEmbedSearch.propTypes = {

};

export default ExternalEmbedSearch;
